import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";


function ModalDelete(props: { confirmDelete: () => Promise<void>, show: boolean, setShowModal: Dispatch<SetStateAction<boolean>>}) {
  const { confirmDelete, show, setShowModal } = props;

  const handleCancel = () => {
    setShowModal(false)
  };

  return (
      <Modal
        title="Delete confirm"
        open={show}
        onOk={confirmDelete}
        onCancel={handleCancel}
      >
        <p>Do you confirm delete the task?</p>
      </Modal>
  );
}

export default ModalDelete;
