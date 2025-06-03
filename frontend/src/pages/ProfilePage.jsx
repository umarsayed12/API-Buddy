import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-center text-2xl">
        Welcome Back <span className="text-violet-500">{user.name}</span>
      </h1>
    </div>
  );
};

export default ProfilePage;
