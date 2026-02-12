import React, { useMemo, useState } from "react";
import { useCompetition } from "../context/CompetitionContext";
import { calculateClassementIndividuel, calculateClassementClub } from "../utils/competition";
import type { Category, Club, ClassementIndividuel, ClassementClub } from "../types/competition";

const CATEGORIES: Category[] = ["EAF", "EAM", "POF", "POM"];

type SortField = "rank" | "name" | "club" | "vitesse" | "haies" | "pentabond" | "lancé" | "total";
type SortDirection = "asc" | "desc";

export function RankingsDisplay() {
  const { state } = useCompetition();
  const [sortFieldIndividuel, setSortFieldIndividuel] = useState<SortField>("rank");
  const [sortDirIndividuel, setSortDirIndividuel] = useState<SortDirection>("asc");
  const [sortFieldClubs, setSortFieldClubs] = useState<string>("rank");
  const [sortDirClubs, setSortDirClubs] = useState<SortDirection>("asc");

  const clubMap = useMemo(() => {
    const map = new Map<string, string>();
    state.clubs.forEach((club: Club) => {
      map.set(club.id, club.name);
    });
    return map;
  }, [state.clubs]);

  const classementIndividuel = useMemo(() => {
    return calculateClassementIndividuel(state.participants, clubMap, state.results, ["vitesse", "haies", "pentabond", "lancé"]);
  }, [state.participants, state.results, clubMap]);

  const classementClubs = useMemo(() => {
    return calculateClassementClub(classementIndividuel, clubMap);
  }, [classementIndividuel, clubMap]);

  const hasResults = state.results.length > 0;

  const sortIndividualResults = (data: ClassementIndividuel[]): ClassementIndividuel[] => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortFieldIndividuel) {
        case "rank":
          aVal = a.rank;
          bVal = b.rank;
          break;
        case "name":
          aVal = `${a.firstName} ${a.lastName}`;
          bVal = `${b.firstName} ${b.lastName}`;
          break;
        case "club":
          aVal = a.clubName;
          bVal = b.clubName;
          break;
        case "vitesse":
          aVal = a.results.find((r) => r.event === "vitesse")?.points || 0;
          bVal = b.results.find((r) => r.event === "vitesse")?.points || 0;
          break;
        case "haies":
          aVal = a.results.find((r) => r.event === "haies")?.points || 0;
          bVal = b.results.find((r) => r.event === "haies")?.points || 0;
          break;
        case "pentabond":
          aVal = a.results.find((r) => r.event === "pentabond")?.points || 0;
          bVal = b.results.find((r) => r.event === "pentabond")?.points || 0;
          break;
        case "lancé":
          aVal = a.results.find((r) => r.event === "lancé")?.points || 0;
          bVal = b.results.find((r) => r.event === "lancé")?.points || 0;
          break;
        case "total":
          aVal = a.totalPoints;
          bVal = b.totalPoints;
          break;
        default:
          return 0;
      }

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
        return sortDirIndividuel === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return sortDirIndividuel === "asc" ? aVal - bVal : bVal - aVal;
    });
    return sorted;
  };

  const sortClubsResults = (data: ClassementClub[]): ClassementClub[] => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortFieldClubs) {
        case "rank":
          aVal = a.rank;
          bVal = b.rank;
          break;
        case "name":
          aVal = a.clubName;
          bVal = b.clubName;
          break;
        case "members":
          aVal = a.memberCount;
          bVal = b.memberCount;
          break;
        case "total":
          aVal = a.totalPoints;
          bVal = b.totalPoints;
          break;
        default:
          return 0;
      }

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
        return sortDirClubs === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return sortDirClubs === "asc" ? aVal - bVal : bVal - aVal;
    });
    return sorted;
  };

  const handleSort = (field: SortField) => {
    if (sortFieldIndividuel === field) {
      setSortDirIndividuel(sortDirIndividuel === "asc" ? "desc" : "asc");
    } else {
      setSortFieldIndividuel(field);
      setSortDirIndividuel("asc");
    }
  };

  const handleSortClubs = (field: string) => {
    if (sortFieldClubs === field) {
      setSortDirClubs(sortDirClubs === "asc" ? "desc" : "asc");
    } else {
      setSortFieldClubs(field);
      setSortDirClubs("asc");
    }
  };

  const SortIndicator = ({ field, currentField, direction }: { field: SortField | string; currentField: string; direction: SortDirection }) => {
    if (field !== currentField) return null;
    return <span style={{ marginLeft: "5px" }}>{direction === "asc" ? "▲" : "▼"}</span>;
  };

  const renderClassementByCategory = (category: Category) => {
    const classementParCategorie = classementIndividuel.filter((c) => c.category === category);

    if (classementParCategorie.length === 0) {
      return <p style={{ color: "#999", marginTop: "10px" }}>Aucun participant dans cette catégorie</p>;
    }

    const sortedData = sortIndividualResults(classementParCategorie);

    return (
      <div className="table-container" style={{ marginTop: "10px" }}>
        <table className="striped">
          <thead>
            <tr>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("rank")}>
                Rang <SortIndicator field="rank" currentField={sortFieldIndividuel} direction={sortDirIndividuel} />
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("name")}>
                Participant <SortIndicator field="name" currentField={sortFieldIndividuel} direction={sortDirIndividuel} />
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("club")}>
                Club <SortIndicator field="club" currentField={sortFieldIndividuel} direction={sortDirIndividuel} />
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("vitesse")}>
                Vitesse (pts) <SortIndicator field="vitesse" currentField={sortFieldIndividuel} direction={sortDirIndividuel} />
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("haies")}>
                Haies (pts) <SortIndicator field="haies" currentField={sortFieldIndividuel} direction={sortDirIndividuel} />
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("pentabond")}>
                Pentabond (pts) <SortIndicator field="pentabond" currentField={sortFieldIndividuel} direction={sortDirIndividuel} />
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("lancé")}>
                Lancé (pts) <SortIndicator field="lancé" currentField={sortFieldIndividuel} direction={sortDirIndividuel} />
              </th>
              <th style={{ cursor: "pointer" }} onClick={() => handleSort("total")}>
                Total <SortIndicator field="total" currentField={sortFieldIndividuel} direction={sortDirIndividuel} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((participant) => {
              const vitesseResult = participant.results.find((r) => r.event === "vitesse");
              const haiesResult = participant.results.find((r) => r.event === "haies");
              const pentabondResult = participant.results.find((r) => r.event === "pentabond");
              const lancéResult = participant.results.find((r) => r.event === "lancé");

              return (
                <tr key={participant.participantId}>
                  <td>
                    <strong>{participant.rank}</strong>
                  </td>
                  <td>
                    {participant.firstName} {participant.lastName}
                  </td>
                  <td>{participant.clubName}</td>
                  <td>{vitesseResult?.points || "-"}</td>
                  <td>{haiesResult?.points || "-"}</td>
                  <td>{pentabondResult?.points || "-"}</td>
                  <td>{lancéResult?.points || "-"}</td>
                  <td>
                    <strong style={{ color: "#1976d2" }}>{participant.totalPoints}</strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title">Classements</span>

        {!hasResults && (
          <div className="orange-text" style={{ marginBottom: "20px" }}>
            ⚠ Aucun résultat pour le moment
          </div>
        )}

        {/* Classements par catégorie */}
        <div style={{ marginTop: "20px" }}>
          <h4>Classements par catégorie</h4>
          {CATEGORIES.map((category) => (
            <div key={category} style={{ marginBottom: "40px" }}>
              <h5 style={{ paddingBottom: "10px", borderBottom: "2px solid #1976d2" }}>
                {category} ({classementIndividuel.filter((c) => c.category === category).length} participants)
              </h5>
              {renderClassementByCategory(category)}
            </div>
          ))}
        </div>

        {/* Classement des clubs */}
        <div style={{ marginTop: "50px" }}>
          <h4>Classement des clubs</h4>

          {classementClubs.length === 0 ? (
            <p style={{ color: "#999" }}>Aucun club enregistré</p>
          ) : (
            <div className="table-container">
              <table className="striped">
                <thead>
                  <tr>
                    <th style={{ cursor: "pointer" }} onClick={() => handleSortClubs("rank")}>
                      Rang <SortIndicator field="rank" currentField={sortFieldClubs} direction={sortDirClubs} />
                    </th>
                    <th style={{ cursor: "pointer" }} onClick={() => handleSortClubs("name")}>
                      Club <SortIndicator field="name" currentField={sortFieldClubs} direction={sortDirClubs} />
                    </th>
                    <th style={{ cursor: "pointer" }} onClick={() => handleSortClubs("members")}>
                      Participants <SortIndicator field="members" currentField={sortFieldClubs} direction={sortDirClubs} />
                    </th>
                    <th style={{ cursor: "pointer" }} onClick={() => handleSortClubs("total")}>
                      Points totaux <SortIndicator field="total" currentField={sortFieldClubs} direction={sortDirClubs} />
                    </th>
                    <th style={{ cursor: "pointer" }} onClick={() => handleSortClubs("average")}>
                      Moyenne <SortIndicator field="average" currentField={sortFieldClubs} direction={sortDirClubs} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortClubsResults(classementClubs).map((club) => (
                    <tr key={club.clubId}>
                      <td>
                        <strong>{club.rank}</strong>
                      </td>
                      <td>{club.clubName}</td>
                      <td>{club.memberCount}</td>
                      <td>{club.totalPoints}</td>
                      <td>
                        <strong style={{ color: "#1976d2" }}>{club.averagePoints}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
