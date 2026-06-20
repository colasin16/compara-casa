import type { Locale } from "./config";

export const en = {
  metadata: {
    title: "ComparaCasa — Score and compare houses your way",
    description:
      "Define your own weighted criteria and score houses to find the one that truly fits you.",
  },
  common: {
    brand: "ComparaCasa",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    optional: "optional",
  },
  header: {
    houses: "Houses",
    criteria: "Criteria",
    guest: "Guest {id}",
    signOut: "Sign out",
    logIn: "Log in",
    selectLanguage: "Select language",
  },
  home: {
    badge: "ComparaCasa",
    titleLead: "Score and compare houses",
    titleHighlight: "your way",
    description:
      "Define the aspects that matter to you — location, condition, parking, terrace, lighting — give each one a weight, and let ComparaCasa rank every house by what you value most.",
    getStarted: "Get started",
    logIn: "Log in",
  },
  login: {
    title: "Welcome to ComparaCasa",
    description:
      "Jump straight in as a guest. Your houses and criteria are saved to this session — you can add a permanent login later.",
    continueAsGuest: "Continue as guest",
  },
  dashboard: {
    title: "Your houses",
    subtitle:
      "Ranked by their weighted score. Open a house to rate it against your criteria.",
    emptyTitle: "No houses yet",
    emptyBodyBefore: "Add your first house using the form, then open it to score each criterion. Make sure you've set up your ",
    emptyBodyLink: "criteria",
    emptyBodyAfter: " first.",
    criteriaRated: "{rated} of {total} criteria rated",
    score: "score",
    addHouse: "Add a house",
  },
  criteria: {
    title: "Your criteria",
    subtitle:
      "Define the aspects you care about and how much each one matters (weight 0–10). These are reused to score every house.",
    loadError: "Couldn't load criteria: {message}",
    emptyTitle: "No criteria yet",
    emptyBody:
      "Start from a common set of house-hunting criteria, then tweak the weights to match what matters to you.",
    addStarter: "Add starter criteria",
    addCriterion: "Add a criterion",
  },
  houseDetail: {
    back: "← Back to houses",
    deleteHouse: "Delete this house",
  },
  houseForm: {
    name: "Name",
    namePlaceholder: "e.g. Sunny flat on Main St",
    address: "Address (optional)",
    addressPlaceholder: "Street, city…",
    notes: "Notes (optional)",
    notesPlaceholder: "Anything to remember…",
    add: "Add house",
  },
  criterionForm: {
    name: "Name",
    namePlaceholder: "e.g. Location, Parking, Terrace…",
    weight: "Weight (importance)",
    weightTitle: "Weight",
    add: "Add criterion",
  },
  ratings: {
    noCriteriaBefore: "You haven't defined any criteria yet. Add some on the ",
    noCriteriaLink: "Criteria",
    noCriteriaAfter: " page first, then come back to score this house.",
    finalScore: "Weighted final score",
    criteriaRated: "{rated} of {total} criteria rated",
    weight: "weight {weight}",
  },
  prosCons: {
    sectionTitle: "Positives vs. negatives",
    sectionDescription:
      "Note what counts for or against this house. Drag a line to reorder it, or drag it across to the other list.",
    prosTitle: "Positives",
    prosDescription: "Things that count in this house's favour.",
    prosPlaceholder: "Add a positive…",
    consTitle: "Negatives",
    consDescription: "Things that count against this house.",
    consPlaceholder: "Add a negative…",
    itemLabel: "{label} item {index}",
    addItemLabel: "Add {label} item",
    moveUp: "Move up",
    moveDown: "Move down",
    moveToPros: "Move to positives",
    moveToCons: "Move to negatives",
    remove: "Remove",
    dropHere: "Drop here",
    empty: "Nothing yet — add a line below or drag one here.",
    saveError: "Could not save: {error}",
  },
};

export type Dictionary = typeof en;

export const es: Dictionary = {
  metadata: {
    title: "ComparaCasa — Puntúa y compara casas a tu manera",
    description:
      "Define tus propios criterios ponderados y puntúa casas para encontrar la que de verdad encaja contigo.",
  },
  common: {
    brand: "ComparaCasa",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    optional: "opcional",
  },
  header: {
    houses: "Casas",
    criteria: "Criterios",
    guest: "Invitado {id}",
    signOut: "Cerrar sesión",
    logIn: "Iniciar sesión",
    selectLanguage: "Seleccionar idioma",
  },
  home: {
    badge: "ComparaCasa",
    titleLead: "Puntúa y compara casas",
    titleHighlight: "a tu manera",
    description:
      "Define los aspectos que te importan — ubicación, estado, aparcamiento, terraza, luz — dale un peso a cada uno y deja que ComparaCasa ordene cada casa según lo que más valoras.",
    getStarted: "Empezar",
    logIn: "Iniciar sesión",
  },
  login: {
    title: "Bienvenido a ComparaCasa",
    description:
      "Entra directamente como invitado. Tus casas y criterios se guardan en esta sesión — más adelante puedes crear un acceso permanente.",
    continueAsGuest: "Continuar como invitado",
  },
  dashboard: {
    title: "Tus casas",
    subtitle:
      "Ordenadas por su puntuación ponderada. Abre una casa para puntuarla según tus criterios.",
    emptyTitle: "Aún no hay casas",
    emptyBodyBefore: "Añade tu primera casa con el formulario y luego ábrela para puntuar cada criterio. Asegúrate de haber configurado tus ",
    emptyBodyLink: "criterios",
    emptyBodyAfter: " primero.",
    criteriaRated: "{rated} de {total} criterios puntuados",
    score: "puntuación",
    addHouse: "Añadir una casa",
  },
  criteria: {
    title: "Tus criterios",
    subtitle:
      "Define los aspectos que te importan y cuánto pesa cada uno (peso 0–10). Se reutilizan para puntuar cada casa.",
    loadError: "No se pudieron cargar los criterios: {message}",
    emptyTitle: "Aún no hay criterios",
    emptyBody:
      "Empieza con un conjunto habitual de criterios para buscar casa y luego ajusta los pesos a lo que más te importa.",
    addStarter: "Añadir criterios iniciales",
    addCriterion: "Añadir un criterio",
  },
  houseDetail: {
    back: "← Volver a las casas",
    deleteHouse: "Eliminar esta casa",
  },
  houseForm: {
    name: "Nombre",
    namePlaceholder: "p. ej. Piso luminoso en la calle Mayor",
    address: "Dirección (opcional)",
    addressPlaceholder: "Calle, ciudad…",
    notes: "Notas (opcional)",
    notesPlaceholder: "Algo que recordar…",
    add: "Añadir casa",
  },
  criterionForm: {
    name: "Nombre",
    namePlaceholder: "p. ej. Ubicación, Aparcamiento, Terraza…",
    weight: "Peso (importancia)",
    weightTitle: "Peso",
    add: "Añadir criterio",
  },
  ratings: {
    noCriteriaBefore: "Aún no has definido ningún criterio. Añade algunos en la página de ",
    noCriteriaLink: "Criterios",
    noCriteriaAfter: " primero y luego vuelve para puntuar esta casa.",
    finalScore: "Puntuación final ponderada",
    criteriaRated: "{rated} de {total} criterios puntuados",
    weight: "peso {weight}",
  },
  prosCons: {
    sectionTitle: "Puntos positivos y negativos",
    sectionDescription:
      "Anota lo que cuenta a favor o en contra de esta casa. Arrastra una línea para reordenarla, o muévela a la otra lista.",
    prosTitle: "Puntos positivos",
    prosDescription: "Cosas que juegan a favor de esta casa.",
    prosPlaceholder: "Añadir un punto positivo…",
    consTitle: "Puntos negativos",
    consDescription: "Cosas que juegan en contra de esta casa.",
    consPlaceholder: "Añadir un punto negativo…",
    itemLabel: "{label}: elemento {index}",
    addItemLabel: "Añadir elemento a {label}",
    moveUp: "Subir",
    moveDown: "Bajar",
    moveToPros: "Mover a puntos positivos",
    moveToCons: "Mover a puntos negativos",
    remove: "Eliminar",
    dropHere: "Suelta aquí",
    empty: "Nada todavía — añade una línea abajo o arrastra una aquí.",
    saveError: "No se pudo guardar: {error}",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, es };
