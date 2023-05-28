export default function VaccinationAddButton({
  addVaccinTable,
  setaddVaccinTable,
}) {
  const handleClickAddVaccinTable = () => {
    setaddVaccinTable(!addVaccinTable);
  };

  let toggleClassAddVaccinTable = addVaccinTable
    ? " add-Vaccin-Table-active"
    : "";

  return (
    <button
      className={`vaccination-add-button${toggleClassAddVaccinTable}`}
      onClick={handleClickAddVaccinTable}
    >
      Vaccination +
    </button>
  );
}
