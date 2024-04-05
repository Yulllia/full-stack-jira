import React, { useEffect } from "react";
import TaskBoard from "./TaskBoard";
import HeaderTaskBoard from "../components/Header/HeaderTaskBoard";
import { List } from "../interfaces/interface";
import { Spin } from "antd";
import "./TaskList.css";
import { useGetTasksListQuery } from "../redux/tasksListSlice";

function TaskList() {
  const { data: list, isLoading, error, refetch } = useGetTasksListQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Spin />;
  }
  console.log(list)
  return (
    <div className="task-list-container">
      <HeaderTaskBoard />
      {!list?.length && !isLoading ? (
        <h3 className="title-header">
          Task List is empty. Please add task list
        </h3>
      ) : (
        list?.map((taskList: List) => (
          <div key={taskList.id}>
            <h2 className="task-list">{taskList.title}</h2>
            <TaskBoard listTasks={taskList.tasks} id={taskList.id} />
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
