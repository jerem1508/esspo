import React, { useState } from "react";
import { useCompetition } from "../context/CompetitionContext";
import { getCategoryByBirthDate } from "../utils/competition";
import type { Participant, Club, Gender } from "../types/competition";

interface ParticipantsManagementProps {
  clubs: Club[];
  onAddClub?: () => void;
}

export function ParticipantsManagement({ clubs, onAddClub }: ParticipantsManagementProps) {
  const { state, addParticipant, deleteParticipant, error } = useCompetition();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string>("firstName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "F" as Gender,
    birthDate: "",
    licenseNumber: "",
    clubId: clubs[0]?.id || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLocalError(null);
      setIsLoading(true);
      const category = getCategoryByBirthDate(formData.birthDate, formData.gender);
      await addParticipant({
        ...formData,
        category,
      });
      setFormData({
        firstName: "",
        lastName: "",
        gender: "F",
        birthDate: "",
        licenseNumber: "",
        clubId: clubs[0]?.id || "",
      });
      setShowForm(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'ajout";
      setLocalError(message);
      console.error("Erreur addParticipant:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getClubName = (clubId: string) => {
    return clubs.find((c) => c.id === clubId)?.name || "N/A";
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      EAF: "#FF69B4", // Rose pour Éveil Filles
      EAM: "#4169E1", // Bleu pour Éveil Mecs
      POF: "#FFD700", // Or pour Poussines Filles
      POM: "#32CD32", // Vert lime pour Poussins Mecs
    };
    return colorMap[category] || "#1976d2";
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortedParticipants = () => {
    const sorted = [...state.participants];
    sorted.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortColumn === "firstName") {
        aValue = a.firstName.toLowerCase();
        bValue = b.firstName.toLowerCase();
      } else if (sortColumn === "lastName") {
        aValue = a.lastName.toLowerCase();
        bValue = b.lastName.toLowerCase();
      } else if (sortColumn === "gender") {
        aValue = a.gender;
        bValue = b.gender;
      } else if (sortColumn === "birthDate") {
        aValue = new Date(a.birthDate).getTime();
        bValue = new Date(b.birthDate).getTime();
      } else if (sortColumn === "category") {
        aValue = a.category;
        bValue = b.category;
      } else if (sortColumn === "licenseNumber") {
        aValue = a.licenseNumber.toLowerCase();
        bValue = b.licenseNumber.toLowerCase();
      } else if (sortColumn === "club") {
        aValue = getClubName(a.clubId).toLowerCase();
        bValue = getClubName(b.clubId).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return " ↕";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  const getFilteredParticipants = () => {
    return state.participants.filter((participant: Participant) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        participant.firstName.toLowerCase().includes(searchLower) ||
        participant.lastName.toLowerCase().includes(searchLower) ||
        participant.category.toLowerCase().includes(searchLower)
      );
    });
  };

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">
          Gestion des participants
          {state.participants.length > 0 && <span className="badge">{state.participants.length}</span>}
        </span>

        {(localError || error) && (
          <div style={{ color: "red", marginBottom: "10px", padding: "10px", backgroundColor: "#ffebee", borderRadius: "4px" }}>
            ⚠️ {localError || error}
          </div>
        )}

        <button className="btn waves-effect waves-light" onClick={() => setShowForm(!showForm)} disabled={isLoading}>
          {showForm ? "Annuler" : "Ajouter un participant"}
        </button>

        {state.participants.length > 0 && (
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Rechercher par prénom, nom ou catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            />
            {getFilteredParticipants().length !== state.participants.length && (
              <p style={{ margin: "10px 0 0 0", fontSize: "12px", color: "#666" }}>
                {getFilteredParticipants().length} résultat(s) sur {state.participants.length}
              </p>
            )}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="form-container">
            <div className="row">
              <div className="input-field col s12 m6">
                <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} required />
                <label htmlFor="firstName">Prénom</label>
              </div>
              <div className="input-field col s12 m6">
                <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} required />
                <label htmlFor="lastName">Nom</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12 m3">
                <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
                  <option value="" disabled>
                    Sélectionner un genre
                  </option>
                  <option value="F">Fille</option>
                  <option value="M">Garçon</option>
                </select>
                {/* <label htmlFor="gender">Genre</label> */}
              </div>
              <div className="input-field col s12 m3">
                <input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required />
                <label htmlFor="birthDate">Date de naissance</label>
              </div>

              <div className="input-field col s12 m3">
                <input id="licenseNumber" name="licenseNumber" type="text" value={formData.licenseNumber} onChange={handleChange} required />
                <label htmlFor="licenseNumber">Numéro de licence</label>
              </div>
              <div className="input-field col s12 m3">
                <select name="clubId" value={formData.clubId} onChange={handleChange} required>
                  {clubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
                {clubs.length === 0 && (
                  <p className="helper-text" style={{ color: "red" }}>
                    Veuillez d'abord créer un club
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="btn waves-effect waves-light green" disabled={clubs.length === 0 || isLoading}>
              {isLoading ? "Ajout en cours..." : "Ajouter"}
            </button>
          </form>
        )}

        {state.participants.length > 0 && (
          <div className="table-container" style={{ marginTop: "20px" }}>
            <table className="striped">
              <thead>
                <tr>
                  <th style={{ cursor: "pointer" }} onClick={() => handleSort("firstName")}>
                    Prénom
                    {renderSortIcon("firstName")}
                  </th>
                  <th style={{ cursor: "pointer" }} onClick={() => handleSort("lastName")}>
                    Nom
                    {renderSortIcon("lastName")}
                  </th>
                  <th style={{ cursor: "pointer" }} onClick={() => handleSort("gender")}>
                    Genre
                    {renderSortIcon("gender")}
                  </th>
                  <th style={{ cursor: "pointer" }} onClick={() => handleSort("birthDate")}>
                    Date de naissance
                    {renderSortIcon("birthDate")}
                  </th>
                  <th style={{ cursor: "pointer" }} onClick={() => handleSort("category")}>
                    Catégorie
                    {renderSortIcon("category")}
                  </th>
                  <th style={{ cursor: "pointer" }} onClick={() => handleSort("licenseNumber")}>
                    Licence
                    {renderSortIcon("licenseNumber")}
                  </th>
                  <th style={{ cursor: "pointer" }} onClick={() => handleSort("club")}>
                    Club
                    {renderSortIcon("club")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getSortedParticipants()
                  .filter((participant: Participant) => {
                    const searchLower = searchTerm.toLowerCase();
                    return (
                      participant.firstName.toLowerCase().includes(searchLower) ||
                      participant.lastName.toLowerCase().includes(searchLower) ||
                      participant.category.toLowerCase().includes(searchLower)
                    );
                  })
                  .map((participant: Participant) => (
                    <tr key={participant.id}>
                      <td>{participant.firstName}</td>
                      <td>{participant.lastName}</td>
                      <td>{participant.gender === "F" ? "F" : "M"}</td>
                      <td>{participant.birthDate}</td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: getCategoryColor(participant.category),
                            color: participant.category === "POF" ? "#000" : "white",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "50px",
                          }}
                        >
                          {participant.category}
                        </span>
                      </td>
                      <td>{participant.licenseNumber}</td>
                      <td>{getClubName(participant.clubId)}</td>
                      <td>
                        <button className="btn btn-small red waves-effect" onClick={() => deleteParticipant(participant.id)} disabled={isLoading}>
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
