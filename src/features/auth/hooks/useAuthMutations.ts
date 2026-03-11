import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/auth";
import type { LoginSchemaType, RegisterSchemaType } from "../utils/shcemas";
import type { AxiosError } from "axios";
import { fieldOrderRegister, fieldOrderLogin } from "../utils/utils";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { handleFormError } from "@/lib/handleFormError";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

type Props<T extends FieldValues> = {
  setError: UseFormSetError<T>;
};

export function useAuthMutations<T extends FieldValues>({ setError }: Props<T>) {
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
      handleFormError({ error, setError, fieldOrder: fieldOrderRegister as Path<T>[] });
    },
  });

  const login = useMutation({
    mutationFn: (data: LoginSchemaType) => {
      return api.login(data);
    },
    onSuccess: (response) => {
      const user = response.data.user;
      AuthContext.login(user);
      queryClient.clear();
      navigate("/dashboard/main", { replace: true });
    },
    onError: (error: AxiosError) => {
      handleFormError({ error, setError, fieldOrder: fieldOrderLogin as Path<T>[] });
    },
  });

  return { register, login };
}
