export default function VaccinationAddButton2({
  addVaccinTable2,
  setaddVaccinTable2,
}) {
  const handleClickAddVaccinTable2 = () => {
    setaddVaccinTable2(!addVaccinTable2);
  };

  let toggleClassAddVaccinTable2 = addVaccinTable2
    ? " add-Vaccin-Table-active2"
    : "";

  return (
    <button
      className={`vaccination-add-button${toggleClassAddVaccinTable2}`}
      onClick={handleClickAddVaccinTable2}
    >
      Vaccination +
    </button>
  );
}
