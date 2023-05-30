import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import TableConcultationReadOnlyRow from "./tableConcultationReadOnlyRow";
import dataConcultation from "../../ConcultationDataBase.json";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function TableConcultation({ConcultationDB,Search}) {
  return (
    <div className="table-concultation">
      <div className="table-concultation-center">
        <table>
          <tr className="table-concultation-ligne">
            <td className="table-concultation-td-nom table-concultation-tr">
              Medcin
            </td>
            <td className="table-concultation-td-date table-concultation-tr">
              Date
            </td>
            <td className="table-concultation-td-time table-concultation-tr">
              Heure
            </td>
          </tr>
          {ConcultationDB?.filter((item) => {
            if (Search === "" || !Search) {
              return item;
            } else if ((item.DateConcultation.toLowerCase().includes(Search.toLowerCase())) ||
            (item.HeureConsultation.toLowerCase().includes(Search.toLowerCase())) || 
            (item.MedecinNom.toLowerCase().includes(Search.toLowerCase()))) {
              return item;
            }
          }).map((Concultation) => (
            <TableConcultationReadOnlyRow Concultation={Concultation} />
          ))}
        </table>
      </div>
    </div>
  );
}
