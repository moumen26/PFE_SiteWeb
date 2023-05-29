import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import TableConcultationReadOnlyRow from "./tableConcultationReadOnlyRow";
import dataConcultation from "../../ConcultationDataBase.json";

export default function TableConcultation() {
   const [ConcultationDB, setConcultationDB] = useState(dataConcultation);

  return (
    <div className="table-concultation">
      <div className="table-conclutation-container">
        <h2>Conclutation</h2>
        <div className="table-conclutation-search">
          <input type="search" placeholder="Search.." />
          <AiOutlineSearch className="search-icon" />
        </div>
      </div>
      <div className="table-concultation-center">
        <table>
          {ConcultationDB.map((Concultation) => (
          <TableConcultationReadOnlyRow Concultation={Concultation} />
          ))}
        </table>
      </div>
    </div>
  );
}
