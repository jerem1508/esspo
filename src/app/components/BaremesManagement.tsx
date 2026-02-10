import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
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

// Mapping des noms de colonnes (supporte les majuscules/minuscules et accents)
const COLUMN_MAPPINGS: Record<string, string> = {
  CATEGORIE: "category",
  categorie: "category",
  category: "category",
  EPREUVE: "event",
  epreuve: "event",
  event: "event",
  PERFORMANCE: "performance",
  performance: "performance",
  POINTS: "points",
  points: "points",
  UNITE: "unit",
  unite: "unit",
  unit: "unit",
};

interface CsvRow {
  [key: string]: string;
}

interface BaremeImport {
  category: Category;
  event: Event;
  unit: string;
  rows: BaremeRow[];
}

// Parse un nombre avec virgule ou point comme séparateur décimal
const parseNumber = (value: string | number | undefined): number => {
  if (value === undefined || value === null || value === "") return NaN;
  if (typeof value === "number") return value;

  let str = value.toString().trim();

  // Si le nombre contient à la fois un point et une virgule,
  // la virgule est probablement le séparateur décimal (format européen)
  if (str.includes(",") && str.includes(".")) {
    // Format 1.234,56 -> 1234.56
    str = str.replace(/\./g, "").replace(",", ".");
  } else if (str.includes(",")) {
    // Format 5,5 -> 5.5
    str = str.replace(",", ".");
  }

  return parseFloat(str);
};

export function BaremesManagement() {
  const { state, saveBareme, error } = useCompetition();
  const [selectedCategory, setSelectedCategory] = useState<Category>("EAF");
  const [selectedEvent, setSelectedEvent] = useState<Event>("vitesse");
  const [rows, setRows] = useState<BaremeRow[]>([{ performance: 10, points: 100 }]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<{ success: number; errors: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentBareme = state.baremes.find((b: Bareme) => b.category === selectedCategory && b.event === selectedEvent);

  // Normalise les clés d'un objet CSV selon le mapping
  const normalizeRow = (row: CsvRow): Record<string, string> => {
    const normalized: Record<string, string> = {};
    for (const [key, value] of Object.entries(row)) {
      const normalizedKey = COLUMN_MAPPINGS[key] || key.toLowerCase();
      normalized[normalizedKey] = value?.toString() || "";
    }
    return normalized;
  };

  // Parse CSV/Excel rows into baremes grouped by category+event
  const parseRowsToBaremes = (rawRows: CsvRow[]): BaremeImport[] => {
    const baremesMap = new Map<string, BaremeImport>();

    for (const rawRow of rawRows) {
      const row = normalizeRow(rawRow);
      const category = row.category?.trim() as Category;
      const event = row.event?.trim() as Event;
      const performance = parseNumber(row.performance);
      const points = parseNumber(row.points);

      // Skip rows with missing category or event
      if (!category || !event) continue;

      const key = `${category}-${event}`;

      if (!baremesMap.has(key)) {
        baremesMap.set(key, {
          category,
          event,
          unit: row.unit?.trim() || UNITS[event] || "",
          rows: [],
        });
      }

      // Only add row if it has valid numeric values
      if (!isNaN(performance) && !isNaN(points)) {
        baremesMap.get(key)!.rows.push({
          performance,
          points,
        });
      }
    }

    return Array.from(baremesMap.values());
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setLocalError(null);
    setImportStatus(null);

    try {
      const fileName = file.name.toLowerCase();
      let parsedBaremes: BaremeImport[] = [];

      if (fileName.endsWith(".csv")) {
        // Parse CSV - détecter le séparateur et parser correctement
        const content = await file.text();

        // Détecter le séparateur (virgule ou point-virgule)
        const firstLine = content.split("\n")[0];
        const semicolonCount = (firstLine.match(/;/g) || []).length;
        const commaCount = (firstLine.match(/,/g) || []).length;
        const separator = semicolonCount > commaCount ? ";" : ",";

        const workbook = XLSX.read(content, {
          type: "string",
          FS: separator, // Field Separator
          raw: true, // Ne pas convertir les valeurs
        });
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json<CsvRow>(workbook.Sheets[sheetName], { raw: false });
        parsedBaremes = parseRowsToBaremes(rows);
      } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        // Parse Excel
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const rows = XLSX.utils.sheet_to_json<CsvRow>(workbook.Sheets[sheetName]);
        parsedBaremes = parseRowsToBaremes(rows);
      } else {
        throw new Error("Format non supporté. Utilisez un fichier .csv, .xlsx ou .xls");
      }

      if (parsedBaremes.length === 0) {
        throw new Error("Aucun barème valide trouvé dans le fichier");
      }

      let successCount = 0;
      const errors: string[] = [];

      for (const bareme of parsedBaremes) {
        // Validation
        if (!CATEGORIES.includes(bareme.category)) {
          errors.push(`Catégorie invalide : ${bareme.category}`);
          continue;
        }
        if (!EVENTS.includes(bareme.event)) {
          errors.push(`Épreuve invalide : ${bareme.event}`);
          continue;
        }
        if (!bareme.rows || bareme.rows.length === 0) {
          // Ignorer les barèmes vides silencieusement
          continue;
        }

        try {
          // Chercher si un barème existe déjà pour cette catégorie/épreuve
          const existingBareme = state.baremes.find((b: Bareme) => b.category === bareme.category && b.event === bareme.event);

          const baremeToSave: Bareme = {
            id: existingBareme?.id || "",
            category: bareme.category,
            event: bareme.event,
            rows: bareme.rows.sort((a, b) => b.points - a.points),
            unit: bareme.unit || UNITS[bareme.event],
          };

          await saveBareme(baremeToSave);
          successCount++;
        } catch (err) {
          const message = err instanceof Error ? err.message : "Erreur inconnue";
          errors.push(`${bareme.category} - ${bareme.event}: ${message}`);
        }
      }

      setImportStatus({ success: successCount, errors });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la lecture du fichier";
      setLocalError(message);
    } finally {
      setIsLoading(false);
      // Reset l'input pour permettre de réimporter le même fichier
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDownloadExample = () => {
    window.open("/baremes-example.csv", "_blank");
  };

  const handleAddRow = () => {
    const newRow: BaremeRow = {
      performance: 0,
      points: 10,
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

        {importStatus && (
          <div
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: importStatus.errors.length > 0 ? "#fff3e0" : "#e8f5e9",
              borderRadius: "4px",
            }}
          >
            <strong>Import terminé :</strong> {importStatus.success} barème(s) importé(s)
            {importStatus.errors.length > 0 && (
              <ul style={{ margin: "10px 0 0 20px", color: "#e65100" }}>
                {importStatus.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Section Import */}
        <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
          <h6 style={{ marginTop: 0 }}>Importer des barèmes (CSV ou Excel)</h6>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleImportFile}
              disabled={isLoading}
              style={{ display: "none" }}
              id="baremes-file-input"
            />
            <label htmlFor="baremes-file-input" className="btn waves-effect waves-light" style={{ cursor: isLoading ? "not-allowed" : "pointer" }}>
              <i className="material-icons left">upload</i>
              {isLoading ? "Import en cours..." : "Importer un fichier"}
            </label>
            <button className="btn-flat waves-effect" onClick={handleDownloadExample} disabled={isLoading}>
              <i className="material-icons left">download</i>
              Télécharger l'exemple CSV
            </button>
          </div>
        </div>

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
            <h5>Définir les seuils de points</h5>
            <div className="table-container">
              <table className="striped">
                <thead>
                  <tr>
                    <th>Performance ({UNITS[selectedEvent]})</th>
                    <th>Points</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          value={row.performance}
                          onChange={(e) => handleRowChange(index, "performance", parseFloat(e.target.value))}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.5"
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
                                {bareme.event} ({bareme.rows.length} seuils)
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
