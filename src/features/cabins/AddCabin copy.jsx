import { useState } from "react";
// import Button from "../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
        Add new Cabin
      </Button>
      {isOpenModal && (
        <Modal handleClose={() => setIsOpenModal(false)}>
          <CreateCabinForm
            handleCloseModal={() => setIsOpenModal(false)}
            type="modal"
          />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
