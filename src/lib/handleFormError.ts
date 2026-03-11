import type { AxiosError } from "axios";
import { parseApiError } from "./parseApiError";
import type { FieldValues, UseFormSetError, Path } from "react-hook-form";
import { toast } from "sonner";

type Props<T extends FieldValues> = {
  error: AxiosError;
  setError: UseFormSetError<T>;
  fieldOrder?: Path<T>[];
};

export function handleFormError<T extends FieldValues>({ error, setError, fieldOrder }: Props<T>) {
  const parsed = parseApiError(error);

  // Якщо повернувся об'єкт (валідні помилки полів)
  if (typeof parsed === "object") {
    // якщо переданий fieldOrder
    if (fieldOrder) {
      const firstField = fieldOrder.find((field) => parsed[field]?.[0]);

      if (parsed?.root) {
        setError("root", { type: "server", message: parsed.root[0] });
        return;
      }

      if (firstField) {
        setError(firstField, { message: parsed[firstField]![0] });
        return;
      }
      // якщо не передано fieldOrder, то встановлюємо помилки до всіх полів
    } else {
      for (const [key, value] of Object.entries(parsed)) {
        setError(key as Path<T>, { message: value?.[0] });
      }
      return;
    }
  }
  // Якщо повернувся рядок або об'єкт без відомих полів — показуємо загальний toast
  const message = typeof parsed === "string" ? parsed : "Something went wrong";
  toast.error(message);
}
