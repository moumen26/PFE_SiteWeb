import React from "react";

function EditRow({editFromData, handleEditFromChange}) {
  return (
    <tr>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationAge"
          id="vaccination-age"
          required="required"
          
          onChange={handleEditFromChange}
        >
          <option selected disabled>
            Age
          </option>

          <option value="1mois">1 mois</option>
          <option value="2mois">2 mois</option>
          <option value="3mois">3 mois</option>
        </select>
      </td>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationVaccin"
          id="vaccination-vaccin"
          required="required"
          onChange={handleEditFromChange}
        >
          <option selected disabled>
            Vaccin
          </option>
          <option value="vaccin1">vaccin</option>
          <option value="vaccin2">vaccin2</option>
          <option value="vaccin3">vaccin3</option>
          <option value="vaccin4">vaccin4</option>
        </select>
      </td>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationContre"
          id="vaccination-contre"
          required="required"
          onChange={handleEditFromChange}
        >
          <option selected disabled>
            Contre
          </option>
          <option value="contre1">contre</option>
          <option value="contre2">contre2</option>
          <option value="contre3">contre3</option>
          <option value="contre4">contre4</option>
        </select>
      </td>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationTechnique"
          id="vaccination-technique"
          required="required"
          onChange={handleEditFromChange}
        >
          <option selected disabled>
            Technique
          </option>
          <option value="technique1">technique1</option>
          <option value="technique2">technique2</option>
          <option value="technique3">technique3</option>
          <option value="technique4">technique4</option>
        </select>
      </td>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationNumero"
          id="vaccination-numero"
          required="required"
          onChange={handleEditFromChange}
        >
          <option selected disabled>
            Numero
          </option>
          <option value="numero1">numero1</option>
          <option value="numero2">numero2</option>
          <option value="numero3">numero3</option>
          <option value="numero4">numero4</option>
        </select>
      </td>
      <td>
        onChange={handleEditFromChange}
        <input
          type="date"
          name="vaccinationDate"
          required="required"
          onChange={handleEditFromChange}
        />
      </td>
    </tr>
  );
}

export default EditRow;
