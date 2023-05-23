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


function App() {
 
  return (
    <BrowserRouter>
      <main>
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
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
