import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { BottomGradient } from "../components/ui/bottomGradient";
import { LabelInputContainer } from "../components/ui/LabelInputContainer";
import { useLoginUserMutation } from "../slices/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../slices/authSlice";
import LoadingScreen from "../components/ui/LoadingScreen";
import { Loader2 } from "lucide-react";
export default function LoginPage() {
  const [loadingBtn, setLoadingBtn] = useState(false);
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
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    setLoadingBtn(true);
    const userData = await loginUser(data);
    setLoadingBtn(false);
  };
  useEffect(() => {
    if (loginIsSuccess) {
      toast.success(loginData?.message || "Welcome Back");
      navigate("/");
    } else if (loginError) {
      toast.error(
        loginError?.data?.message || "Some error occured. Please Try Again"
      );
    }
  }, [loginIsSuccess, loginError]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Card className="w-full bg-white max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <p className="text-lg text-center">Log in to your account</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <LabelInputContainer>
                <Label>Email</Label>
                <Input
                  placeholder="Enter your Email..."
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
                  placeholder="Enter Your Password..."
                  type="password"
                  {...register("password", { required: true })}
                />
              </LabelInputContainer>
              {errors.password && (
                <span className="text-sm text-red-500">
                  Password is required
                </span>
              )}
            </div>
            <button
              className="group/btn mt-6 shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-white cursor-pointer dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="submit"
            >
              {loadingBtn ? (
                <>
                  <Loader2 className="animate-spin" /> Please Wait
                </>
              ) : (
                `Login`
              )}
              <BottomGradient />
            </button>
          </form>
          <p className="text-center">
            Don't have an account?{" "}
            <span
              className="underline cursor-pointer text-blue-500"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
