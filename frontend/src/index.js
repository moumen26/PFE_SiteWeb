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
import Login from "./pages/loginPage";
import PatientDetails from "./pages/patientMaman";
import DoctorProfile from "./pages/doctorProfile";
import { AuthContextProvider } from "./context/Authcontext";
import Antecedent from "./pages/antecedent";
import NouveauNe from "./pages/nouveaune";
import Rendezvous from "./pages/rendezvous";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "dashboard",
//     element: <App />,
//   },
//   {
//     path: "patients",
//     element: <PatientDetails />,
//   },
//   {
//     path: "Nouveaune",
//     element: <NouveauNe/>,
//   },
//   {
//     path: "/patients/:id",
//     element: <AddPatient />,
//   },
//   {
//     path: "calendrier",
//     element: <Calendrier />,
//   },
//   {
//     path: "coupon",
//     element: <Coupon />,
//   },
//   {
//     path: "analytics",
//     element: <Analytics />,
//   },
//   {
//     path: "login",
//     element: <Login />,
//   },
//   {
//     path: "profile",
//     element: <DoctorProfile />,
//   },

//   {
//     path: "seetings",
//     element: <Rendezvous />,
//   },
//   {
//     path: "antecedent/:id",
//     element: <Antecedent />,
//   },
  
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();