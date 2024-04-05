import { Row, Col, Divider, Button } from "antd";
import { DividerLineProps, Task } from "../interfaces/interface";
import { Status } from "../enums/Status";
import TaskCard from "../components/TaskCard/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectVisibleForms,
  setFormVisibility,
} from "../redux/tasksSlice";
import { AppDispatch } from "../redux/store/store";
import "./TaskBoard.css";
import HeaderDropdown from "../components/Dropdown/HeaderDropdown";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import AddCard from "../components/addCard/AddCard";

interface TaskBoardProps {
  listTasks: Task[];
  id: number;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ listTasks, id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const visibleForms = useSelector(selectVisibleForms);

  const getTaskList = (status: Status) => {
    return listTasks
      .filter((task: Task) => task.status === status)
      .map((task: Task) => (
        <TaskCard key={task.id} task={task} />
      ));
  };

  const getTasksLength = (status: Status) => {
    return listTasks.filter((task: Task) => task.status === status);
  };

  function DividerLine({ children }: DividerLineProps) {
    return (
      <>
        <Divider />
        {children}
        <Divider />
      </>
    );
  }
  const handleAddNewTask = (status: string, taskId: number) => {
    dispatch(setFormVisibility({ status, isVisible: true, taskId}));
  };

  const MemoizedTaskList = React.memo(
    ({ status, taskId }: { status: Status; taskId: number }) => {
      return (
        <>
          <Button
            type="dashed"
            className="button-add-card"
            onClick={() => handleAddNewTask(status, taskId)}
          >
            <PlusOutlined />
            Add new card
          </Button>
          {getTaskList(status)}
          {visibleForms[status] && visibleForms[status][taskId] &&  (
            <AddCard status={status} id={id} />
          )}
        </>
      );
    }
  );

  return (
    <Row className="board-container">
      <Col span={5} className="card-container">
        <DividerLine>
          <HeaderDropdown
            title="Todo"
            status={Status.TODO}
            taskListId={id}
            tasksLength={getTasksLength(Status.TODO).length}
          />
        </DividerLine>
        <MemoizedTaskList status={Status.TODO} taskId={id} />
      </Col>
      <Col span={5} className="card-container">
        <DividerLine>
          <HeaderDropdown
            title="Planned"
            taskListId={id}
            status={Status.PLANNED}
            tasksLength={getTasksLength(Status.PLANNED).length}
          />
        </DividerLine>
        <MemoizedTaskList status={Status.PLANNED} taskId={id} />
      </Col>
      <Col span={5} className="card-container">
        <DividerLine>
          <HeaderDropdown
            title="In Progress"
            taskListId={id}
            status={Status.INPROGRESS}
            tasksLength={getTasksLength(Status.INPROGRESS).length}
          />
        </DividerLine>
        <MemoizedTaskList status={Status.INPROGRESS} taskId={id} />
      </Col>
      <Col span={5}>
        <DividerLine>
          <HeaderDropdown
            title="Closed"
            taskListId={id}
            status={Status.CLOSED}
            tasksLength={getTasksLength(Status.CLOSED).length}
          />
        </DividerLine>
        <MemoizedTaskList status={Status.CLOSED} taskId={id} />
      </Col>
    </Row>
  );
};

export default TaskBoard;
