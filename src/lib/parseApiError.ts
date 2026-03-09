import type { ApiError } from "@/types/global";
import axios from "axios";
import type { FieldValues, Path } from "react-hook-form";

type ParsedError<T extends FieldValues> = string | Partial<Record<Path<T>, string[]>>;

export function parseApiError<T extends FieldValues>(error: unknown): ParsedError<T> {
  const defaultMessage = "Something went wrong, please try again later";

  if (axios.isAxiosError<ApiError<T>>(error)) {
    // сервер відповів з помилкою
    if (error.response) {
      const status = error.response.status;
      const serverMessage = error.response.data.message;

      // if zod obj then return it
      if (error.response.data.fields) {
        return error.response.data.fields;
      }

      if (serverMessage) return serverMessage;
      return `Error ${status}`;
    }

    // відповідь не прийшла
    if (error.request) {
      return "Network error";
    }

    return defaultMessage;
  }

  // Помилка в самому коді (Runtime Error)
  if (error instanceof Error) {
    console.log(error);
    return defaultMessage;
  }

  return defaultMessage;
}
