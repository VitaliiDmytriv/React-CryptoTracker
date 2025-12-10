import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import api from "@/api/axios";

type LoginData = {
  email: string;
  password: string;
};

export default function AuthLogin() {
  const { register, handleSubmit, formState } = useForm<LoginData>();

  async function onSubmit(data: LoginData) {
    console.log(data);

    try {
      const { data: ServerData } = await api.post("/auth/login", data);
      console.log(ServerData);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="min-w-60">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-1 mb-2">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              <FieldError>{formState.errors.email && formState.errors.email.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              <FieldError>
                {formState.errors.password && formState.errors.password.message}
              </FieldError>
            </Field>
          </FieldGroup>
          <Button variant={"outline"}>Login</Button>
        </form>
      </div>
    </>
  );
}
