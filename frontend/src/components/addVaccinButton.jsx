import { CiLock, CiUnlock } from "react-icons/ci";
export default function AddVaccinButton({ addVaccin, setAddvacin }) {
  const handleClickAddCahier = () => {
    setAddvacin(!addVaccin);
  };

  let toggleClassAddVaccin = addVaccin ? " add-vaccin-active" : "";
  return (
    <button
      className={`add-vaccin-button${toggleClassAddVaccin}`}
      onClick={handleClickAddCahier}
    >
      <h2>Vaccination</h2>
      <CiLock className="lock-icon" />
      <CiUnlock className="lock-icon-ouvert" />
    </button>
  );
}
