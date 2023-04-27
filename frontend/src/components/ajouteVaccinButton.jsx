// export default function AjouteVaccinButton({
//   addVaccinTable,
//   setaddVaccinTable,
// }) {
//   const handleClickAddVaccinTable = () => {
//     setaddVaccinTable(!addVaccinTable);
//   };

//   let toggleClassAddVaccinTable = addVaccinTable
//     ? " add-Vaccin-Table-active"
//     : "";
//   return (
//     <button className={`Ajoute-Vaccin-Btn${toggleClassAddVaccinTable}`}
//     onClick={handleClickAddVaccinTable}>
//       Ajoute +
//     </button>
//   );
// }

export default function AjouteVaccinButton() {
  return <button className="Ajoute-Vaccin-Btn">Ajoute +</button>;
}
