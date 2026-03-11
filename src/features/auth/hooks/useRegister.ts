import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/auth";
import type { RegisterSchemaType } from "../utils/shcemas";
import type { AxiosError } from "axios";
import { fieldOrder } from "../utils/utils";
import type { UseFormSetError } from "react-hook-form";
import { handleFormError } from "@/lib/handleFormError";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

type Props = {
  setError: UseFormSetError<RegisterSchemaType>;
};

export function useRegister({ setError }: Props) {
  const navigate = useNavigate();
  const AuthContext = useAuth();
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: (data: RegisterSchemaType) => {
      return api.register(data);
    },
    onSuccess: (response) => {
      const user = response.data.user;
      AuthContext.login(user);
      queryClient.clear();
      navigate("/dashboard/main", { replace: true });
      toast.success(response.data.message);
    },
    onError: (error: AxiosError) => {
      handleFormError({ error, setError, fieldOrder });
    },
  });

  return { register };
}
