import React, { useState } from "react";
import type { Event } from "../types/competition";
import { EventSelector } from "./EventSelector";
import { EventResultsInput } from "./EventResultsInput";

export function ResultsManagement() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="results-management-container">
      {selectedEvent === null ? (
        <EventSelector onSelectEvent={setSelectedEvent} />
      ) : (
        <EventResultsInput event={selectedEvent} onBack={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
