import { Input, Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/modalSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  selectFormData,
  setFormData,
  useGetTaskByTaskListQuery,
  useUpdateTaskMutation,
} from "../../redux/tasksSlice";
import { useEffect, useState } from "react";
import {
  CalendarOutlined,
  EditOutlined,
  InfoCircleOutlined,
  SaveOutlined,
  TagOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Button } from "antd";
import SelectValue from "../select/SelectValue";
import "./EditModal.css";
import { useGetTasksListQuery } from "../../redux/tasksListSlice";
import { capitalizeFirstLetter } from "../../utils/utils";

const EditModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector(selectFormData);
  const { id, visible } = useSelector((state: RootState) => state.modal);
  const { data: task, refetch } = useGetTaskByTaskListQuery({
    id,
  });
  const { refetch: reload } = useGetTasksListQuery();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [updateTask] = useUpdateTaskMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const hide = () => {
    reload()
    dispatch(hideModal());
    dispatch(
      setFormData({
        name: "",
        description: "",
        dueDate: "",
        priority: "",
        status: "",
        title: "",
      })
    );
  };


  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
  const handleChangeValue = (field: string, value: string) => {
    dispatch(setFormData({ ...formData, [field]: value }));
  };

  const saveTask = async () => {
    await updateTask({
        id,
        name: formData.name || task?.name,
        description: formData.description || task?.description,
        dueDate: formData.dueDate || task?.dueDate,
        priority: formData.priority || task?.priority,
        status: formData.status || task?.status,
      });
      dispatch(hideModal());
      reload()
  };

  return (
    <Modal
      open={visible}
      width={"1000px"}
      onCancel={hide}
      footer={null}
      className="edit-modal"
    >
      {task && !showEdit ? (
        <div className="modal-container">
          <div className="edit-container">
            <div className="header-container" style={{ width: "unset" }}>
              <h3>{capitalizeFirstLetter(task.name)}</h3>
              <Button icon={<EditOutlined />} onClick={() => setShowEdit(true)}>
                Edit task
              </Button>
            </div>
            <p>
              {" "}
              <span className="edit-label-container">
                <span className="edit-icons">
                  <InfoCircleOutlined />
                </span>
                <span className="edit-text edit-text-first">Status</span>
              </span>
              {capitalizeFirstLetter(task.status)}
            </p>
            <p>
              {" "}
              <span className="edit-label-container">
                <span className="edit-icons">
                  <CalendarOutlined />
                </span>
                <span className="edit-text">Due date</span>
              </span>
              {moment(task.dueDate).format("ddd, DD MMMM")}
            </p>
            <p>
              {" "}
              <span className="edit-label-container">
                <span className="edit-icons">
                  <TagOutlined />
                </span>
                <span className="edit-text">Priority</span>
              </span>
              {capitalizeFirstLetter(task.priority)}
            </p>
            <h3>Description</h3>
            <p className="edit-text">{task.description}</p>
          </div>
          <div className="activity-container">
            <h3>Activity</h3>
          </div>
        </div>
      ) : (
        <div className="modal-container">
          <div className="edit-container-input">
            <div className="header">
              <h3 className="select-edit">Task name</h3>
              <Button
                icon={<SaveOutlined />}
                onClick={async () => await saveTask()}
              >
                Save task
              </Button>
            </div>
            <Input
              type="text"
              name="name"
              width={250}
              defaultValue={formData.name || task?.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <div>
              <span className="edit-label-container">
                <h3 className="select-edit">Due date </h3>
              </span>
              <Input
                type="date"
                name="dueDate"
                width={250}
                value={
                  formData.dueDate ||
                  (task?.dueDate
                    ? moment(task.dueDate).format("YYYY-MM-DD")
                    : "")
                }
                onChange={handleChange}
                placeholder="Due Date"
              />
            </div>
            {task && (
              <div>
                <h3 className="select-edit">Priority</h3>
                <SelectValue
                  field="priority"
                  valueSelect={formData.priority || task.priority}
                  placeholder="Select priority:"
                  handleChange={handleChangeValue}
                />
              </div>
            )}
            {task && (
              <div>
                <h3 className="select-edit">Status</h3>
                <SelectValue
                  field="status"
                  valueSelect={formData.status || task.status}
                  placeholder="Select status:"
                  handleChange={handleChangeValue}
                />
              </div>
            )}
            <div>
              <span className="edit-label-container">
                <h3 className="select-edit">Description</h3>
              </span>
              <Input
                type="text"
                name="description"
                defaultValue={formData.description || task?.description}
                width={250}
                onChange={handleChange}
                placeholder="Description"
              />
            </div>
          </div>
          <div className="activity-container">
            <h3>Activity</h3>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default EditModal;
