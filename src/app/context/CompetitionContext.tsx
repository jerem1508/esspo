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

  // Charger les données au montage
  useEffect(() => {
    loadData();
  }, []);

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

  const addClub = async (club: Omit<Club, "id">) => {
    try {
      setError(null);
      const newClub = await clubsAPI.create(club);
      setState((prev) => ({
        ...prev,
        clubs: [...prev.clubs, newClub],
      }));
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
      setState((prev) => ({
        ...prev,
        clubs: prev.clubs.filter((c) => c.id !== clubId),
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la suppression";
      setError(message);
      throw err;
    }
  };

  const addParticipant = async (participant: Omit<Participant, "id" | "created_at" | "updated_at">) => {
    try {
      setError(null);
      const newParticipant = await participantsAPI.create(participant);
      setState((prev) => ({
        ...prev,
        participants: [...prev.participants, newParticipant],
      }));
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
      setState((prev) => ({
        ...prev,
        participants: prev.participants.map((p) => (p.id === participant.id ? participant : p)),
      }));
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
      setState((prev) => ({
        ...prev,
        participants: prev.participants.filter((p) => p.id !== participantId),
        results: prev.results.filter((r) => r.participantId !== participantId),
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la suppression";
      setError(message);
      throw err;
    }
  };

  const saveBareme = async (bareme: Omit<Bareme, "id" | "created_at" | "updated_at"> & { id?: string }) => {
    try {
      setError(null);
      const savedBareme = await baremesAPI.save(bareme as any);
      setState((prev) => {
        const existing = prev.baremes.findIndex((b) => b.id === savedBareme.id);
        if (existing >= 0) {
          const updated = [...prev.baremes];
          updated[existing] = savedBareme;
          return { ...prev, baremes: updated };
        }
        return { ...prev, baremes: [...prev.baremes, savedBareme] };
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la sauvegarde";
      setError(message);
      throw err;
    }
  };

  const addResult = async (result: Omit<Result, "id" | "created_at" | "updated_at">) => {
    try {
      setError(null);
      const newResult = await resultsAPI.create(result);
      setState((prev) => ({
        ...prev,
        results: [...prev.results, newResult],
      }));
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
      setState((prev) => ({
        ...prev,
        results: prev.results.map((r) => (r.id === result.id ? result : r)),
      }));
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
      setState((prev) => ({
        ...prev,
        results: prev.results.filter((r) => r.id !== resultId),
      }));
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
