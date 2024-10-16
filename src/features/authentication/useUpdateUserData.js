import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUserData() {
  const queryClient = useQueryClient();
  const { mutate: updateUserData, isLoading: isUpdatingUserData } = useMutation(
    {
      mutationFn: ({ fullName, password, avatar }) =>
        updateCurrentUser({ fullName, password, avatar }),

      onSuccess: (user) => {
        toast.success("User successfully updated");
        // queryClient.setQueryData(["user"], user);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },

      onError: (err) => {
        toast.error(err.message);
      },
    }
  );

  return { updateUserData, isUpdatingUserData };
}
