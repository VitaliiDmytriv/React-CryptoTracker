import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import type { LoginData } from "../types/auth.type";

export function LoginForm() {
  const { loginUser, error, clearError } = useLogin();

  const { register, handleSubmit, formState, clearErrors } = useForm<LoginData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  function handleInputChange() {
    clearError();
    if (formState.errors.email) clearErrors("email");
    if (formState.errors.password) clearErrors("password");
  }

  return (
    <>
      <div className="h-64">
        <form onSubmit={handleSubmit(loginUser)}>
          <FieldGroup className="gap-3 mb-5">
            <Field className="gap-1">
              <FieldLabel className=" font-medium text-[#7d7a75] text-xs" htmlFor="email">
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                className="placeholder:font-light"
                placeholder="Enter your email ... "
                {...register("email", {
                  required: "Email is required",
                  onChange: handleInputChange,
                })}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel className=" font-medium text-[#7d7a75] text-xs" htmlFor="password">
                Password
              </FieldLabel>
              <Input
                className="placeholder:font-light"
                id="password"
                type="password"
                placeholder="Enter your password ... "
                {...register("password", {
                  required: "Password is required",
                  onChange: handleInputChange,
                })}
              />
            </Field>
          </FieldGroup>
          <Button
            className="bg-[#2383e2] w-full text-white font-normal hover:bg-[#217bd5] hover:text-white"
            disabled={formState.isSubmitting}
            variant={"outline"}
          >
            Login
          </Button>
          <FieldError className="justify-self-center mt-3 font-light">
            {formState.errors.email?.message ?? formState.errors.password?.message ?? error}
          </FieldError>
        </form>
      </div>
    </>
  );
}
