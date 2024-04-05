import { Card, Dropdown, MenuProps, Tag } from "antd";
import { Task } from "../../interfaces/interface";
import { useState } from "react";
import {
  useDeleteTaskAsyncMutation,
  useUpdateTaskStatusAsyncMutation,
} from "../../redux/tasksSlice";
import { Status } from "../../enums/Status";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import ModalDelete from "../Modal/ModalDelete";
import SelectValue from "../select/SelectValue";
import { showModal } from "../../redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import EditModal from "../editModal/EditModal";
import { useGetTasksListQuery } from "../../redux/tasksListSlice";
import "./TaskCard.css";
import moment from "moment";
import { capitalizeFirstLetter, getColorForPriority } from "../../utils/utils";
import { Priority } from "../../enums/Priority";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [status, setStatus] = useState<string>(task.status);
  const { visible } = useSelector((state: RootState) => state.modal);
  const [updateTaskStatusAsync] = useUpdateTaskStatusAsyncMutation();
  const [show, setShowModal] = useState(false)
  const [deleteTaskAsync] = useDeleteTaskAsyncMutation();
  const { refetch } = useGetTasksListQuery();
  const dispatch = useDispatch<AppDispatch>();

  const handleStatusChange = async (field: string, value: string) => {
    if (field === "status" && task.id) {
      await updateTaskStatusAsync({
        taskId: task.id,
        status: value as Status,
      });
      setStatus(value);
    }
    refetch();
  };

  const confirm = async () => {
    await deleteTaskAsync(task?.id);
    refetch();
    setShowModal(false)
  };

  const items = [
    {
      key: "1",
      label: <>Edit</>,
      icon: <EditOutlined />,
    },
    {
      key: "2",
      label: <>Delate</>,
      danger: true,
      icon: <DeleteOutlined />,
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e: { key: string }) => {
    if (e.key === "1") {
      dispatch(showModal({ id: task.id }));
    } else {
      setShowModal(true)
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Card
      style={{ marginBottom: 16 }}
      className="card-task"
      title={capitalizeFirstLetter(task.name)}
      extra={
        <Dropdown
          menu={menuProps}
          placement="bottomLeft"
          trigger={["click"]}
          overlayStyle={{ width: "100px" }}
          arrow={{
            pointAtCenter: true,
          }}
        >
          <MoreOutlined />
        </Dropdown>
      }
    >
      <p className="task-description">
        {capitalizeFirstLetter(task.description)}
      </p>
      <p>
        <span className="edit-label-container">
          <span className="edit-icons">
            <CalendarOutlined />
          </span>
          <span className="edit-text">
            {" "}
            {moment(task.dueDate).format("ddd, DD MMMM")}
          </span>
        </span>
      </p>
      <Tag className="tag-priority" bordered={false} color={getColorForPriority(task.priority as Priority)}>
        {task.priority}
      </Tag>
      <SelectValue
        field="status"
        valueSelect={status}
        placeholder="Move to:"
        handleChange={handleStatusChange}
      />
      <ModalDelete confirmDelete={confirm} show={show} setShowModal={setShowModal}/>
      {visible && <EditModal />}
    </Card>
  );
};

export default TaskCard;
