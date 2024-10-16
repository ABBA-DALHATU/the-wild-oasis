import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();

  const navigate = useNavigate();

  const moveBack = useMoveBack();
  const { checkout, isCheckingout } = useCheckout();
  const { deleteBookingMutate, isDeletingBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Row type="horizontal">
        <Modal>
          <Modal.Open opens={bookingId}>
            <Button disabled={isDeletingBooking} variation="danger">
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name={bookingId}>
            <ConfirmDelete
              onConfirm={() => {
                deleteBookingMutate(bookingId);
                navigate(-1);
              }}
              disabled={isDeletingBooking}
              resourceName={`Bookings #${bookingId}`}
            />
          </Modal.Window>
        </Modal>

        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
              check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => {
                checkout(bookingId);
                // navigate(`/bookings`);
              }}
              disabled={isCheckingout}
            >
              check out
            </Button>
          )}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Row>
    </>
  );
}

export default BookingDetail;
