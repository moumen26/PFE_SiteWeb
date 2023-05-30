import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PatientDetails from "./pages/patientMaman";
import patientProfile from "./pages/patientProfile";
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
import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import AffichageConcultation from "./pages/affichageConcultation";
import PatientProfile from "./pages/patientProfile";
import TableConcultation from "./components/tables/tableConcultation";
import MamanProfile from "./pages/mamanProfile";

function App() {
  const [act, setAct] = useState(false);
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <main>
        <MyNavBar act={act} setAct={setAct} />
        <MyAsideBar />
        <Routes>
          <Route
            index
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="patients"
            element={user ? <PatientDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="Nouveaune"
            element={user ? <NouveauNe /> : <Navigate to="/login" />}
          />
          <Route
            path="/patients/:id"
            element={user ? <AddPatient /> : <Navigate to="/login" />}
          />
          <Route
            path="/patients/details/:id"
            element={user ? <patientProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="calendrier"
            element={user ? <Calendrier /> : <Navigate to="/login" />}
          />
          <Route
            path="affichage"
            element={
              user ? <AffichageConcultation /> : <Navigate to="/login" />
            }
          />
          <Route
            path="paramètres"
            element={user ? <Coupon /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={
              !user ? (
                <Login />
              ) : !user.progress ? (
                <Navigate to="/profile" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="profile"
            element={user ? <DoctorProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="antecedent/:id"
            element={user ? <Antecedent /> : <Navigate to="/login" />}
          />
          <Route
            path="Dossier-Patient/:id"
            element={user ? <MamanProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="Dossier-Nouveau-ne/:id"
            element={user ? <PatientProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="conculter/:id"
            element={user ? <Conculter /> : <Navigate to="/login" />}
          />
          <Route
            path="rendezvous"
            element={user ? <Rendezvous /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
