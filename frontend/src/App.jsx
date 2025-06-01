import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useLoadUserQuery } from "./slices/api/authApi";
function App() {
  const { data, isLoading } = useLoadUserQuery();
  if (isLoading) return <>Please Wait...</>;
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
