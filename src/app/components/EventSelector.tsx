import React from "react";
import { useCompetition } from "../context/CompetitionContext";
import type { Event } from "../types/competition";

const EVENTS: Event[] = ["vitesse", "haies", "pentabond", "lancé"];

const EVENT_LABELS: Record<Event, { fr: string; emoji: string }> = {
  vitesse: { fr: "Vitesse", emoji: "⚡" },
  haies: { fr: "Haies", emoji: "🏃" },
  pentabond: { fr: "Pentabond", emoji: "🦘" },
  lancé: { fr: "Lancé", emoji: "🎯" },
};

interface EventSelectorProps {
  onSelectEvent: (event: Event) => void;
}

export function EventSelector({ onSelectEvent }: EventSelectorProps) {
  const { state } = useCompetition();

  const getEventStatus = (event: Event) => {
    const bareme = state.baremes.find((b) => b.event === event);
    const resultsCount = state.results.filter((r) => r.event === event).length;

    return {
      hasBareme: !!bareme,
      resultsCount,
      bareme,
    };
  };

  return (
    <div className="event-selector-container">
      <h2 style={{ marginTop: 0 }}>Sélectionner une épreuve</h2>
      <div className="event-cards-grid">
        {EVENTS.map((event) => {
          const status = getEventStatus(event);
          const { fr, emoji } = EVENT_LABELS[event];

          return (
            <div
              key={event}
              className={`event-card ${!status.hasBareme ? "disabled" : ""}`}
              onClick={() => status.hasBareme && onSelectEvent(event)}
              role="button"
              tabIndex={status.hasBareme ? 0 : -1}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && status.hasBareme) {
                  onSelectEvent(event);
                }
              }}
            >
              <div className="event-card-header">
                <span className="event-emoji">{emoji}</span>
                <h3 className="event-title">{fr}</h3>
              </div>

              <div className="event-card-stats">
                {status.bareme && (
                  <div className="event-stat">
                    <span className="stat-label">Unité:</span>
                    <span className="stat-value">{status.bareme.unit}</span>
                  </div>
                )}
                <div className="event-stat">
                  <span className="stat-label">Résultats:</span>
                  <span className="stat-value">{status.resultsCount}</span>
                </div>
              </div>

              {!status.hasBareme && <div className="event-card-warning">⚠️ Aucun barème défini</div>}

              {status.hasBareme && <div className="event-card-cta">Saisir les résultats →</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
