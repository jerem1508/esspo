import React, { useState } from "react";
import { useCompetition } from "../context/CompetitionContext";
import type { Club } from "../types/competition";

export function ClubsManagement() {
  const { state, addClub, deleteClub, error } = useCompetition();
  const [clubName, setClubName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (clubName.trim()) {
      try {
        setLocalError(null);
        setIsLoading(true);
        await addClub({
          name: clubName.trim(),
        });
        setClubName("");
        setShowForm(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur lors de l'ajout du club";
        setLocalError(message);
        console.error("Erreur addClub:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const displayError = localError || error;

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">
          Gestion des clubs
          {state.clubs.length > 0 && <span className="badge">{state.clubs.length}</span>}
        </span>

        <button className="btn waves-effect waves-light" onClick={() => setShowForm(!showForm)} disabled={isLoading}>
          {showForm ? "Annuler" : "Ajouter un club"}
        </button>

        {displayError && (
          <div style={{ color: "red", marginTop: "10px", padding: "10px", backgroundColor: "#ffebee", borderRadius: "4px" }}>⚠️ {displayError}</div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div className="input-field col s12">
              <input
                id="clubName"
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="Nom du club"
                required
                disabled={isLoading}
              />
              <button type="submit" className="btn waves-effect waves-light green" disabled={isLoading}>
                {isLoading ? "Ajout en cours..." : "Ajouter"}
              </button>
            </div>
          </form>
        )}

        {state.clubs.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <ul className="collection">
              {state.clubs.map((club: Club) => (
                <li key={club.id} className="collection-item">
                  {club.name}
                  <a href="#!" className="secondary-content" onClick={() => deleteClub(club.id)}>
                    <i className="material-icons">delete</i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
