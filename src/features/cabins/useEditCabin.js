import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin(handleCloseModal) {
  const queryClient = useQueryClient();
  //mutate fn for editing a cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      handleCloseModal();
      //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
      handleCloseModal();
    },
  });

  return { editCabin, isEditing };
}

export default useEditCabin;
