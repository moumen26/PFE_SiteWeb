import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PatientProfile from "./pages/patientProfile";
import AddPatient from "./pages/addPatient";
import Calendrier from "./pages/calendrier";
import Coupon from "./pages/coupon";
import Analytics from "./pages/analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "patients",
    element: <PatientProfile />,
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
