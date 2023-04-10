import { CiLock, CiUnlock } from "react-icons/ci";
export default function AddVisiteButton2({ addVisite2, setAddvisite2 }) {
  const handleClickAddCahier2 = () => {
    setAddvisite2(!addVisite2);
  };

  let toggleClassAddVisite2 = addVisite2 ? " add-visite-active2" : "";
  return (
    <button
      className={`add-visite-button${toggleClassAddVisite2}`}
      onClick={handleClickAddCahier2}
    >
      <h2>Visites systematique</h2>
      <CiLock className="lock-icon" />
      <CiUnlock className="lock-icon-ouvert" />
    </button>
  );
}
