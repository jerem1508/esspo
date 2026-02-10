import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { CompetitionState, Club, Participant, Bareme, Result } from "../types/competition";
import { clubsAPI, participantsAPI, baremesAPI, resultsAPI } from "../services/supabase";

interface CompetitionContextType {
  state: CompetitionState;
  loading: boolean;
  error: string | null;
  addClub: (club: Omit<Club, "id">) => Promise<void>;
  deleteClub: (clubId: string) => Promise<void>;
  addParticipant: (participant: Omit<Participant, "id" | "created_at" | "updated_at">) => Promise<void>;
  updateParticipant: (participant: Participant) => Promise<void>;
  deleteParticipant: (participantId: string) => Promise<void>;
  saveBareme: (bareme: Omit<Bareme, "id" | "created_at" | "updated_at"> & { id?: string }) => Promise<void>;
  addResult: (result: Omit<Result, "id" | "created_at" | "updated_at">) => Promise<void>;
  updateResult: (result: Result) => Promise<void>;
  deleteResult: (resultId: string) => Promise<void>;
  resetAll: () => void;
  loadData: () => Promise<void>;
}

const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

const initialState: CompetitionState = {
  clubs: [],
  participants: [],
  baremes: [],
  results: [],
};

export function CompetitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CompetitionState>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [clubs, participants, baremes, results] = await Promise.all([
        clubsAPI.getAll(),
        participantsAPI.getAll(),
        baremesAPI.getAll(),
        resultsAPI.getAll(),
      ]);
      setState({
        clubs,
        participants,
        baremes,
        results,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors du chargement";
      setError(message);
      console.error("Erreur chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, []);

  const addClub = async (club: Omit<Club, "id">) => {
    try {
      setError(null);
      await clubsAPI.create(club);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'ajout";
      setError(message);
      throw err;
    }
  };

  const deleteClub = async (clubId: string) => {
    try {
      setError(null);
      await clubsAPI.delete(clubId);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la suppression";
      setError(message);
      throw err;
    }
  };

  const addParticipant = async (participant: Omit<Participant, "id" | "created_at" | "updated_at">) => {
    try {
      setError(null);
      await participantsAPI.create(participant);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'ajout";
      setError(message);
      throw err;
    }
  };

  const updateParticipant = async (participant: Participant) => {
    try {
      setError(null);
      await participantsAPI.update(participant.id, participant);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la mise à jour";
      setError(message);
      throw err;
    }
  };

  const deleteParticipant = async (participantId: string) => {
    try {
      setError(null);
      await participantsAPI.delete(participantId);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la suppression";
      setError(message);
      throw err;
    }
  };

  const saveBareme = async (bareme: Omit<Bareme, "id" | "created_at" | "updated_at"> & { id?: string }) => {
    try {
      setError(null);
      await baremesAPI.save(bareme as any);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la sauvegarde";
      setError(message);
      throw err;
    }
  };

  const addResult = async (result: Omit<Result, "id" | "created_at" | "updated_at">) => {
    try {
      setError(null);
      await resultsAPI.create(result);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'ajout";
      setError(message);
      throw err;
    }
  };

  const updateResult = async (result: Result) => {
    try {
      setError(null);
      await resultsAPI.update(result.id, result);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la mise à jour";
      setError(message);
      throw err;
    }
  };

  const deleteResult = async (resultId: string) => {
    try {
      setError(null);
      await resultsAPI.delete(resultId);
      await loadData();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la suppression";
      setError(message);
      throw err;
    }
  };

  const resetAll = () => {
    setState(initialState);
  };

  const value: CompetitionContextType = {
    state,
    loading,
    error,
    addClub,
    deleteClub,
    addParticipant,
    updateParticipant,
    deleteParticipant,
    saveBareme,
    addResult,
    updateResult,
    deleteResult,
    resetAll,
    loadData,
  };

  return <CompetitionContext.Provider value={value}>{children}</CompetitionContext.Provider>;
}

export function useCompetition() {
  const context = useContext(CompetitionContext);
  if (!context) {
    throw new Error("useCompetition must be used within CompetitionProvider");
  }
  return context;
}
