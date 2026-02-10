import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "stylesheet",
  href: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/icon?family=Material+Icons"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "container",
    style: {
      marginTop: "2rem",
      padding: "1rem"
    },
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Welcome() {
  return /* @__PURE__ */ jsx("main", { style: { padding: "40px 20px" }, children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h1", { style: { textAlign: "center", marginBottom: "40px" }, children: "Gestion de Compétition d'Athlétisme" }),
    /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col s12 m6 offset-m3", children: /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-content", children: [
      /* @__PURE__ */ jsx("span", { className: "card-title", children: "Bienvenue" }),
      /* @__PURE__ */ jsx("p", { children: "Cette application vous permet de gérer une compétition d'athlétisme avec 4 épreuves (vitesse, haies, pentabond, lancé) pour différentes catégories d'âge." }),
      /* @__PURE__ */ jsx("h5", { style: { marginTop: "30px" }, children: "Fonctionnalités :" }),
      /* @__PURE__ */ jsxs("ul", { style: { marginLeft: "20px" }, children: [
        /* @__PURE__ */ jsx("li", { children: "✓ Gestion des clubs" }),
        /* @__PURE__ */ jsx("li", { children: "✓ Gestion des participants" }),
        /* @__PURE__ */ jsx("li", { children: "✓ Définition des barèmes de points" }),
        /* @__PURE__ */ jsx("li", { children: "✓ Saisie des résultats" }),
        /* @__PURE__ */ jsx("li", { children: "✓ Classements individuels par catégorie" }),
        /* @__PURE__ */ jsx("li", { children: "✓ Classements par club" }),
        /* @__PURE__ */ jsx("li", { children: "✓ Export/Import des données" })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { marginTop: "30px", textAlign: "center" }, children: /* @__PURE__ */ jsx(Link, { to: "/competition", children: /* @__PURE__ */ jsx("button", { className: "btn waves-effect waves-light blue", children: "Accéder à la gestion 🚀" }) }) })
    ] }) }) }) })
  ] }) });
}
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const supabaseUrl = "";
const supabaseKey = "";
const supabase = createClient(supabaseUrl, supabaseKey);
const clubsAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from("clubs").select("*");
    if (error) throw error;
    return data;
  },
  create: async (club) => {
    const { data, error } = await supabase.from("clubs").insert([club]).select();
    if (error) throw error;
    return data[0];
  },
  delete: async (id) => {
    const { error } = await supabase.from("clubs").delete().eq("id", id);
    if (error) throw error;
  }
};
const participantsAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from("participants").select("*");
    if (error) throw error;
    return data?.map((p) => ({
      id: p.id,
      firstName: p.firstname,
      lastName: p.lastname,
      gender: p.gender,
      birthDate: p.birthdate,
      licenseNumber: p.licensenumber,
      clubId: p.clubid,
      category: p.category,
      created_at: p.created_at,
      updated_at: p.updated_at
    })) || [];
  },
  create: async (participant) => {
    const data_to_insert = {
      firstname: participant.firstName,
      lastname: participant.lastName,
      gender: participant.gender,
      birthdate: participant.birthDate,
      licensenumber: participant.licenseNumber,
      clubid: participant.clubId,
      category: participant.category
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
      updated_at: created.updated_at
    };
  },
  update: async (id, participant) => {
    const data_to_update = {};
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
      updated_at: updated.updated_at
    };
  },
  delete: async (id) => {
    const { error } = await supabase.from("participants").delete().eq("id", id);
    if (error) throw error;
  }
};
const baremesAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from("baremes").select("*");
    if (error) throw error;
    return data;
  },
  save: async (bareme) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isValidUuid = bareme.id && uuidRegex.test(bareme.id);
    if (isValidUuid) {
      const { data, error } = await supabase.from("baremes").update(bareme).eq("id", bareme.id).select();
      if (error) throw error;
      return data[0];
    } else {
      const { id, ...bareimeData } = bareme;
      const { data, error } = await supabase.from("baremes").insert([bareimeData]).select();
      if (error) throw error;
      return data[0];
    }
  }
};
const resultsAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from("results").select("*");
    if (error) throw error;
    return data?.map((r) => ({
      id: r.id,
      participantId: r.participantid,
      eventId: r.eventid,
      event: r.event,
      performance: r.performance,
      points: r.points,
      created_at: r.created_at,
      updated_at: r.updated_at
    })) || [];
  },
  create: async (result) => {
    const data_to_insert = {
      participantid: result.participantId,
      eventid: result.eventId,
      event: result.event,
      performance: result.performance,
      points: result.points
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
      updated_at: created.updated_at
    };
  },
  update: async (id, result) => {
    const data_to_update = {};
    if (result.participantId) data_to_update.participantid = result.participantId;
    if (result.eventId) data_to_update.eventid = result.eventId;
    if (result.event) data_to_update.event = result.event;
    if (result.performance !== void 0) data_to_update.performance = result.performance;
    if (result.points !== void 0) data_to_update.points = result.points;
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
      updated_at: updated.updated_at
    };
  },
  delete: async (id) => {
    const { error } = await supabase.from("results").delete().eq("id", id);
    if (error) throw error;
  }
};
const CompetitionContext = createContext(void 0);
const initialState = {
  clubs: [],
  participants: [],
  baremes: [],
  results: []
};
function CompetitionProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        resultsAPI.getAll()
      ]);
      setState({
        clubs,
        participants,
        baremes,
        results
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors du chargement";
      setError(message);
      console.error("Erreur chargement:", err);
    } finally {
      setLoading(false);
    }
  };
  const addClub = async (club) => {
    try {
      setError(null);
      const newClub = await clubsAPI.create(club);
      setState((prev) => ({
        ...prev,
        clubs: [...prev.clubs, newClub]
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'ajout";
      setError(message);
      throw err;
    }
  };
  const deleteClub = async (clubId) => {
    try {
      setError(null);
      await clubsAPI.delete(clubId);
      setState((prev) => ({
        ...prev,
        clubs: prev.clubs.filter((c) => c.id !== clubId)
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la suppression";
      setError(message);
      throw err;
    }
  };
  const addParticipant = async (participant) => {
    try {
      setError(null);
      const newParticipant = await participantsAPI.create(participant);
      setState((prev) => ({
        ...prev,
        participants: [...prev.participants, newParticipant]
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'ajout";
      setError(message);
      throw err;
    }
  };
  const updateParticipant = async (participant) => {
    try {
      setError(null);
      await participantsAPI.update(participant.id, participant);
      setState((prev) => ({
        ...prev,
        participants: prev.participants.map((p) => p.id === participant.id ? participant : p)
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la mise à jour";
      setError(message);
      throw err;
    }
  };
  const deleteParticipant = async (participantId) => {
    try {
      setError(null);
      await participantsAPI.delete(participantId);
      setState((prev) => ({
        ...prev,
        participants: prev.participants.filter((p) => p.id !== participantId),
        results: prev.results.filter((r) => r.participantId !== participantId)
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la suppression";
      setError(message);
      throw err;
    }
  };
  const saveBareme = async (bareme) => {
    try {
      setError(null);
      const savedBareme = await baremesAPI.save(bareme);
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
  const addResult = async (result) => {
    try {
      setError(null);
      const newResult = await resultsAPI.create(result);
      setState((prev) => ({
        ...prev,
        results: [...prev.results, newResult]
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'ajout";
      setError(message);
      throw err;
    }
  };
  const updateResult = async (result) => {
    try {
      setError(null);
      await resultsAPI.update(result.id, result);
      setState((prev) => ({
        ...prev,
        results: prev.results.map((r) => r.id === result.id ? result : r)
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la mise à jour";
      setError(message);
      throw err;
    }
  };
  const deleteResult = async (resultId) => {
    try {
      setError(null);
      await resultsAPI.delete(resultId);
      setState((prev) => ({
        ...prev,
        results: prev.results.filter((r) => r.id !== resultId)
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
  const value = {
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
    loadData
  };
  return /* @__PURE__ */ jsx(CompetitionContext.Provider, { value, children });
}
function useCompetition() {
  const context = useContext(CompetitionContext);
  if (!context) {
    throw new Error("useCompetition must be used within CompetitionProvider");
  }
  return context;
}
function ClubsManagement() {
  const { state, addClub, deleteClub, error } = useCompetition();
  const [clubName, setClubName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (clubName.trim()) {
      try {
        setLocalError(null);
        setIsLoading(true);
        await addClub({
          name: clubName.trim()
        });
        setClubName("");
        setShowForm(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Erreur lors de l'ajout du club";
        setLocalError(message);
        console.error("Erreur addClub:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const displayError = localError || error;
  return /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-content", children: [
    /* @__PURE__ */ jsxs("span", { className: "card-title", children: [
      "Gestion des clubs",
      state.clubs.length > 0 && /* @__PURE__ */ jsx("span", { className: "badge", children: state.clubs.length })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "btn waves-effect waves-light", onClick: () => setShowForm(!showForm), disabled: isLoading, children: showForm ? "Annuler" : "Ajouter un club" }),
    displayError && /* @__PURE__ */ jsxs("div", { style: { color: "red", marginTop: "10px", padding: "10px", backgroundColor: "#ffebee", borderRadius: "4px" }, children: [
      "⚠️ ",
      displayError
    ] }),
    showForm && /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, style: { marginTop: "20px" }, children: /* @__PURE__ */ jsxs("div", { className: "input-field col s12", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "clubName",
          type: "text",
          value: clubName,
          onChange: (e) => setClubName(e.target.value),
          placeholder: "Nom du club",
          required: true,
          disabled: isLoading
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "btn waves-effect waves-light green", disabled: isLoading, children: isLoading ? "Ajout en cours..." : "Ajouter" })
    ] }) }),
    state.clubs.length > 0 && /* @__PURE__ */ jsx("div", { style: { marginTop: "20px" }, children: /* @__PURE__ */ jsx("ul", { className: "collection", children: state.clubs.map((club) => /* @__PURE__ */ jsxs("li", { className: "collection-item", children: [
      club.name,
      /* @__PURE__ */ jsx("a", { href: "#!", className: "secondary-content", onClick: () => deleteClub(club.id), children: /* @__PURE__ */ jsx("i", { className: "material-icons", children: "delete" }) })
    ] }, club.id)) }) })
  ] }) });
}
function getCategoryByBirthDate(birthDate, gender) {
  const birth = new Date(birthDate);
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const age = currentYear - birth.getFullYear();
  if (age <= 10) {
    return gender === "F" ? "EAF" : "EAM";
  } else if (age <= 12) {
    return gender === "F" ? "POF" : "POM";
  }
  return gender === "F" ? "POF" : "POM";
}
function calculatePointsForPerformance(performance, bareme) {
  for (const row of bareme.rows) {
    if (performance >= row.minPerformance && performance <= row.maxPerformance) {
      return row.points;
    }
  }
  return 0;
}
function calculateClassementIndividuel(participants, clubs, results, events) {
  const classement = participants.map((participant) => {
    const participantResults = results.filter((r) => r.participantId === participant.id);
    const bestResultsByEvent = /* @__PURE__ */ new Map();
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
      points: r.points
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
      rank: 0
      // À remplir après le tri
    };
  });
  classement.sort((a, b) => b.totalPoints - a.totalPoints);
  classement.forEach((item, index) => {
    item.rank = index + 1;
  });
  return classement;
}
function calculateClassementClub(classementIndividuel, clubs) {
  const clubMap = /* @__PURE__ */ new Map();
  classementIndividuel.forEach((item) => {
    const existingClub = clubMap.get(item.participantId.split("-")[0] || "");
    if (!existingClub) {
      clubMap.set(item.clubName, {
        name: item.clubName,
        points: item.totalPoints,
        members: /* @__PURE__ */ new Set([item.participantId])
      });
    } else {
      existingClub.points += item.totalPoints;
      existingClub.members.add(item.participantId);
    }
  });
  const clubPointsMap = /* @__PURE__ */ new Map();
  classementIndividuel.forEach((item) => {
    const clubName = item.clubName;
    if (!clubPointsMap.has(clubName)) {
      clubPointsMap.set(clubName, {
        name: clubName,
        points: 0,
        members: /* @__PURE__ */ new Set()
      });
    }
    const club = clubPointsMap.get(clubName);
    club.points += item.totalPoints;
    club.members.add(item.participantId);
  });
  const classement = Array.from(clubPointsMap.values()).map((club, index) => ({
    clubId: index.toString(),
    clubName: club.name,
    totalPoints: club.points,
    memberCount: club.members.size,
    rank: 0
  }));
  classement.sort((a, b) => b.totalPoints - a.totalPoints);
  classement.forEach((item, index) => {
    item.rank = index + 1;
  });
  return classement;
}
function ParticipantsManagement({ clubs, onAddClub }) {
  const { state, addParticipant, deleteParticipant, error } = useCompetition();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [sortColumn, setSortColumn] = useState("firstName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "F",
    birthDate: "",
    licenseNumber: "",
    clubId: clubs[0]?.id || ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLocalError(null);
      setIsLoading(true);
      const category = getCategoryByBirthDate(formData.birthDate, formData.gender);
      await addParticipant({
        ...formData,
        category
      });
      setFormData({
        firstName: "",
        lastName: "",
        gender: "F",
        birthDate: "",
        licenseNumber: "",
        clubId: clubs[0]?.id || ""
      });
      setShowForm(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de l'ajout";
      setLocalError(message);
      console.error("Erreur addParticipant:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const getClubName = (clubId) => {
    return clubs.find((c) => c.id === clubId)?.name || "N/A";
  };
  const getCategoryColor = (category) => {
    const colorMap = {
      EAF: "#FF69B4",
      // Rose pour Éveil Filles
      EAM: "#4169E1",
      // Bleu pour Éveil Mecs
      POF: "#FFD700",
      // Or pour Poussines Filles
      POM: "#32CD32"
      // Vert lime pour Poussins Mecs
    };
    return colorMap[category] || "#1976d2";
  };
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  const getSortedParticipants = () => {
    const sorted = [...state.participants];
    sorted.sort((a, b) => {
      let aValue;
      let bValue;
      if (sortColumn === "firstName") {
        aValue = a.firstName.toLowerCase();
        bValue = b.firstName.toLowerCase();
      } else if (sortColumn === "lastName") {
        aValue = a.lastName.toLowerCase();
        bValue = b.lastName.toLowerCase();
      } else if (sortColumn === "gender") {
        aValue = a.gender;
        bValue = b.gender;
      } else if (sortColumn === "birthDate") {
        aValue = new Date(a.birthDate).getTime();
        bValue = new Date(b.birthDate).getTime();
      } else if (sortColumn === "category") {
        aValue = a.category;
        bValue = b.category;
      } else if (sortColumn === "licenseNumber") {
        aValue = a.licenseNumber.toLowerCase();
        bValue = b.licenseNumber.toLowerCase();
      } else if (sortColumn === "club") {
        aValue = getClubName(a.clubId).toLowerCase();
        bValue = getClubName(b.clubId).toLowerCase();
      }
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  };
  const renderSortIcon = (column) => {
    if (sortColumn !== column) return " ↕";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };
  const getFilteredParticipants = () => {
    return state.participants.filter((participant) => {
      const searchLower = searchTerm.toLowerCase();
      return participant.firstName.toLowerCase().includes(searchLower) || participant.lastName.toLowerCase().includes(searchLower) || participant.category.toLowerCase().includes(searchLower);
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-content", children: [
    /* @__PURE__ */ jsxs("span", { className: "card-title", children: [
      "Gestion des participants",
      state.participants.length > 0 && /* @__PURE__ */ jsx("span", { className: "badge", children: state.participants.length })
    ] }),
    (localError || error) && /* @__PURE__ */ jsxs("div", { style: { color: "red", marginBottom: "10px", padding: "10px", backgroundColor: "#ffebee", borderRadius: "4px" }, children: [
      "⚠️ ",
      localError || error
    ] }),
    /* @__PURE__ */ jsx("button", { className: "btn waves-effect waves-light", onClick: () => setShowForm(!showForm), disabled: isLoading, children: showForm ? "Annuler" : "Ajouter un participant" }),
    state.participants.length > 0 && /* @__PURE__ */ jsxs("div", { style: { marginTop: "20px", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Rechercher par prénom, nom ou catégorie...",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value),
          style: {
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "14px"
          }
        }
      ),
      getFilteredParticipants().length !== state.participants.length && /* @__PURE__ */ jsxs("p", { style: { margin: "10px 0 0 0", fontSize: "12px", color: "#666" }, children: [
        getFilteredParticipants().length,
        " résultat(s) sur ",
        state.participants.length
      ] })
    ] }),
    showForm && /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "form-container", children: [
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxs("div", { className: "input-field col s12 m6", children: [
          /* @__PURE__ */ jsx("input", { id: "firstName", name: "firstName", type: "text", value: formData.firstName, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx("label", { htmlFor: "firstName", children: "Prénom" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "input-field col s12 m6", children: [
          /* @__PURE__ */ jsx("input", { id: "lastName", name: "lastName", type: "text", value: formData.lastName, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx("label", { htmlFor: "lastName", children: "Nom" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsx("div", { className: "input-field col s12 m3", children: /* @__PURE__ */ jsxs("select", { name: "gender", id: "gender", value: formData.gender, onChange: handleChange, children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Sélectionner un genre" }),
          /* @__PURE__ */ jsx("option", { value: "F", children: "Fille" }),
          /* @__PURE__ */ jsx("option", { value: "M", children: "Garçon" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "input-field col s12 m3", children: [
          /* @__PURE__ */ jsx("input", { id: "birthDate", name: "birthDate", type: "date", value: formData.birthDate, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx("label", { htmlFor: "birthDate", children: "Date de naissance" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "input-field col s12 m3", children: [
          /* @__PURE__ */ jsx("input", { id: "licenseNumber", name: "licenseNumber", type: "text", value: formData.licenseNumber, onChange: handleChange, required: true }),
          /* @__PURE__ */ jsx("label", { htmlFor: "licenseNumber", children: "Numéro de licence" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "input-field col s12 m3", children: [
          /* @__PURE__ */ jsx("select", { name: "clubId", value: formData.clubId, onChange: handleChange, required: true, children: clubs.map((club) => /* @__PURE__ */ jsx("option", { value: club.id, children: club.name }, club.id)) }),
          clubs.length === 0 && /* @__PURE__ */ jsx("p", { className: "helper-text", style: { color: "red" }, children: "Veuillez d'abord créer un club" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "btn waves-effect waves-light green", disabled: clubs.length === 0 || isLoading, children: isLoading ? "Ajout en cours..." : "Ajouter" })
    ] }),
    state.participants.length > 0 && /* @__PURE__ */ jsx("div", { className: "table-container", style: { marginTop: "20px" }, children: /* @__PURE__ */ jsxs("table", { className: "striped", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("firstName"), children: [
          "Prénom",
          renderSortIcon("firstName")
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("lastName"), children: [
          "Nom",
          renderSortIcon("lastName")
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("gender"), children: [
          "Genre",
          renderSortIcon("gender")
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("birthDate"), children: [
          "Date de naissance",
          renderSortIcon("birthDate")
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("category"), children: [
          "Catégorie",
          renderSortIcon("category")
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("licenseNumber"), children: [
          "Licence",
          renderSortIcon("licenseNumber")
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("club"), children: [
          "Club",
          renderSortIcon("club")
        ] }),
        /* @__PURE__ */ jsx("th", { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: getSortedParticipants().filter((participant) => {
        const searchLower = searchTerm.toLowerCase();
        return participant.firstName.toLowerCase().includes(searchLower) || participant.lastName.toLowerCase().includes(searchLower) || participant.category.toLowerCase().includes(searchLower);
      }).map((participant) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: participant.firstName }),
        /* @__PURE__ */ jsx("td", { children: participant.lastName }),
        /* @__PURE__ */ jsx("td", { children: participant.gender === "F" ? "F" : "M" }),
        /* @__PURE__ */ jsx("td", { children: participant.birthDate }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
          "span",
          {
            className: "badge",
            style: {
              backgroundColor: getCategoryColor(participant.category),
              color: participant.category === "POF" ? "#000" : "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "50px"
            },
            children: participant.category
          }
        ) }),
        /* @__PURE__ */ jsx("td", { children: participant.licenseNumber }),
        /* @__PURE__ */ jsx("td", { children: getClubName(participant.clubId) }),
        /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("button", { className: "btn btn-small red waves-effect", onClick: () => deleteParticipant(participant.id), disabled: isLoading, children: /* @__PURE__ */ jsx("i", { className: "material-icons", children: "delete" }) }) })
      ] }, participant.id)) })
    ] }) })
  ] }) });
}
const CATEGORIES$1 = ["EAF", "EAM", "POF", "POM"];
const EVENTS$1 = ["vitesse", "haies", "pentabond", "lancé"];
const UNITS = {
  vitesse: "s",
  haies: "s",
  pentabond: "m",
  lancé: "m"
};
function BaremesManagement() {
  const { state, saveBareme, error } = useCompetition();
  const [selectedCategory, setSelectedCategory] = useState("EAF");
  const [selectedEvent, setSelectedEvent] = useState("vitesse");
  const [rows, setRows] = useState([{ rank: 1, minPerformance: 0, maxPerformance: 100, points: 100 }]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const currentBareme = state.baremes.find((b) => b.category === selectedCategory && b.event === selectedEvent);
  const handleAddRow = () => {
    const newRow = {
      rank: rows.length + 1,
      minPerformance: 0,
      maxPerformance: 100,
      points: 80
    };
    setRows([...rows, newRow]);
  };
  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };
  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index] = {
      ...newRows[index],
      [field]: value
    };
    setRows(newRows);
  };
  const handleSave = async () => {
    try {
      setLocalError(null);
      setIsLoading(true);
      const bareme = {
        id: currentBareme?.id || "",
        // Utiliser l'id existant ou vide pour une nouvelle création
        category: selectedCategory,
        event: selectedEvent,
        rows: rows.sort((a, b) => b.points - a.points),
        // Trier par points décroissants
        unit: UNITS[selectedEvent]
      };
      await saveBareme(bareme);
      setShowForm(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur lors de la sauvegarde";
      setLocalError(message);
      console.error("Erreur saveBareme:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoadBareme = () => {
    if (currentBareme) {
      setRows([...currentBareme.rows]);
      setShowForm(true);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-content", children: [
    /* @__PURE__ */ jsx("span", { className: "card-title", children: "Gestion des barèmes" }),
    (localError || error) && /* @__PURE__ */ jsxs("div", { style: { color: "red", marginBottom: "10px", padding: "10px", backgroundColor: "#ffebee", borderRadius: "4px" }, children: [
      "⚠️ ",
      localError || error
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "input-field col s12 m4", children: /* @__PURE__ */ jsx("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), children: CATEGORIES$1.map((cat) => /* @__PURE__ */ jsx("option", { value: cat, children: cat }, cat)) }) }),
      /* @__PURE__ */ jsx("div", { className: "input-field col s12 m4", children: /* @__PURE__ */ jsx("select", { value: selectedEvent, onChange: (e) => setSelectedEvent(e.target.value), children: EVENTS$1.map((evt) => /* @__PURE__ */ jsx("option", { value: evt, children: evt }, evt)) }) }),
      /* @__PURE__ */ jsx("div", { className: "col s12 m4", style: { display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn waves-effect waves-light",
          onClick: () => {
            if (currentBareme) {
              handleLoadBareme();
            } else {
              setShowForm(!showForm);
            }
          },
          disabled: isLoading,
          style: { height: "3rem", lineHeight: "1.5rem", padding: "0 1.5rem" },
          children: showForm ? "Annuler" : currentBareme ? "Modifier" : "Créer barème"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { children: currentBareme && /* @__PURE__ */ jsxs("p", { className: "teal-text", children: [
      "✓ Barème existant pour ",
      selectedCategory,
      " - ",
      selectedEvent
    ] }) }),
    showForm && /* @__PURE__ */ jsxs("div", { style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx("h5", { children: "Définir les plages de points" }),
      /* @__PURE__ */ jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxs("table", { className: "striped", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "Rang" }),
          /* @__PURE__ */ jsxs("th", { children: [
            "Min Performance (",
            UNITS[selectedEvent],
            ")"
          ] }),
          /* @__PURE__ */ jsxs("th", { children: [
            "Max Performance (",
            UNITS[selectedEvent],
            ")"
          ] }),
          /* @__PURE__ */ jsx("th", { children: "Points" }),
          /* @__PURE__ */ jsx("th", { children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: rows.map((row, index) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: row.rank }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              step: "0.01",
              value: row.minPerformance,
              onChange: (e) => handleRowChange(index, "minPerformance", parseFloat(e.target.value)),
              style: { width: "80px" }
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              step: "0.01",
              value: row.maxPerformance,
              onChange: (e) => handleRowChange(index, "maxPerformance", parseFloat(e.target.value)),
              style: { width: "80px" }
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              value: row.points,
              onChange: (e) => handleRowChange(index, "points", parseFloat(e.target.value)),
              style: { width: "80px" }
            }
          ) }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("button", { className: "btn btn-small red", onClick: () => handleRemoveRow(index), children: /* @__PURE__ */ jsx("i", { className: "material-icons", children: "delete" }) }) })
        ] }, index)) })
      ] }) }),
      /* @__PURE__ */ jsx("button", { className: "btn waves-effect waves-light", onClick: handleAddRow, style: { marginTop: "10px" }, children: "Ajouter une ligne" }),
      /* @__PURE__ */ jsx("button", { className: "btn waves-effect waves-light green", onClick: handleSave, style: { marginLeft: "10px" }, disabled: isLoading, children: isLoading ? "Enregistrement..." : "Enregistrer" })
    ] }),
    state.baremes.length > 0 && /* @__PURE__ */ jsxs("div", { style: { marginTop: "30px" }, children: [
      /* @__PURE__ */ jsx("h5", { children: "Barèmes par catégorie" }),
      /* @__PURE__ */ jsx("div", { className: "row", children: CATEGORIES$1.map((category, index) => {
        const categoryBaremes = state.baremes.filter((b) => b.category === category);
        return /* @__PURE__ */ jsx("div", { className: "col s12 m6", children: /* @__PURE__ */ jsx("div", { className: "card", style: { marginBottom: "20px" }, children: /* @__PURE__ */ jsxs("div", { className: "card-content", children: [
          /* @__PURE__ */ jsx("span", { className: "card-title", style: { fontSize: "16px" }, children: category }),
          categoryBaremes.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "collection", children: categoryBaremes.map((bareme) => /* @__PURE__ */ jsxs("li", { className: "collection-item", children: [
            bareme.event,
            " (",
            bareme.rows.length,
            " plages)"
          ] }, bareme.id)) }) : /* @__PURE__ */ jsx("p", { style: { color: "#999", fontSize: "12px" }, children: "Aucun barème défini" })
        ] }) }) }, category);
      }) })
    ] })
  ] }) });
}
const EVENTS = ["vitesse", "haies", "pentabond", "lancé"];
const EVENT_LABELS$1 = {
  vitesse: { fr: "Vitesse", emoji: "⚡" },
  haies: { fr: "Haies", emoji: "🏃" },
  pentabond: { fr: "Pentabond", emoji: "🦘" },
  lancé: { fr: "Lancé", emoji: "🎯" }
};
function EventSelector({ onSelectEvent }) {
  const { state } = useCompetition();
  const getEventStatus = (event) => {
    const bareme = state.baremes.find((b) => b.event === event);
    const resultsCount = state.results.filter((r) => r.event === event).length;
    return {
      hasBareme: !!bareme,
      resultsCount,
      bareme
    };
  };
  return /* @__PURE__ */ jsxs("div", { className: "event-selector-container", children: [
    /* @__PURE__ */ jsx("h2", { style: { marginTop: 0 }, children: "Sélectionner une épreuve" }),
    /* @__PURE__ */ jsx("div", { className: "event-cards-grid", children: EVENTS.map((event) => {
      const status = getEventStatus(event);
      const { fr, emoji } = EVENT_LABELS$1[event];
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `event-card ${!status.hasBareme ? "disabled" : ""}`,
          onClick: () => status.hasBareme && onSelectEvent(event),
          role: "button",
          tabIndex: status.hasBareme ? 0 : -1,
          onKeyDown: (e) => {
            if ((e.key === "Enter" || e.key === " ") && status.hasBareme) {
              onSelectEvent(event);
            }
          },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "event-card-header", children: [
              /* @__PURE__ */ jsx("span", { className: "event-emoji", children: emoji }),
              /* @__PURE__ */ jsx("h3", { className: "event-title", children: fr })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "event-card-stats", children: [
              status.bareme && /* @__PURE__ */ jsxs("div", { className: "event-stat", children: [
                /* @__PURE__ */ jsx("span", { className: "stat-label", children: "Unité:" }),
                /* @__PURE__ */ jsx("span", { className: "stat-value", children: status.bareme.unit })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "event-stat", children: [
                /* @__PURE__ */ jsx("span", { className: "stat-label", children: "Résultats:" }),
                /* @__PURE__ */ jsx("span", { className: "stat-value", children: status.resultsCount })
              ] })
            ] }),
            !status.hasBareme && /* @__PURE__ */ jsx("div", { className: "event-card-warning", children: "⚠️ Aucun barème défini" }),
            status.hasBareme && /* @__PURE__ */ jsx("div", { className: "event-card-cta", children: "Saisir les résultats →" })
          ]
        },
        event
      );
    }) })
  ] });
}
const EVENT_LABELS = {
  vitesse: "Vitesse",
  haies: "Haies",
  pentabond: "Pentabond",
  lancé: "Lancé"
};
const CATEGORY_LABELS = {
  EAF: "Éveil Filles",
  EAM: "Éveil Garçons",
  POF: "Poussines Filles",
  POM: "Poussins Garçons"
};
function EventResultsInput({ event, onBack }) {
  const { state, addResult, deleteResult, error } = useCompetition();
  const [step, setStep] = useState("category");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedParticipantId, setSelectedParticipantId] = useState("");
  const [performance, setPerformance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [results, setResults] = useState([]);
  const currentBareme = state.baremes.find((b) => b.event === event);
  useEffect(() => {
    const eventResults = state.results.filter((r) => r.event === event);
    setResults(eventResults);
  }, [event, state.results]);
  const availableCategories = Array.from(new Set(state.participants.map((p) => p.category)));
  const availableParticipants = selectedCategory ? state.participants.filter((p) => p.category === selectedCategory) : [];
  const filteredResults = selectedCategory ? results.filter((r) => {
    const participant = state.participants.find((p) => p.id === r.participantId);
    return participant?.category === selectedCategory;
  }) : [];
  const bestResultByParticipant = {};
  filteredResults.forEach((result) => {
    const existing = bestResultByParticipant[result.participantId];
    if (!existing || result.points > existing.points) {
      bestResultByParticipant[result.participantId] = result;
    }
  });
  const handleGoToStep = (nextStep) => {
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
    const performanceNum = parseFloat(performance);
    if (isNaN(performanceNum) || performanceNum <= 0) {
      setLocalError("La performance doit être un nombre positif");
      return;
    }
    if (!currentBareme) {
      setLocalError("Aucun barème défini pour cette épreuve");
      return;
    }
    try {
      setLocalError(null);
      setIsLoading(true);
      const points = calculatePointsForPerformance(performanceNum, currentBareme);
      const newResult = {
        id: `result-${Date.now()}`,
        participantId: selectedParticipantId,
        eventId: `event-${event}`,
        event,
        performance: performanceNum,
        points
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
  };
  const handleDeleteResult = async (resultId) => {
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
  const calculatedPoints = performance && currentBareme ? calculatePointsForPerformance(parseFloat(performance), currentBareme) : 0;
  return /* @__PURE__ */ jsxs("div", { className: "event-results-wizard", children: [
    /* @__PURE__ */ jsxs("div", { className: "wizard-header", children: [
      /* @__PURE__ */ jsx("button", { className: "btn-back", onClick: onBack, children: "← Retour" }),
      /* @__PURE__ */ jsx("h2", { children: EVENT_LABELS[event] })
    ] }),
    (localError || error) && /* @__PURE__ */ jsxs("div", { className: "error-message", children: [
      "⚠️ ",
      localError || error
    ] }),
    !currentBareme && /* @__PURE__ */ jsx("div", { className: "warning-message", children: "⚠️ Aucun barème défini pour cette épreuve" }),
    /* @__PURE__ */ jsxs("div", { className: "wizard-container", children: [
      step === "category" && /* @__PURE__ */ jsxs("div", { className: "wizard-step", children: [
        /* @__PURE__ */ jsx("h3", { children: "Étape 1: Sélectionner une catégorie" }),
        /* @__PURE__ */ jsx("div", { className: "step-content", children: /* @__PURE__ */ jsx("div", { className: "category-buttons", children: availableCategories.map((category) => /* @__PURE__ */ jsxs(
          "button",
          {
            className: `category-button ${selectedCategory === category ? "active" : ""}`,
            onClick: () => {
              setSelectedCategory(category);
              handleGoToStep("participant");
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: "category-name", children: CATEGORY_LABELS[category] }),
              /* @__PURE__ */ jsx("span", { className: "category-count", children: results.filter((r) => {
                const p = state.participants.find((p2) => p2.id === r.participantId);
                return p?.category === category;
              }).length })
            ]
          },
          category
        )) }) }),
        /* @__PURE__ */ jsx("div", { className: "wizard-actions" })
      ] }),
      step === "participant" && selectedCategory && /* @__PURE__ */ jsxs("div", { className: "wizard-step", children: [
        /* @__PURE__ */ jsxs("h3", { children: [
          "Étape 2: Sélectionner un participant (",
          CATEGORY_LABELS[selectedCategory],
          ")"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "step-content", children: /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { children: "Participant" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: selectedParticipantId,
              onChange: (e) => {
                setSelectedParticipantId(e.target.value);
                if (e.target.value) {
                  handleGoToStep("result");
                }
              },
              className: "form-control",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "-- Sélectionner un participant --" }),
                availableParticipants.map((p) => {
                  const club = p.clubId ? state.clubs.find((c) => c.id === p.clubId) : null;
                  const participantResults = filteredResults.filter((r) => r.participantId === p.id);
                  const hasSaisie = participantResults.length > 0;
                  const bestResult = bestResultByParticipant[p.id];
                  return /* @__PURE__ */ jsxs("option", { value: p.id, children: [
                    p.firstName,
                    " ",
                    p.lastName,
                    " ",
                    club?.name ? `(${club.name})` : "",
                    " ",
                    hasSaisie ? `[${participantResults.length} saisie(s), best: ${bestResult?.points}pts]` : ""
                  ] }, p.id);
                })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "wizard-actions", children: /* @__PURE__ */ jsx("button", { className: "btn btn-secondary", onClick: () => handleGoToStep("category"), disabled: isLoading, children: "← Retour à la catégorie" }) })
      ] }),
      step === "result" && selectedParticipant && selectedCategory && /* @__PURE__ */ jsxs("div", { className: "wizard-step", children: [
        /* @__PURE__ */ jsx("h3", { children: "Étape 3: Saisir la performance" }),
        /* @__PURE__ */ jsxs("div", { className: "step-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "participant-card", children: [
            /* @__PURE__ */ jsxs("div", { className: "participant-header", children: [
              /* @__PURE__ */ jsxs("h4", { children: [
                selectedParticipant.firstName,
                " ",
                selectedParticipant.lastName
              ] }),
              /* @__PURE__ */ jsx("span", { className: "category-badge", children: CATEGORY_LABELS[selectedCategory] })
            ] }),
            selectedParticipant.clubId && /* @__PURE__ */ jsx("div", { className: "participant-club", children: state.clubs.find((c) => c.id === selectedParticipant.clubId)?.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
            /* @__PURE__ */ jsxs("label", { children: [
              "Performance (",
              currentBareme?.unit || "?",
              ")"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                step: "0.01",
                value: performance,
                onChange: (e) => setPerformance(e.target.value),
                className: "form-control input-large",
                placeholder: "0.00",
                disabled: isLoading,
                autoFocus: true
              }
            )
          ] }),
          performance && /* @__PURE__ */ jsxs("div", { className: "points-preview", children: [
            /* @__PURE__ */ jsx("div", { className: "points-value", children: calculatedPoints }),
            /* @__PURE__ */ jsx("div", { className: "points-label", children: "points" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "wizard-actions", children: [
          /* @__PURE__ */ jsx("button", { className: "btn btn-secondary", onClick: () => handleGoToStep("participant"), disabled: isLoading, children: "← Précédent" }),
          /* @__PURE__ */ jsx("button", { className: "btn btn-success", onClick: handleSaveResult, disabled: !performance || isLoading || !currentBareme, children: "✓ Valider et continuer" })
        ] })
      ] })
    ] }),
    selectedCategory && /* @__PURE__ */ jsxs("div", { className: "results-summary", children: [
      /* @__PURE__ */ jsxs("h3", { children: [
        "Résultats - ",
        CATEGORY_LABELS[selectedCategory],
        " (",
        Object.keys(bestResultByParticipant).length,
        ")"
      ] }),
      Object.keys(bestResultByParticipant).length > 0 ? /* @__PURE__ */ jsx("div", { className: "results-list", children: Object.values(bestResultByParticipant).map((bestResult) => {
        const participant = state.participants.find((p) => p.id === bestResult.participantId);
        const club = participant?.clubId ? state.clubs.find((c) => c.id === participant.clubId) : null;
        const participantResults = filteredResults.filter((r) => r.participantId === bestResult.participantId);
        const sortedResults = [...participantResults].sort((a, b) => b.points - a.points);
        const otherResults = sortedResults.filter((r) => r.id !== bestResult.id);
        return /* @__PURE__ */ jsxs("div", { className: "result-participant-group", children: [
          /* @__PURE__ */ jsxs("div", { className: "result-item result-item-best", children: [
            /* @__PURE__ */ jsxs("div", { className: "result-main", children: [
              /* @__PURE__ */ jsxs("div", { className: "result-name", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  participant?.firstName,
                  " ",
                  participant?.lastName
                ] }),
                club && /* @__PURE__ */ jsx("span", { className: "result-club", children: club.name }),
                sortedResults.length > 1 && /* @__PURE__ */ jsx("span", { className: "result-badge", children: "★ Meilleur" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "result-score", children: [
                /* @__PURE__ */ jsxs("span", { className: "score-perf", children: [
                  bestResult.performance,
                  " ",
                  currentBareme?.unit
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "score-points", children: [
                  bestResult.points,
                  " pts"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "btn-delete-small",
                onClick: () => handleDeleteResult(bestResult.id),
                disabled: isLoading,
                title: "Supprimer ce résultat",
                children: "✕"
              }
            )
          ] }),
          otherResults.map((result) => /* @__PURE__ */ jsxs("div", { className: "result-item result-item-other", children: [
            /* @__PURE__ */ jsx("div", { className: "result-main", children: /* @__PURE__ */ jsxs("div", { className: "result-score", children: [
              /* @__PURE__ */ jsxs("span", { className: "score-perf", children: [
                result.performance,
                " ",
                currentBareme?.unit
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "score-points", children: [
                result.points,
                " pts"
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "btn-delete-small",
                onClick: () => handleDeleteResult(result.id),
                disabled: isLoading,
                title: "Supprimer ce résultat",
                children: "✕"
              }
            )
          ] }, result.id))
        ] }, `participant-${bestResult.participantId}`);
      }) }) : /* @__PURE__ */ jsx("p", { className: "empty-message", children: "Aucun résultat pour le moment" })
    ] })
  ] });
}
function ResultsManagement() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  return /* @__PURE__ */ jsx("div", { className: "results-management-container", children: selectedEvent === null ? /* @__PURE__ */ jsx(EventSelector, { onSelectEvent: setSelectedEvent }) : /* @__PURE__ */ jsx(EventResultsInput, { event: selectedEvent, onBack: () => setSelectedEvent(null) }) });
}
const CATEGORIES = ["EAF", "EAM", "POF", "POM"];
function RankingsDisplay() {
  const { state } = useCompetition();
  const [sortFieldIndividuel, setSortFieldIndividuel] = useState("rank");
  const [sortDirIndividuel, setSortDirIndividuel] = useState("asc");
  const [sortFieldClubs, setSortFieldClubs] = useState("rank");
  const [sortDirClubs, setSortDirClubs] = useState("asc");
  const clubMap = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    state.clubs.forEach((club) => {
      map.set(club.id, club.name);
    });
    return map;
  }, [state.clubs]);
  const classementIndividuel = useMemo(() => {
    return calculateClassementIndividuel(state.participants, clubMap, state.results);
  }, [state.participants, state.results, clubMap]);
  const classementClubs = useMemo(() => {
    return calculateClassementClub(classementIndividuel);
  }, [classementIndividuel, clubMap]);
  const hasResults = state.results.length > 0;
  const sortIndividualResults = (data) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      let aVal;
      let bVal;
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
  const sortClubsResults = (data) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      let aVal;
      let bVal;
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
  const handleSort = (field) => {
    if (sortFieldIndividuel === field) {
      setSortDirIndividuel(sortDirIndividuel === "asc" ? "desc" : "asc");
    } else {
      setSortFieldIndividuel(field);
      setSortDirIndividuel("asc");
    }
  };
  const handleSortClubs = (field) => {
    if (sortFieldClubs === field) {
      setSortDirClubs(sortDirClubs === "asc" ? "desc" : "asc");
    } else {
      setSortFieldClubs(field);
      setSortDirClubs("asc");
    }
  };
  const SortIndicator = ({ field, currentField, direction }) => {
    if (field !== currentField) return null;
    return /* @__PURE__ */ jsx("span", { style: { marginLeft: "5px" }, children: direction === "asc" ? "▲" : "▼" });
  };
  const renderClassementByCategory = (category) => {
    const classementParCategorie = classementIndividuel.filter((c) => c.category === category);
    if (classementParCategorie.length === 0) {
      return /* @__PURE__ */ jsx("p", { style: { color: "#999", marginTop: "10px" }, children: "Aucun participant dans cette catégorie" });
    }
    const sortedData = sortIndividualResults(classementParCategorie);
    return /* @__PURE__ */ jsx("div", { className: "table-container", style: { marginTop: "10px" }, children: /* @__PURE__ */ jsxs("table", { className: "striped", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("rank"), children: [
          "Rang ",
          /* @__PURE__ */ jsx(SortIndicator, { field: "rank", currentField: sortFieldIndividuel, direction: sortDirIndividuel })
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("name"), children: [
          "Participant ",
          /* @__PURE__ */ jsx(SortIndicator, { field: "name", currentField: sortFieldIndividuel, direction: sortDirIndividuel })
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("club"), children: [
          "Club ",
          /* @__PURE__ */ jsx(SortIndicator, { field: "club", currentField: sortFieldIndividuel, direction: sortDirIndividuel })
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("vitesse"), children: [
          "Vitesse (pts) ",
          /* @__PURE__ */ jsx(SortIndicator, { field: "vitesse", currentField: sortFieldIndividuel, direction: sortDirIndividuel })
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("haies"), children: [
          "Haies (pts) ",
          /* @__PURE__ */ jsx(SortIndicator, { field: "haies", currentField: sortFieldIndividuel, direction: sortDirIndividuel })
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("pentabond"), children: [
          "Pentabond (pts) ",
          /* @__PURE__ */ jsx(SortIndicator, { field: "pentabond", currentField: sortFieldIndividuel, direction: sortDirIndividuel })
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("lancé"), children: [
          "Lancé (pts) ",
          /* @__PURE__ */ jsx(SortIndicator, { field: "lancé", currentField: sortFieldIndividuel, direction: sortDirIndividuel })
        ] }),
        /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSort("total"), children: [
          "Total ",
          /* @__PURE__ */ jsx(SortIndicator, { field: "total", currentField: sortFieldIndividuel, direction: sortDirIndividuel })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: sortedData.map((participant) => {
        const vitesseResult = participant.results.find((r) => r.event === "vitesse");
        const haiesResult = participant.results.find((r) => r.event === "haies");
        const pentabondResult = participant.results.find((r) => r.event === "pentabond");
        const lancéResult = participant.results.find((r) => r.event === "lancé");
        return /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: participant.rank }) }),
          /* @__PURE__ */ jsxs("td", { children: [
            participant.firstName,
            " ",
            participant.lastName
          ] }),
          /* @__PURE__ */ jsx("td", { children: participant.clubName }),
          /* @__PURE__ */ jsx("td", { children: vitesseResult?.points || "-" }),
          /* @__PURE__ */ jsx("td", { children: haiesResult?.points || "-" }),
          /* @__PURE__ */ jsx("td", { children: pentabondResult?.points || "-" }),
          /* @__PURE__ */ jsx("td", { children: lancéResult?.points || "-" }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { style: { color: "#1976d2" }, children: participant.totalPoints }) })
        ] }, participant.participantId);
      }) })
    ] }) });
  };
  return /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-content", children: [
    /* @__PURE__ */ jsx("span", { className: "card-title", children: "Classements" }),
    !hasResults && /* @__PURE__ */ jsx("div", { className: "orange-text", style: { marginBottom: "20px" }, children: "⚠ Aucun résultat pour le moment" }),
    /* @__PURE__ */ jsxs("div", { style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx("h4", { children: "Classements par catégorie" }),
      CATEGORIES.map((category) => /* @__PURE__ */ jsxs("div", { style: { marginBottom: "40px" }, children: [
        /* @__PURE__ */ jsxs("h5", { style: { paddingBottom: "10px", borderBottom: "2px solid #1976d2" }, children: [
          category,
          " (",
          classementIndividuel.filter((c) => c.category === category).length,
          " participants)"
        ] }),
        renderClassementByCategory(category)
      ] }, category))
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { marginTop: "50px" }, children: [
      /* @__PURE__ */ jsx("h4", { children: "Classement des clubs" }),
      classementClubs.length === 0 ? /* @__PURE__ */ jsx("p", { style: { color: "#999" }, children: "Aucun club enregistré" }) : /* @__PURE__ */ jsx("div", { className: "table-container", children: /* @__PURE__ */ jsxs("table", { className: "striped", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSortClubs("rank"), children: [
            "Rang ",
            /* @__PURE__ */ jsx(SortIndicator, { field: "rank", currentField: sortFieldClubs, direction: sortDirClubs })
          ] }),
          /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSortClubs("name"), children: [
            "Club ",
            /* @__PURE__ */ jsx(SortIndicator, { field: "name", currentField: sortFieldClubs, direction: sortDirClubs })
          ] }),
          /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSortClubs("members"), children: [
            "Nombre de participants ",
            /* @__PURE__ */ jsx(SortIndicator, { field: "members", currentField: sortFieldClubs, direction: sortDirClubs })
          ] }),
          /* @__PURE__ */ jsxs("th", { style: { cursor: "pointer" }, onClick: () => handleSortClubs("total"), children: [
            "Points totaux ",
            /* @__PURE__ */ jsx(SortIndicator, { field: "total", currentField: sortFieldClubs, direction: sortDirClubs })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: sortClubsResults(classementClubs).map((club) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { children: club.rank }) }),
          /* @__PURE__ */ jsx("td", { children: club.clubName }),
          /* @__PURE__ */ jsx("td", { children: club.memberCount }),
          /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("strong", { style: { color: "#1976d2" }, children: club.totalPoints }) })
        ] }, club.clubId)) })
      ] }) })
    ] })
  ] }) });
}
function CompetitionContent() {
  const {
    state,
    resetAll
  } = useCompetition();
  const [activeTab, setActiveTab] = useState("clubs");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tabButtons = [{
    id: "clubs",
    label: "🏢 Clubs"
  }, {
    id: "participants",
    label: "👥 Participants"
  }, {
    id: "baremes",
    label: "📊 Barèmes"
  }, {
    id: "results",
    label: "📋 Résultats"
  }, {
    id: "rankings",
    label: "🏆 Classements"
  }];
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsxs("div", {
      className: "container",
      children: [/* @__PURE__ */ jsx("h1", {
        style: {
          marginBottom: "30px",
          fontSize: "2rem",
          marginTop: "5px"
        },
        children: "Poussinade ESSPO"
      }), /* @__PURE__ */ jsx("div", {
        className: "row",
        style: {
          marginBottom: "30px"
        },
        children: /* @__PURE__ */ jsxs("div", {
          className: "col s12",
          children: [/* @__PURE__ */ jsxs("button", {
            className: "btn-mobile-menu",
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            children: [/* @__PURE__ */ jsx("span", {}), /* @__PURE__ */ jsx("span", {}), /* @__PURE__ */ jsx("span", {})]
          }), /* @__PURE__ */ jsx("ul", {
            className: `tabs ${mobileMenuOpen ? "mobile-open" : ""}`,
            children: tabButtons.map((tab) => /* @__PURE__ */ jsx("li", {
              className: "tab",
              style: {
                cursor: "pointer",
                backgroundColor: activeTab === tab.id ? "#000000ff" : "#f0f0f0",
                borderRadius: "4px"
              },
              onClick: () => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
              },
              children: /* @__PURE__ */ jsx("a", {
                href: "#",
                onClick: (e) => e.preventDefault(),
                style: {
                  color: activeTab === tab.id ? "rgba(255, 255, 255, 1)" : "black"
                },
                children: tab.label
              })
            }, tab.id))
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "row",
        children: /* @__PURE__ */ jsxs("div", {
          className: "col s12",
          children: [activeTab === "clubs" && /* @__PURE__ */ jsx(ClubsManagement, {}), activeTab === "participants" && /* @__PURE__ */ jsx(ParticipantsManagement, {
            clubs: state.clubs
          }), activeTab === "baremes" && /* @__PURE__ */ jsx(BaremesManagement, {}), activeTab === "results" && /* @__PURE__ */ jsx(ResultsManagement, {}), activeTab === "rankings" && /* @__PURE__ */ jsx(RankingsDisplay, {})]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "row",
        style: {
          marginTop: "40px"
        },
        children: /* @__PURE__ */ jsx("div", {
          className: "col s12",
          children: /* @__PURE__ */ jsx("div", {
            className: "card",
            children: /* @__PURE__ */ jsxs("div", {
              className: "card-content",
              children: [/* @__PURE__ */ jsx("span", {
                className: "card-title",
                children: "Résumé des données"
              }), /* @__PURE__ */ jsxs("ul", {
                children: [/* @__PURE__ */ jsxs("li", {
                  children: ["Clubs: ", state.clubs.length]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["Participants: ", state.participants.length]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["Barèmes: ", state.baremes.length]
                }), /* @__PURE__ */ jsxs("li", {
                  children: ["Résultats: ", state.results.length]
                })]
              })]
            })
          })
        })
      })]
    })
  });
}
const competition = UNSAFE_withComponentProps(function CompetitionPage({}) {
  return /* @__PURE__ */ jsx(CompetitionProvider, {
    children: /* @__PURE__ */ jsx(CompetitionContent, {})
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: competition
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DSbOaAbg.js", "imports": ["/assets/chunk-EPOLDU6W-Cbkwubdd.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DWfVNBbs.js", "imports": ["/assets/chunk-EPOLDU6W-Cbkwubdd.js"], "css": ["/assets/root-vfLm6Dhm.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DSEdEGmc.js", "imports": ["/assets/chunk-EPOLDU6W-Cbkwubdd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/competition": { "id": "routes/competition", "parentId": "root", "path": "competition", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/competition-BTQeBw8R.js", "imports": ["/assets/chunk-EPOLDU6W-Cbkwubdd.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-3065fe7a.js", "version": "3065fe7a", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "unstable_trailingSlashAwareDataRequests": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/competition": {
    id: "routes/competition",
    parentId: "root",
    path: "competition",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
const allowedActionOrigins = false;
export {
  allowedActionOrigins,
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
