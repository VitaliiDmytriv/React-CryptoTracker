import { RegisterForm } from "@/features/auth";

export default function RegisterPage() {
  return (
    <>
      <div className="flex justify-center items-center flex-1">
        <section className="min-w-80">
          <div className="mb-10">
            <h1 className="text-xl font-semibold">Your crypto trading workspace.</h1>
            <h2 className="text-xl font-semibold text-[#a19e99]">Create your account</h2>
          </div>
          <RegisterForm />
        </section>
      </div>
    </>
  );
}
