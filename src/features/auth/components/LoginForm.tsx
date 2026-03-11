import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaType } from "../utils/shcemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthMutations } from "../hooks/useAuthMutations";
import { fieldOrderLogin } from "../utils/utils";

export function LoginForm() {
  const { register, handleSubmit, formState, setError } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { login: submitLogin } = useAuthMutations({ setError });

  const firstFieldError = fieldOrderLogin
    .map((field) => formState.errors[field]?.message)
    .find(Boolean);

  const firstErrorMessage = firstFieldError ?? formState.errors.root?.message;

  async function submit(data: LoginSchemaType) {
    await submitLogin.mutateAsync(data);
  }

  return (
    <>
      <div className="h-64">
        <form onSubmit={handleSubmit(submit)}>
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
                {...register("email")}
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
                {...register("password")}
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
            {firstErrorMessage}
          </FieldError>
        </form>
      </div>
    </>
  );
}
