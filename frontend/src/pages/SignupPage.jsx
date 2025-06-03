import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { BottomGradient } from "../components/ui/bottomGradient";
import { LabelInputContainer } from "../components/ui/LabelInputContainer";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../slices/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { userLoggedIn } from "../slices/authSlice";
import { Loader2 } from "lucide-react";
export default function SignupPage() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingBtn(true);
    const user = await registerUser(data);
    if (user) {
      await loginUser(data);
    }
    setLoadingBtn(false);
  };
  useEffect(() => {
    if (registerIsSuccess) {
      toast.success(registerData?.message || "Account created Successfully.");
    } else if (registerError) {
      toast.error(
        registerError?.data?.message ||
          "Some error occured. Please SignUp Again."
      );
    }
    if (loginIsSuccess) {
      toast.success("Welcome to Api Buddy.");
      navigate("/");
    } else if (loginError) {
      toast.error(
        loginError?.data?.message || "Error while LogIn. Please Try Again"
      );
      navigate("/login");
    }
  }, [registerIsSuccess, registerError]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full bg-white max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-1">
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
              disabled={loadingBtn}
              className={`group/btn shadow-input relative cursor-pointer flex h-10 w-full items-center justify-center space-x-2 rounded-md ${
                loadingBtn ? "bg-zinc-600" : "bg-zinc-900"
              } px-4 font-medium text-white my-6 dark:shadow-[0px_0px_1px_1px_#262626]`}
              type="submit"
            >
              {loadingBtn ? (
                <>
                  <Loader2 className="animate-spin" /> Please Wait
                </>
              ) : (
                "Create Account"
              )}
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
