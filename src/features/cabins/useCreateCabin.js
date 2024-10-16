import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin(handleCloseModal) {
  //only here so we can invalidate on success to reload the page
  const queryClient = useQueryClient();

  //mutate fn for creating a cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset();
      handleCloseModal?.();
    },
    onError: (err) => {
      toast.error(err.message);
      handleCloseModal?.();
    },
  });

  return { createCabin, isCreating };
}

export default useCreateCabin;
