import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types pour vos données
export interface Club {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  licenseNumber: string;
  clubId: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface Bareme {
  id: string;
  name: string;
  data?: any;
  created_at?: string;
  updated_at?: string;
}

export interface Result {
  id: string;
  participantId: string;
  eventId: string;
  event: string;
  performance: number;
  points: number;
  created_at?: string;
  updated_at?: string;
}

// API calls
export const clubsAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from("clubs").select("*");
    if (error) throw error;
    return data;
  },
  create: async (club: Omit<Club, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase.from("clubs").insert([club]).select();
    if (error) throw error;
    return data[0];
  },
  delete: async (id: string) => {
    const { error } = await supabase.from("clubs").delete().eq("id", id);
    if (error) throw error;
  },
};

export const participantsAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from("participants").select("*");
    if (error) throw error;
    // Convertir les colonnes minuscules en camelCase
    return (
      data?.map((p: any) => ({
        id: p.id,
        firstName: p.firstname,
        lastName: p.lastname,
        gender: p.gender,
        birthDate: p.birthdate,
        licenseNumber: p.licensenumber,
        clubId: p.clubid,
        category: p.category,
        created_at: p.created_at,
        updated_at: p.updated_at,
      })) || []
    );
  },
  create: async (participant: Omit<Participant, "id" | "created_at" | "updated_at">) => {
    // Convertir en minuscules pour Supabase
    const data_to_insert = {
      firstname: participant.firstName,
      lastname: participant.lastName,
      gender: participant.gender,
      birthdate: participant.birthDate,
      licensenumber: participant.licenseNumber,
      clubid: participant.clubId,
      category: participant.category,
    };
    const { data, error } = await supabase.from("participants").insert([data_to_insert]).select();
    if (error) throw error;
    const created = data[0];
    return {
      id: created.id,
      firstName: created.firstname,
      lastName: created.lastname,
      gender: created.gender,
      birthDate: created.birthdate,
      licenseNumber: created.licensenumber,
      clubId: created.clubid,
      category: created.category,
      created_at: created.created_at,
      updated_at: created.updated_at,
    };
  },
  update: async (id: string, participant: Partial<Participant>) => {
    // Convertir en minuscules pour Supabase
    const data_to_update: any = {};
    if (participant.firstName) data_to_update.firstname = participant.firstName;
    if (participant.lastName) data_to_update.lastname = participant.lastName;
    if (participant.gender) data_to_update.gender = participant.gender;
    if (participant.birthDate) data_to_update.birthdate = participant.birthDate;
    if (participant.licenseNumber) data_to_update.licensenumber = participant.licenseNumber;
    if (participant.clubId) data_to_update.clubid = participant.clubId;
    if (participant.category) data_to_update.category = participant.category;

    const { data, error } = await supabase.from("participants").update(data_to_update).eq("id", id).select();
    if (error) throw error;
    const updated = data[0];
    return {
      id: updated.id,
      firstName: updated.firstname,
      lastName: updated.lastname,
      gender: updated.gender,
      birthDate: updated.birthdate,
      licenseNumber: updated.licensenumber,
      clubId: updated.clubid,
      category: updated.category,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
  },
  delete: async (id: string) => {
    const { error } = await supabase.from("participants").delete().eq("id", id);
    if (error) throw error;
  },
};

// Parse un nombre avec virgule ou point comme séparateur décimal
const parseNumber = (value: string | number | undefined): number => {
  if (value === undefined || value === null || value === "") return NaN;
  if (typeof value === "number") return value;

  let str = value.toString().trim();

  // Si le nombre contient à la fois un point et une virgule,
  // la virgule est probablement le séparateur décimal (format européen)
  if (str.includes(",") && str.includes(".")) {
    str = str.replace(/\./g, "").replace(",", ".");
  } else if (str.includes(",")) {
    str = str.replace(",", ".");
  }

  return parseFloat(str);
};

export const baremesAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from("baremes").select("*");
    if (error) throw error;
    // Normaliser les valeurs numériques des rows (performance et points)
    return (
      data?.map((bareme: any) => ({
        ...bareme,
        rows:
          bareme.rows?.map((row: any) => ({
            performance: parseNumber(row.performance),
            points: parseNumber(row.points),
          })) || [],
      })) || []
    );
  },
  save: async (bareme: Omit<Bareme, "created_at" | "updated_at">) => {
    // Vérifier si c'est un UUID valide (format: 550e8400-e29b-41d4-a716-446655440000)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isValidUuid = bareme.id && uuidRegex.test(bareme.id);

    if (isValidUuid) {
      // C'est une mise à jour d'un enregistrement existant
      const { data, error } = await supabase.from("baremes").update(bareme).eq("id", bareme.id).select();
      if (error) throw error;
      return data[0];
    } else {
      // C'est une nouvelle création, ne pas envoyer l'id (laisser Supabase le générer)
      const { id, ...bareimeData } = bareme;
      const { data, error } = await supabase.from("baremes").insert([bareimeData]).select();
      if (error) throw error;
      return data[0];
    }
  },
};

export const resultsAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from("results").select("*");
    if (error) throw error;
    // Convertir les colonnes minuscules en camelCase
    return (
      data?.map((r: any) => ({
        id: r.id,
        participantId: r.participantid,
        eventId: r.eventid,
        event: r.event,
        performance: r.performance,
        points: r.points,
        created_at: r.created_at,
        updated_at: r.updated_at,
      })) || []
    );
  },
  create: async (result: Omit<Result, "id" | "created_at" | "updated_at">) => {
    // Convertir en minuscules pour Supabase
    const data_to_insert = {
      participantid: result.participantId,
      eventid: result.eventId,
      event: result.event,
      performance: result.performance,
      points: result.points,
    };
    const { data, error } = await supabase.from("results").insert([data_to_insert]).select();
    if (error) throw error;
    const created = data[0];
    return {
      id: created.id,
      participantId: created.participantid,
      eventId: created.eventid,
      event: created.event,
      performance: created.performance,
      points: created.points,
      created_at: created.created_at,
      updated_at: created.updated_at,
    };
  },
  update: async (id: string, result: Partial<Result>) => {
    // Convertir en minuscules pour Supabase
    const data_to_update: any = {};
    if (result.participantId) data_to_update.participantid = result.participantId;
    if (result.eventId) data_to_update.eventid = result.eventId;
    if (result.event) data_to_update.event = result.event;
    if (result.performance !== undefined) data_to_update.performance = result.performance;
    if (result.points !== undefined) data_to_update.points = result.points;

    const { data, error } = await supabase.from("results").update(data_to_update).eq("id", id).select();
    if (error) throw error;
    const updated = data[0];
    return {
      id: updated.id,
      participantId: updated.participantid,
      eventId: updated.eventid,
      event: updated.event,
      performance: updated.performance,
      points: updated.points,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
  },
  delete: async (id: string) => {
    const { error } = await supabase.from("results").delete().eq("id", id);
    if (error) throw error;
  },
};
