import { CiLock, CiUnlock } from "react-icons/ci";
export default function AddVisiteButton({ addVisite, setAddvisite }) {
  const handleClickAddCahier = () => {
    setAddvisite(!addVisite);
  };

  let toggleClassAddVisite = addVisite ? " add-visite-active" : "";
  return (
    <button
      className={`add-visite-button${toggleClassAddVisite}`}
      onClick={handleClickAddCahier}
    >
      <h2>Visites systematique</h2>
      <CiLock className="lock-icon" />
      <CiUnlock className="lock-icon-ouvert" />
    </button>
  );
}
