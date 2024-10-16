import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { data: userData, isLoading: isLoadingUserData } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    userData: userData?.user,
    isLoadingUserData,
    isAuthenticated: userData?.user.role === "authenticated",
  };
}
