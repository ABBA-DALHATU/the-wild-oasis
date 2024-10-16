// import Button from "../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function EditCabin({ cabin }) {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <button>Edit</button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm cabinToEdit={cabin} />
      </Modal.Window>
    </Modal>
  );
}

export default EditCabin;
