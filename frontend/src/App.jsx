import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useLoadUserQuery } from "./slices/api/authApi";
import LoadingScreen from "./components/ui/LoadingScreen";
function App() {
  const { data, isLoading } = useLoadUserQuery();
  if (isLoading)
    return (
      <>
        <LoadingScreen />
      </>
    );
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
