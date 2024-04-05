import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import "./HeaderDropdown.css";
import { useState } from "react";
import {
  setFormVisibility,
  useDeleteAllTaskAsyncByStatusMutation,
} from "../../redux/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import ModalDelete from "../Modal/ModalDelete";
import { Status } from "../../enums/Status";
import { useGetTasksListQuery } from "../../redux/tasksListSlice";
import EditModal from "../editModal/EditModal";

interface TaskCardProps {
  title: string;
  tasksLength: number;
  status: Status;
  taskListId: number
}

const HeaderDropdown: React.FC<TaskCardProps> = ({
  title,
  tasksLength,
  status,
  taskListId
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [deleteAllTaskAsyncByStatus] = useDeleteAllTaskAsyncByStatusMutation();
  const { refetch } = useGetTasksListQuery();
  const [showModal, setShowModal] = useState<boolean>(false)

  const { visible } = useSelector((state: RootState) => state.modal)

  const items = [
    {
      key: "1",
      label: <>Add new card</>,
      icon: <PlusOutlined />,
    },
    {
      key: "2",
      label: <>Delate</>,
      danger: true,
      icon: <DeleteOutlined />,
      disabled: tasksLength === 0,
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e: { key: string }) => {
     if (e.key === "1") {
      dispatch(setFormVisibility({ status, isVisible: true, taskId: taskListId}));
    } else if(e.key === "2"){
      setShowModal(true)
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const confirm = async () => {
    await deleteAllTaskAsyncByStatus({status, taskListId});
    setShowModal(false)
    refetch()
  };

  return (
    <>
      <div className="header-divider-container">
        <p className="header-column">{title}</p>
        <div>
          <span>{tasksLength}</span>
          <Dropdown
            menu={menuProps}
            trigger={["click"]}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <MoreOutlined />
          </Dropdown>
        </div>
      </div>
      <ModalDelete confirmDelete={confirm} setShowModal={setShowModal} show={showModal}/>
      {visible && <EditModal /> }
    </>
  );
};

export default HeaderDropdown;
