import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchemaType } from "../utils/shcemas";
import { fieldOrder } from "../utils/utils";
import { useRegister } from "../hooks/useRegister";

export function RegisterForm() {
  const { register, handleSubmit, formState, setError } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { register: submitRegister } = useRegister({ setError });

  const firstFieldError = fieldOrder.map((field) => formState.errors[field]?.message).find(Boolean);

  const firstErrorMessage = firstFieldError ?? formState.errors.root?.serverError?.message;

  async function submut(data: RegisterSchemaType) {
    await submitRegister.mutateAsync(data);
  }

  return (
    <>
      <div className="h-64">
        <form onSubmit={handleSubmit(submut)}>
          <FieldGroup className="gap-3 mb-5">
            <Field className="gap-1">
              <FieldLabel className=" font-medium text-[#7d7a75] text-xs" htmlFor="email">
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                className="placeholder:font-light"
                placeholder="Enter email ... "
                {...register("email")}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel className=" font-medium text-[#7d7a75] text-xs" htmlFor="email">
                Name
              </FieldLabel>
              <Input
                id="name"
                type="text"
                className="placeholder:font-light"
                placeholder="Enter name ... "
                maxLength={20}
                {...register("name")}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel className=" font-medium text-[#7d7a75] text-xs" htmlFor="password">
                Password
              </FieldLabel>
              <Input
                className="placeholder:font-light"
                id="password1"
                type="password"
                maxLength={25}
                placeholder="Enter password ... "
                {...register("password")}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel className=" font-medium text-[#7d7a75] text-xs" htmlFor="password">
                Confirm Password
              </FieldLabel>
              <Input
                className="placeholder:font-light"
                id="password2"
                type="password"
                maxLength={25}
                placeholder="Confirm password ... "
                {...register("confirmPassword")}
              />
            </Field>
          </FieldGroup>
          <Button
            className="bg-[#2383e2] w-full text-white font-normal hover:bg-[#217bd5] hover:text-white"
            disabled={formState.isSubmitting}
            variant={"outline"}
          >
            Register
          </Button>
          <FieldError className="justify-self-center mt-3 font-light">
            {firstErrorMessage}
          </FieldError>
        </form>
      </div>
    </>
  );
}
