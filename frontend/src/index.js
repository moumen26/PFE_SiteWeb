import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import PatientProfile from "./pages/patientProfile";
import AddPatient from "./pages/addPatient";
import Calendrier from "./pages/calendrier";
import Coupon from "./pages/coupon";
import Analytics from "./pages/analytics";
import Login from "./pages/loginPage";
import PatientDetails from "./pages/patientDetails";
import {AuthContextProvider} from "./context/Authcontext";
import { useAuthContext } from "./hooks/useAuthContext";

const PrivateRoute = () => {
  const {user} = useAuthContext();
  if (user) {
    return true;
  }else{
    return false;
  }
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <App />,
  },
  {
    path: "patients",
    element: <PatientDetails />,
  },
  {
    path: "addpatients",
    element: <AddPatient />,
  },
  {
    path: "calendrier",
    element: <Calendrier />,
  },
  {
    path: "coupon",
    element: <Coupon />,
  },
  {
    path: "analytics",
    element: <Analytics />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
