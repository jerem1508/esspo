// Types pour la gestion de la compétition d'athlétisme

export type Category = "EAF" | "EAM" | "POF" | "POM"; // Éveil Filles, Éveil Mecs, Poussines, Poussins
export type Event = "vitesse" | "haies" | "pentabond" | "lancé";
export type Gender = "F" | "M";

export interface Club {
  id: string;
  name: string;
}

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string; // YYYY-MM-DD
  licenseNumber: string;
  clubId: string;
  category: Category; // Déterminé par date de naissance
}

export interface BaremeRow {
  performance: number; // La performance seuil
  points: number; // Points attribués si la performance est atteinte ou dépassée
}

export interface Bareme {
  id: string;
  category: Category;
  event: Event;
  rows: BaremeRow[];
  unit: string; // "m", "s", "cm", etc.
}

export interface Result {
  id: string;
  participantId: string;
  eventId: string;
  event: Event;
  performance: number; // La performance brute (temps, distance, etc.)
  points: number; // Points gagnés selon le barème
}

export interface CompetitionState {
  clubs: Club[];
  participants: Participant[];
  baremes: Bareme[];
  results: Result[];
}

export interface ClassementIndividuel {
  participantId: string;
  firstName: string;
  lastName: string;
  clubName: string;
  category: Category;
  gender: Gender;
  totalPoints: number;
  results: {
    event: Event;
    performance: number;
    points: number;
  }[];
  rank: number;
}

export interface ClassementClub {
  clubId: string;
  clubName: string;
  totalPoints: number;
  averagePoints: number; // Points pondérés par le nombre de participants
  memberCount: number;
  rank: number;
}
