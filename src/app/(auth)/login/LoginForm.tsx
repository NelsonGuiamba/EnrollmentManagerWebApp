"use client";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, addToast } from "@heroui/react";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

import { LoginSchema, loginSchema } from "@/lib/schema/loginSchema";
import { signInUser } from "@/actions/authActions";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const router = useRouter();

  async function onSubmit(data: LoginSchema) {
    const result = await signInUser(data);

    console.log(result);
    if (result.status === "success") {
      router.push("/");
    } else {
      addToast({
        title: "Login",
        variant: "flat",
        color: "danger",
        description: result.error as string,
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
  }

  return (
    <Card className="w-full sm:w-3/5 mt-6">
      <CardHeader className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
        </div>

        <p className="text-neutral">Welcome back to next match</p>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 flex flex-col gap-4">
            <Input
              label="Email"
              variant="bordered"
              {...register("email")}
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
            />
            <Input
              label="Password"
              type="password"
              variant="bordered"
              {...register("password")}
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
            />
            <Button
              fullWidth
              color="secondary"
              isDisabled={!isValid}
              isLoading={isSubmitting}
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
