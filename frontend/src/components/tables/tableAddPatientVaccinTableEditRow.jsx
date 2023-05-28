import React from "react";

function EditRow({ editFromData, handleEditFromChange, handleCancelClick }) {
  return (
    <tr>
      <td>
        <select
          className="vaccination-select"
          name="vaccinationAge"
          id="vaccination-age"
          required="required"
          value={editFromData?.Age_vaccination}
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
          value={editFromData?.Nom_vaccin}
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
          value={editFromData?.Contre_vaccin}
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
          value={editFromData?.Technique_vaccinale}
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
          value={editFromData?.Numero_lot}
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
        <input
          className="editDate"
          type="date"
          name="vaccinationDate"
          required="required"
          value={editFromData?.Date_vaccination}
          onChange={handleEditFromChange}
        />
      </td>
      <td>
        <div className="action-table">
          <button type="submit">Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </td>
    </tr>
  );
}

export default EditRow;
