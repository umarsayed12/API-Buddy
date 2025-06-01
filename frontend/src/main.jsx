import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { JwtProvider } from "./context/JWTContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ApiPage from "./pages/ApiPage.jsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store.js";
import { Toaster } from "./components/ui/sonner.jsx";
const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ApiPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/api-test-page",
        element: <ApiPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JwtProvider>
      <Provider store={appStore}>
        <RouterProvider router={route}></RouterProvider>
        <Toaster />
      </Provider>
    </JwtProvider>
  </StrictMode>
);
