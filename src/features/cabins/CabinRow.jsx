import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiEllipsisVertical, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { HiPencil } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({ name, maxCapacity, regularPrice, discount, image });
  }
  return (
    <div>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <ButtonsContainer>
          {/* <EditCabin cabin={cabin} /> */}
          <Modal>
            <Menus.Menu>
              <Modal.Window name="cabin-form">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName={name}
                  disabled={isDeleting}
                  onConfirm={() => deleteCabinMutate(cabinId)}
                />
              </Modal.Window>
              <Menus.Toggle id={cabinId}>
                <HiEllipsisVertical />
              </Menus.Toggle>
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="cabin-form">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </Modal>
        </ButtonsContainer>
      </Table.Row>
    </div>
  );
}

export default CabinRow;
