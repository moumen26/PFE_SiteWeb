import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import TableAntecedentReadOnlyRow from "./tableAntecedentReadOnlyRow";
import dataAntecedent from "../../AntecedentDataBase.json";
export default function TableAntecedent({AntecedentDB}) {
  const [Search, setSearch] = useState("");

  return (
    <div className="table-Antecedent">
      <div className="table-concultation-center">
        <table>
          <tr className="table-concultation-ligne">
            <td className="table-concultation-td-nom table-concultation-tr">
              Maladie
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
            {AntecedentDB.filter((item)=>{
              if(item?.DiagnosticID !== undefined && item?.Maladie !== ""){
                if(Search === "" || !Search){
                  return item;
                }else if(item?.Maladie.toLowerCase().includes(Search.toLowerCase()) ||
                item?.DateConcultation.toLowerCase().includes(Search.toLowerCase()) || item?.HeureConsultation.toLowerCase().includes(Search.toLowerCase())){
                  return item;
                }
              }
            }).map((Antecedent) => (
              <TableAntecedentReadOnlyRow Antecedent={Antecedent} />
            ))}
          </div>
        </table>
      </div>
    </div>
  );
}
