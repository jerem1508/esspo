import React, { useState } from "react";
import { CompetitionProvider, useCompetition } from "../context/CompetitionContext";
import { ClubsManagement } from "../components/ClubsManagement";
import { ParticipantsManagement } from "../components/ParticipantsManagement";
import { BaremesManagement } from "../components/BaremesManagement";
import { ResultsManagement } from "../components/ResultsManagement";
import { RankingsDisplay } from "../components/RankingsDisplay";

type TabName = "clubs" | "participants" | "baremes" | "results" | "rankings";

function CompetitionContent() {
  const { state, resetAll } = useCompetition();
  const [activeTab, setActiveTab] = useState<TabName>("clubs");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleExport = () => {
    const data = JSON.stringify(state, null, 2);
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
    element.setAttribute("download", "competition-data.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          // TODO: Implémenter l'import
          console.log("Import:", data);
        } catch (error) {
          alert("Erreur lors de l'import du fichier");
        }
      };
      reader.readAsText(file);
    }
  };

  const tabButtons: Array<{ id: TabName; label: string }> = [
    { id: "clubs", label: "🏢 Clubs" },
    { id: "participants", label: "👥 Participants" },
    { id: "baremes", label: "📊 Barèmes" },
    { id: "results", label: "📋 Résultats" },
    { id: "rankings", label: "🏆 Classements" },
  ];

  return (
    <div>
      <div className="container">
        <h1 style={{ marginBottom: "30px", fontSize: "2rem", marginTop: "5px" }}>Poussinade ESSPO</h1>

        {/* Tabs Navigation */}
        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col s12">
            {/* Burger Menu Button (Mobile) */}
            <button className="btn-mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Tabs List */}
            <ul className={`tabs ${mobileMenuOpen ? "mobile-open" : ""}`}>
              {tabButtons.map((tab) => (
                <li
                  key={tab.id}
                  className="tab"
                  style={{
                    cursor: "pointer",
                    backgroundColor: activeTab === tab.id ? "#000000ff" : "#f0f0f0",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <a href="#" onClick={(e) => e.preventDefault()} style={{ color: activeTab === tab.id ? "rgba(255, 255, 255, 1)" : "black" }}>
                    {tab.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Data Management Buttons */}
        {/* <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col s12">
            <button className="btn waves-effect waves-light green" onClick={handleExport}>
              📥 Exporter les données
            </button>
            <button
              className="btn waves-effect waves-light orange"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                const input = document.getElementById("import-input") as HTMLInputElement;
                input?.click();
              }}
            >
              📤 Importer les données
            </button>
            <input id="import-input" type="file" accept=".json" onChange={handleImport} style={{ display: "none" }} />
            <button
              className="btn waves-effect waves-light red"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données ?")) {
                  resetAll();
                }
              }}
            >
              🗑️ Réinitialiser
            </button>
          </div>
        </div> */}

        {/* Tab Content */}
        <div className="row">
          <div className="col s12">
            {activeTab === "clubs" && <ClubsManagement />}
            {activeTab === "participants" && <ParticipantsManagement clubs={state.clubs} />}
            {activeTab === "baremes" && <BaremesManagement />}
            {activeTab === "results" && <ResultsManagement />}
            {activeTab === "rankings" && <RankingsDisplay />}
          </div>
        </div>

        {/* Data Stats */}
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Résumé des données</span>
                <ul>
                  <li>Clubs: {state.clubs.length}</li>
                  <li>Participants: {state.participants.length}</li>
                  <li>Barèmes: {state.baremes.length}</li>
                  <li>Résultats: {state.results.length}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompetitionPage() {
  return (
    <CompetitionProvider>
      <CompetitionContent />
    </CompetitionProvider>
  );
}
