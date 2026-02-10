import type { Participant, Category, ClassementIndividuel, ClassementClub, Bareme, Result } from "../types/competition";

// Catégories basées sur l'année de naissance (approximation)
// À adapter selon les règles de votre fédération
export function getCategoryByBirthDate(birthDate: string, gender: "M" | "F"): Category {
  const birth = new Date(birthDate);
  const currentYear = new Date().getFullYear();
  const age = currentYear - birth.getFullYear();

  if (age <= 10) {
    return gender === "F" ? "EAF" : "EAM"; // Éveil
  } else if (age <= 12) {
    return gender === "F" ? "POF" : "POM"; // Poussins/Poussines
  }
  return gender === "F" ? "POF" : "POM"; // Par défaut
}

export function calculatePointsForPerformance(performance: number, bareme: Bareme): number {
  for (const row of bareme.rows) {
    if (performance >= row.minPerformance && performance <= row.maxPerformance) {
      return row.points;
    }
  }
  return 0; // Aucun point si ne correspond à aucune plage
}

export function calculateClassementIndividuel(
  participants: Participant[],
  clubs: Map<string, string>, // clubId -> clubName
  results: Result[],
  events: string[],
): ClassementIndividuel[] {
  const classement = participants.map((participant) => {
    const participantResults = results.filter((r) => r.participantId === participant.id);

    // Garder uniquement le meilleur score par épreuve (maximum de points)
    const bestResultsByEvent = new Map<string, Result>();
    participantResults.forEach((result) => {
      const existing = bestResultsByEvent.get(result.event);
      if (!existing || result.points > existing.points) {
        bestResultsByEvent.set(result.event, result);
      }
    });

    const bestResults = Array.from(bestResultsByEvent.values());
    const totalPoints = bestResults.reduce((sum, r) => sum + r.points, 0);

    const resultsDetail = bestResults.map((r) => ({
      event: r.event,
      performance: r.performance,
      points: r.points,
    }));

    return {
      participantId: participant.id,
      firstName: participant.firstName,
      lastName: participant.lastName,
      clubName: clubs.get(participant.clubId) || "N/A",
      category: participant.category,
      gender: participant.gender,
      totalPoints,
      results: resultsDetail,
      rank: 0, // À remplir après le tri
    };
  });

  // Trier par points décroissants
  classement.sort((a, b) => b.totalPoints - a.totalPoints);

  // Assigner les rangs
  classement.forEach((item, index) => {
    item.rank = index + 1;
  });

  return classement;
}

export function calculateClassementClub(classementIndividuel: ClassementIndividuel[], clubs: Map<string, string>): ClassementClub[] {
  const clubMap = new Map<string, { name: string; points: number; members: Set<string> }>();

  classementIndividuel.forEach((item) => {
    const existingClub = clubMap.get(item.participantId.split("-")[0] || "");
    // Chercher le clubId depuis la liste de participants
    if (!existingClub) {
      clubMap.set(item.clubName, {
        name: item.clubName,
        points: item.totalPoints,
        members: new Set([item.participantId]),
      });
    } else {
      existingClub.points += item.totalPoints;
      existingClub.members.add(item.participantId);
    }
  });

  // Recalculer avec la bonne approche
  const clubPointsMap = new Map<string, { name: string; points: number; members: Set<string> }>();

  classementIndividuel.forEach((item) => {
    const clubName = item.clubName;
    if (!clubPointsMap.has(clubName)) {
      clubPointsMap.set(clubName, {
        name: clubName,
        points: 0,
        members: new Set(),
      });
    }
    const club = clubPointsMap.get(clubName)!;
    club.points += item.totalPoints;
    club.members.add(item.participantId);
  });

  const classement = Array.from(clubPointsMap.values()).map((club, index) => ({
    clubId: index.toString(),
    clubName: club.name,
    totalPoints: club.points,
    memberCount: club.members.size,
    rank: 0,
  }));

  // Trier par points décroissants
  classement.sort((a, b) => b.totalPoints - a.totalPoints);

  // Assigner les rangs
  classement.forEach((item, index) => {
    item.rank = index + 1;
  });

  return classement;
}
