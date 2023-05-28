import { CiLock, CiUnlock } from "react-icons/ci";
export default function AddVaccinButtonTable({ addVaccin2, setAddVaccin2 }) {
  const handleClickAddCahier = () => {
    setAddVaccin2(!addVaccin2);
  };

  let toggleClassAddVaccin2 = addVaccin2 ? " add-vaccin-active2" : "";
  return (
    <button
      className={`add-vaccin-button${toggleClassAddVaccin2}`}
      onClick={handleClickAddCahier}
    >
      <h2>Vaccination</h2>
      <CiLock className="lock-icon" />
      <CiUnlock className="lock-icon-ouvert" />
    </button>
  );
}
