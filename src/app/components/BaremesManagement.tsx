import React, { useState } from "react";
import { useCompetition } from "../context/CompetitionContext";
import type { Bareme, BaremeRow, Category, Event } from "../types/competition";

const CATEGORIES: Category[] = ["EAF", "EAM", "POF", "POM"];
const EVENTS: Event[] = ["vitesse", "haies", "pentabond", "lancé"];
const UNITS: Record<Event, string> = {
  vitesse: "s",
  haies: "s",
  pentabond: "m",
  lancé: "m",
};

export function BaremesManagement() {
  const { state, saveBareme, error } = useCompetition();
  const [selectedCategory, setSelectedCategory] = useState<Category>("EAF");
  const [selectedEvent, setSelectedEvent] = useState<Event>("vitesse");
  const [rows, setRows] = useState<BaremeRow[]>([{ rank: 1, minPerformance: 0, maxPerformance: 100, points: 100 }]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const currentBareme = state.baremes.find((b: Bareme) => b.category === selectedCategory && b.event === selectedEvent);

  const handleAddRow = () => {
    const newRow: BaremeRow = {
      rank: rows.length + 1,
      minPerformance: 0,
      maxPerformance: 100,
      points: 80,
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleRowChange = (index: number, field: keyof BaremeRow, value: number) => {
    const newRows = [...rows];
    newRows[index] = {
      ...newRows[index],
      [field]: value,
    };
    setRows(newRows);
  };

  const handleSave = async () => {
    try {
      setLocalError(null);
      setIsLoading(true);
      const bareme: Bareme = {
        id: currentBareme?.id || "", // Utiliser l'id existant ou vide pour une nouvelle création
        category: selectedCategory,
        event: selectedEvent,
        rows: rows.sort((a, b) => b.points - a.points), // Trier par points décroissants
        unit: UNITS[selectedEvent],
      };
      await saveBareme(bareme);
      setShowForm(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la sauvegarde";
      setLocalError(message);
      console.error("Erreur saveBareme:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadBareme = () => {
    if (currentBareme) {
      setRows([...currentBareme.rows]);
      setShowForm(true);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">Gestion des barèmes</span>

        {(localError || error) && (
          <div style={{ color: "red", marginBottom: "10px", padding: "10px", backgroundColor: "#ffebee", borderRadius: "4px" }}>
            ⚠️ {localError || error}
          </div>
        )}

        <div className="row">
          <div className="input-field col s12 m4">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as Category)}>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="input-field col s12 m4">
            <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value as Event)}>
              {EVENTS.map((evt) => (
                <option key={evt} value={evt}>
                  {evt}
                </option>
              ))}
            </select>
          </div>
          <div className="col s12 m4" style={{ display: "flex", alignItems: "center" }}>
            <button
              className="btn waves-effect waves-light"
              onClick={() => {
                if (currentBareme) {
                  handleLoadBareme();
                } else {
                  setShowForm(!showForm);
                }
              }}
              disabled={isLoading}
              style={{ height: "3rem", lineHeight: "1.5rem", padding: "0 1.5rem" }}
            >
              {showForm ? "Annuler" : currentBareme ? "Modifier" : "Créer barème"}
            </button>
          </div>
        </div>

        <div>
          {currentBareme && (
            <p className="teal-text">
              ✓ Barème existant pour {selectedCategory} - {selectedEvent}
            </p>
          )}
        </div>

        {showForm && (
          <div style={{ marginTop: "20px" }}>
            <h5>Définir les plages de points</h5>
            <div className="table-container">
              <table className="striped">
                <thead>
                  <tr>
                    <th>Rang</th>
                    <th>Min Performance ({UNITS[selectedEvent]})</th>
                    <th>Max Performance ({UNITS[selectedEvent]})</th>
                    <th>Points</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>{row.rank}</td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={row.minPerformance}
                          onChange={(e) => handleRowChange(index, "minPerformance", parseFloat(e.target.value))}
                          style={{ width: "80px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={row.maxPerformance}
                          onChange={(e) => handleRowChange(index, "maxPerformance", parseFloat(e.target.value))}
                          style={{ width: "80px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={row.points}
                          onChange={(e) => handleRowChange(index, "points", parseFloat(e.target.value))}
                          style={{ width: "80px" }}
                        />
                      </td>
                      <td>
                        <button className="btn btn-small red" onClick={() => handleRemoveRow(index)}>
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="btn waves-effect waves-light" onClick={handleAddRow} style={{ marginTop: "10px" }}>
              Ajouter une ligne
            </button>

            <button className="btn waves-effect waves-light green" onClick={handleSave} style={{ marginLeft: "10px" }} disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        )}

        {state.baremes.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h5>Barèmes par catégorie</h5>
            <div className="row">
              {CATEGORIES.map((category, index) => {
                const categoryBaremes = state.baremes.filter((b: Bareme) => b.category === category);
                return (
                  <div key={category} className="col s12 m6">
                    <div className="card" style={{ marginBottom: "20px" }}>
                      <div className="card-content">
                        <span className="card-title" style={{ fontSize: "16px" }}>
                          {category}
                        </span>
                        {categoryBaremes.length > 0 ? (
                          <ul className="collection">
                            {categoryBaremes.map((bareme: Bareme) => (
                              <li key={bareme.id} className="collection-item">
                                {bareme.event} ({bareme.rows.length} plages)
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p style={{ color: "#999", fontSize: "12px" }}>Aucun barème défini</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
