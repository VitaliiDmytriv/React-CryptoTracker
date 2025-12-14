import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import api from "@/api/axios";
import axios from "axios";

type LoginData = {
  email: string;
  password: string;
};

export default function AuthLogin() {
  const [loginError, setLoginError] = useState<null | string>(null);
  const { register, handleSubmit, formState, clearErrors } = useForm<LoginData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleInputChange() {
    if (formState.errors.email) {
      clearErrors("email");
    }

    if (formState.errors.password) {
      clearErrors("password");
    }

    if (!loginError) return;
    setLoginError(null);
  }

  async function onSubmit(data: LoginData) {
    try {
      const { data: ServerData } = await api.post("/auth/login", data);
      login(ServerData.user);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setLoginError(error.response?.data.error);
      }
    }
  }

  return (
    <>
      <div className="min-w-80">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {formState.errors.email?.message ?? formState.errors.password?.message ?? loginError}
          </FieldError>
        </form>
      </div>
    </>
  );
}
