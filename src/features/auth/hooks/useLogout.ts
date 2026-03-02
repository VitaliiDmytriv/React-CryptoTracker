import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiService from "../api/auth";
import { toast } from "sonner";
import { authKeys } from "@/lib/queryKeys";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationFn: () => {
      return apiService.logout();
    },
    onSuccess: () => {
      navigate("/auth", { replace: true });
      setTimeout(() => {
        queryClient.setQueryData(authKeys.me(), null);
      }, 1000);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  async function handleLogout() {
    logout.mutateAsync();
  }

  return { handleLogout };
}
