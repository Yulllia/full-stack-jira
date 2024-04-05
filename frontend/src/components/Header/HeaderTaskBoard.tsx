import { Button, Input, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import "./HeaderTaskBoard.css";
import { useState } from "react";
import { useSaveTaskListMutation } from "../../redux/tasksListSlice";

const HeaderTaskBoard = () => {
  const [newListName, setNewListName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [saveTaskList] = useSaveTaskListMutation();

  const addTaskList = async () => {
    if (newListName.trim() === "") {
      message.error("TaskList title cannot be empty");
      return;
    }
    await saveTaskList({ title: newListName, tasks: [] });
    message.success("TaskList is saved sucessfuly");
    setShowInput(false);
  };
  const addList = async () => {
    setShowInput(true);
    if (showInput) {
      await addTaskList();
    }
  };

  return (
    <div className="header-container">
      <div className="button-container">
        <Button>
          <ReloadOutlined />
          History
        </Button>
        <div className="add-list-container">
          {showInput && (
            <Input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onPressEnter={addTaskList}
              placeholder="Enter task-list title"
            />
          )}
          <Button onClick={addList}>+ Create New List</Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderTaskBoard;
