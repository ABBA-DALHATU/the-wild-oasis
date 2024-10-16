import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
  const queryClient = useQueryClient();
  const {
    mutate: newSettings,
    isLoading: newSettingsLoading,
    error: newSettingsError,
  } = useMutation({
    mutationFn: (data) => updateSetting(data),
    onSuccess: () => {
      toast.success("Settings updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { newSettings, newSettingsLoading, newSettingsError };
}

export default useUpdateSettings;
