import React, { useState, useEffect } from "react";
import { useCompetition } from "../context/CompetitionContext";
import { calculatePointsForPerformance } from "../utils/competition";
import type { Event, Result, Bareme, Participant, Club, Category } from "../types/competition";

interface EventResultsInputProps {
  event: Event;
  onBack: () => void;
}

const EVENT_LABELS: Record<Event, string> = {
  vitesse: "Vitesse",
  haies: "Haies",
  pentabond: "Pentabond",
  lancé: "Lancé",
};

const CATEGORY_LABELS: Record<Category, string> = {
  EAF: "Éveil Filles EAF",
  EAM: "Éveil Garçons EAM",
  POF: "Poussines Filles POF",
  POM: "Poussins Garçons POM",
};

type Step = "category" | "participant" | "result";

export function EventResultsInput({ event, onBack }: EventResultsInputProps) {
  const { state, addResult, deleteResult, error } = useCompetition();
  const [step, setStep] = useState<Step>("category");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>("");
  const [performance, setPerformance] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  // Trouver le barème correspondant à l'épreuve ET à la catégorie sélectionnée
  const currentBareme = state.baremes.find((b: Bareme) => b.event === event && b.category === selectedCategory);

  useEffect(() => {
    const eventResults = state.results.filter((r: Result) => r.event === event);
    setResults(eventResults);
  }, [event, state.results]);

  // Obtenir les catégories disponibles
  const availableCategories = Array.from(new Set(state.participants.map((p: Participant) => p.category))) as Category[];

  // Obtenir les participants pour la catégorie sélectionnée
  // IMPORTANT: Plus de filtrage des participants déjà saisis - on permet les doublons
  const availableParticipants = selectedCategory ? state.participants.filter((p: Participant) => p.category === selectedCategory) : [];

  // Obtenir les résultats pour la catégorie sélectionnée
  const filteredResults = selectedCategory
    ? results.filter((r: Result) => {
        const participant = state.participants.find((p) => p.id === r.participantId);
        return participant?.category === selectedCategory;
      })
    : [];

  // Obtenir le meilleur résultat (plus de points) pour chaque participant
  const bestResultByParticipant: Record<string, Result> = {};
  filteredResults.forEach((result) => {
    const existing = bestResultByParticipant[result.participantId];
    if (!existing || result.points > existing.points) {
      bestResultByParticipant[result.participantId] = result;
    }
  });

  const handleGoToStep = (nextStep: Step) => {
    setStep(nextStep);
  };

  const handleResetForm = () => {
    setSelectedParticipantId("");
    setPerformance("");
    setStep("participant");
  };

  const handleSaveResult = async () => {
    if (!selectedCategory || !selectedParticipantId || !performance) {
      setLocalError("Tous les champs sont requis");
      return;
    }

    // Remplacer la virgule par un point pour supporter la notation française
    const normalizedPerformance = performance.replace(",", ".");
    const performanceNum = parseFloat(normalizedPerformance);
    if (isNaN(performanceNum) || performanceNum <= 0) {
      setLocalError("La performance doit être un nombre positif");
      return;
    }

    if (!currentBareme) {
      setLocalError(`Aucun barème défini pour l'épreuve "${EVENT_LABELS[event]}" et la catégorie "${CATEGORY_LABELS[selectedCategory]}"`);
      return;
    }

    try {
      setLocalError(null);
      setIsLoading(true);

      const points = calculatePointsForPerformance(performanceNum, currentBareme);

      const newResult: Result = {
        id: `result-${Date.now()}`,
        participantId: selectedParticipantId,
        eventId: `event-${event}`,
        event,
        performance: performanceNum,
        points,
      };

      await addResult(newResult);
      handleResetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la sauvegarde";
      setLocalError(message);
      console.error("Erreur saveResult:", err);
    } finally {
      setIsLoading(false);
    }
  };;

  const handleDeleteResult = async (resultId: string) => {
    try {
      setLocalError(null);
      setIsLoading(true);
      await deleteResult(resultId);
      setResults(results.filter((r) => r.id !== resultId));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la suppression";
      setLocalError(message);
      console.error("Erreur deleteResult:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedParticipant = state.participants.find((p) => p.id === selectedParticipantId);
  const normalizedPerformanceForPreview = performance.replace(",", ".");
  const calculatedPoints =
    performance && currentBareme ? calculatePointsForPerformance(parseFloat(normalizedPerformanceForPreview), currentBareme) : 0;

  return (
    <div className="event-results-wizard">
      <div className="wizard-header">
        <button className="btn-back" onClick={onBack}>
          ← Retour
        </button>
        <h2>{EVENT_LABELS[event]}</h2>
      </div>

      {(localError || error) && <div className="error-message">⚠️ {localError || error}</div>}

      {selectedCategory && !currentBareme && (
        <div className="warning-message">
          ⚠️ Aucun barème défini pour l'épreuve "{EVENT_LABELS[event]}" et la catégorie "{CATEGORY_LABELS[selectedCategory]}"
        </div>
      )}

      <div className="wizard-container">
        {/* ÉTAPE 1: SÉLECTION CATÉGORIE */}
        {step === "category" && (
          <div className="wizard-step">
            <h3>Étape 1: Sélectionner une catégorie</h3>
            <div className="step-content">
              <div className="category-buttons">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    className={`category-button ${selectedCategory === category ? "active" : ""}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      handleGoToStep("participant");
                    }}
                  >
                    <span className="category-name">{CATEGORY_LABELS[category]}</span>
                    <span className="category-count">
                      {
                        results.filter((r) => {
                          const p = state.participants.find((p) => p.id === r.participantId);
                          return p?.category === category;
                        }).length
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="wizard-actions"></div>
          </div>
        )}

        {/* ÉTAPE 2: SÉLECTION PARTICIPANT */}
        {step === "participant" && selectedCategory && (
          <div className="wizard-step">
            <h3>Étape 2: Sélectionner un participant ({CATEGORY_LABELS[selectedCategory]})</h3>
            <div className="step-content">
              <div className="form-group">
                <label>Participant</label>
                <select
                  value={selectedParticipantId}
                  onChange={(e) => {
                    setSelectedParticipantId(e.target.value);
                    if (e.target.value) {
                      handleGoToStep("result");
                    }
                  }}
                  className="form-control"
                >
                  <option value="">-- Sélectionner un participant --</option>
                  {availableParticipants.map((p) => {
                    const club = p.clubId ? state.clubs.find((c) => c.id === p.clubId) : null;
                    const participantResults = filteredResults.filter((r) => r.participantId === p.id);
                    const hasSaisie = participantResults.length > 0;
                    const bestResult = bestResultByParticipant[p.id];

                    return (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName} {club?.name ? `(${club.name})` : ""}{" "}
                        {hasSaisie ? `[${participantResults.length} saisie(s), best: ${bestResult?.points}pts]` : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="wizard-actions">
              <button className="btn btn-secondary" onClick={() => handleGoToStep("category")} disabled={isLoading}>
                ← Retour à la catégorie
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 3: SAISIE RÉSULTAT */}
        {step === "result" && selectedParticipant && selectedCategory && (
          <div className="wizard-step">
            <h3>Étape 3: Saisir la performance</h3>
            <div className="step-content">
              <div className="participant-card">
                <div className="participant-header">
                  <h4>
                    {selectedParticipant.firstName} {selectedParticipant.lastName}
                  </h4>
                  <span className="category-badge">{CATEGORY_LABELS[selectedCategory]}</span>
                </div>
                {selectedParticipant.clubId && (
                  <div className="participant-club">{state.clubs.find((c) => c.id === selectedParticipant.clubId)?.name}</div>
                )}
              </div>

              <div className="form-group">
                <label>Performance ({currentBareme?.unit || "?"})</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={performance}
                  onChange={(e) => setPerformance(e.target.value)}
                  className="form-control input-large"
                  placeholder="0.00"
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              {performance && (
                <div className="points-preview">
                  <div className="points-value">{calculatedPoints}</div>
                  <div className="points-label">points</div>
                </div>
              )}
            </div>
            <div className="wizard-actions">
              <button className="btn btn-secondary" onClick={() => handleGoToStep("participant")} disabled={isLoading}>
                ← Précédent
              </button>
              <button className="btn btn-success" onClick={handleSaveResult} disabled={!performance || isLoading || !currentBareme}>
                ✓ Valider et continuer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AFFICHAGE DES RÉSULTATS */}
      {selectedCategory && (
        <div className="results-summary">
          <h3>
            Résultats - {CATEGORY_LABELS[selectedCategory]} ({Object.keys(bestResultByParticipant).length})
          </h3>
          {Object.keys(bestResultByParticipant).length > 0 ? (
            <div className="results-list">
              {Object.values(bestResultByParticipant).map((bestResult) => {
                const participant = state.participants.find((p) => p.id === bestResult.participantId);
                const club = participant?.clubId ? state.clubs.find((c) => c.id === participant.clubId) : null;
                const participantResults = filteredResults.filter((r) => r.participantId === bestResult.participantId);
                // Trier par points décroissant (meilleur en premier)
                const sortedResults = [...participantResults].sort((a, b) => b.points - a.points);
                const otherResults = sortedResults.filter((r) => r.id !== bestResult.id);

                return (
                  <div key={`participant-${bestResult.participantId}`} className="result-participant-group">
                    {/* MEILLEUR RÉSULTAT */}
                    <div className="result-item result-item-best">
                      <div className="result-main">
                        <div className="result-name">
                          <span>
                            {participant?.firstName} {participant?.lastName}
                          </span>
                          {club && <span className="result-club">{club.name}</span>}
                          {sortedResults.length > 1 && <span className="result-badge">★ Meilleur</span>}
                        </div>
                        <div className="result-score">
                          <span className="score-perf">
                            {bestResult.performance} {currentBareme?.unit}
                          </span>
                          <span className="score-points">{bestResult.points} pts</span>
                        </div>
                      </div>
                      <button
                        className="btn-delete-small"
                        onClick={() => handleDeleteResult(bestResult.id)}
                        disabled={isLoading}
                        title="Supprimer ce résultat"
                      >
                        ✕
                      </button>
                    </div>

                    {/* AUTRES RÉSULTATS */}
                    {otherResults.map((result) => (
                      <div key={result.id} className="result-item result-item-other">
                        <div className="result-main">
                          <div className="result-score">
                            <span className="score-perf">
                              {result.performance} {currentBareme?.unit}
                            </span>
                            <span className="score-points">{result.points} pts</span>
                          </div>
                        </div>
                        <button
                          className="btn-delete-small"
                          onClick={() => handleDeleteResult(result.id)}
                          disabled={isLoading}
                          title="Supprimer ce résultat"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="empty-message">Aucun résultat pour le moment</p>
          )}
        </div>
      )}
    </div>
  );
}
