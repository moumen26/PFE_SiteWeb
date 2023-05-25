import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PatientDetails from "./pages/patientMaman";
import NouveauNe from "./pages/nouveaune";
import AddPatient from "./pages/addPatient";
import Calendrier from "./pages/calendrier";
import Coupon from "./pages/coupon";
import Analytics from "./pages/analytics";
import Login from "./pages/loginPage";
import DoctorProfile from "./pages/doctorProfile";
import Rendezvous from "./pages/rendezvous";
import Antecedent from "./pages/antecedent";
import MyAsideBar from "./components/asideBar";
import Conculter from "./pages/conculter";
import MyNavBar from "./components/navBar";
import { useState } from "react";


function App() {
  const [act, setAct] = useState(false);

 
  return (
    <BrowserRouter>
      <main>
        <MyNavBar act={act} setAct={setAct} />
        <MyAsideBar />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<PatientDetails />} />
          <Route path="Nouveaune" element={<NouveauNe />} />
          <Route path="/patients/:id" element={<AddPatient />} />
          <Route path="calendrier" element={<Calendrier />} />
          <Route path="coupon" element={<Coupon />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="antecedent/:id" element={<Antecedent />} />
          <Route path="conculter" element={<Conculter />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
