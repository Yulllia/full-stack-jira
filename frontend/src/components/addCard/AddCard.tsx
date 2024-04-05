import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { Button, Input, message } from "antd";
import SelectValue from "../select/SelectValue";
import "./AddCard.css";
import { Status } from "../../enums/Status";
import {
  selectFormData,
  setFormData,
  setFormVisibility,
  useSaveTaskMutation,
} from "../../redux/tasksSlice";
import { useGetTasksListQuery } from "../../redux/tasksListSlice";

interface AddCardInterface {
  status: Status;
  id: number;
}

const AddCard: React.FC<AddCardInterface> = ({ status, id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [saveTask] = useSaveTaskMutation();
  const { refetch } = useGetTasksListQuery();
  const formData = useSelector(selectFormData);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };
  const handleChangeValue = (field: string, value: string) => {
    dispatch(setFormData({ ...formData, [field]: value, status}));
  };

  const handleSubmit = async () => {
    await saveTask({ taskData: formData, taskListId: id });
    dispatch(
      setFormData({
        name: "",
        description: "",
        dueDate: "",
        priority: "Select priority:",
        status: status,
      })
    );
    message.success("Task is saved sucessfuly");
    dispatch(setFormVisibility({ status, isVisible: false, taskId: id }));
    refetch()
  };
  return (
    <div className="add-card">
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <Input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <Input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <SelectValue
        field="priority"
        valueSelect={formData.priority}
        placeholder="Select priority:"
        handleChange={handleChangeValue}
      />
      <Button onClick={handleSubmit}>Add Card</Button>
    </div>
  );
};

export default AddCard;
