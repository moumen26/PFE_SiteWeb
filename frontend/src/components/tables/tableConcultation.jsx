import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import TableConcultationReadOnlyRow from "./tableConcultationReadOnlyRow";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function TableConcultation({ ConcultationDB }) {
  const [Search, setSearch] = useState("");

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
            <td className="table-concultation-td-search concultation-search">
              <div className="table-conclutation-search concultation-search">
                <input
                  type="search"
                  className="class-search"
                  placeholder="Search.."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <AiOutlineSearch className="search-icon" />
              </div>
            </td>
          </tr>
          <div className="table-concultation-container">
            {ConcultationDB?.filter((item) => {
              if(item.DateConcultation && item.HeureConsultation){
                if (Search === "" || !Search) {
                  return item;
                } else if (
                  item?.DateConcultation.toLowerCase().includes(Search.toLowerCase()) || item?.HeureConsultation.toLowerCase().includes(Search.toLowerCase()) ||
                  item?.MedecinNom.toLowerCase().includes(Search.toLowerCase())) {
                  return item;
                }
              }else if(item.DateHospitalisation && item.HeureHospitalisation){
                if (Search === "" || !Search) {
                  return item;
                } else if (
                  item?.DateHospitalisation.toLowerCase().includes(Search.toLowerCase()) || item?.HeureHospitalisation.toLowerCase().includes(Search.toLowerCase()) ||
                  item?.MedecinNom.toLowerCase().includes(Search.toLowerCase())) {
                  return item;
                }
              }else{
                return item;
              }
              
            }).map((Concultation) => (
              <TableConcultationReadOnlyRow Concultation={Concultation} />
            ))}
          </div>
        </table>
      </div>
    </div>
  );
}
