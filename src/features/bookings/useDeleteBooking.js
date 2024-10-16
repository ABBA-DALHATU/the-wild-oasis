import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const { bookingId } = useParams();

  const {
    mutate: deleteBookingMutate,
    isLoading: isDeletingBooking,
    error,
  } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () =>
      toast.success(`Booking #${bookingId} was deleted succesfully`),
    onError: () => toast.error("There was an error deleting"),
  });
  return { deleteBookingMutate, isDeletingBooking, error };
}
