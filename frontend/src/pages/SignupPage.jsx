import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { BottomGradient } from "../components/ui/bottomGradient";
import { LabelInputContainer } from "../components/ui/LabelInputContainer";
import { useRegisterUserMutation } from "../slices/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export default function SignupPage() {
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await registerUser(data);
  };
  useEffect(() => {
    if (registerIsSuccess) {
      toast.success(registerData?.message || "Account created Successfully.");
    } else if (registerError) {
      toast.error(
        registerError?.data?.message || "Some error occured. Please Try Again"
      );
    }
  }, [registerIsSuccess, registerError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full bg-white max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
          <p className="text-lg text-center">
            Hey there. Register your account
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <LabelInputContainer>
                <Label>Full Name</Label>
                <Input
                  placeholder="Sayed Sahab"
                  type="text"
                  {...register("name", { required: true })}
                />
              </LabelInputContainer>
              {errors.name && (
                <span className="text-sm text-red-500">
                  Full Name is required
                </span>
              )}
            </div>
            <div>
              <LabelInputContainer>
                <Label>Email</Label>
                <Input
                  placeholder="xyz@gmail.com"
                  type="email"
                  {...register("email", { required: true })}
                />
              </LabelInputContainer>
              {errors.email && (
                <span className="text-sm text-red-500">Email is required</span>
              )}
            </div>
            <div>
              <LabelInputContainer>
                <Label>Password</Label>
                <Input
                  placeholder="pass@4325"
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                />
              </LabelInputContainer>
              {errors.password && (
                <span className="text-sm text-red-500">
                  Password must be at least 6 characters
                </span>
              )}
            </div>
            <button
              className="group/btn shadow-input relative cursor-pointer flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-white dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="submit"
            >
              Create Account &rarr;
              <BottomGradient />
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer text-blue-500"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
