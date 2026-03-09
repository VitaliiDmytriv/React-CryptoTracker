import { useMutation } from "@tanstack/react-query";
import * as api from "../api/auth";
import type { RegisterSchemaType } from "../utils/shcemas";
import type { AxiosError } from "axios";
import { fieldOrder } from "../utils/utils";
import type { UseFormSetError } from "react-hook-form";
import { handleFormError } from "@/lib/handleFormError";

type Props = {
  setError: UseFormSetError<RegisterSchemaType>;
};

export function useRegister({ setError }: Props) {
  const register = useMutation({
    mutationFn: (data: RegisterSchemaType) => api.register(data),
    onSuccess: (response) => {
      console.log(response.data);
    },
    onError: (error: AxiosError) => {
      handleFormError({ error, setError, fieldOrder });
    },
  });

  return { register };
}
