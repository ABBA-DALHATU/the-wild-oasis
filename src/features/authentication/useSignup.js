import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),
    onSuccess: () =>
      toast.success(
        "Account was created successfully. Please verrify the new account from the user email"
      ),
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
}
