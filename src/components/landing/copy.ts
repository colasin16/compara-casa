import type { Locale } from "@/lib/i18n/config";

type LandingCopy = {
  badge: string;
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    audience: string;
  };
  problem: {
    title: string;
    description: string;
    questions: string[];
    failsLabel: string;
    fails: string[];
    solutionLine: string;
  };
  solution: {
    title: string;
    description: string;
    cards: Array<{ title: string; description: string; bullets: string[] }>;
  };
  walkthrough: {
    title: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
      caption: string;
      placeholder: boolean;
      kind: "criteria" | "house" | "comparison" | "map";
    }>;
  };
  notesVsExcel: {
    title: string;
    description: string;
    left: string;
    right: string;
    rows: Array<{ label: string; left: string; right: string }>;
  };
  highlights: {
    title: string;
    description: string;
    items: Array<{ title: string; benefit: string }>;
  };
  roadmap: {
    title: string;
    description: string;
    badge: string;
    items: string[];
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  finalCta: {
    title: string;
    description: string;
    button: string;
  };
};

const en: LandingCopy = {
  badge: "Built for real home decisions",
  hero: {
    title: "Know which home fits you best before you commit.",
    description:
      "Capture notes, score every visit, compare properties side by side, and rank them with weighted criteria so your final choice feels clear and confident.",
    primaryCta: "Get started",
    secondaryCta: "See how it works",
    audience: "For first-time buyers, couples, families, and renters comparing multiple homes.",
  },
  problem: {
    title: "After a few visits, every home starts blending together.",
    description:
      "You leave one house and instantly wonder what you just saw in the previous one.",
    questions: [
      "Which kitchen felt bigger?",
      "Which flat had better natural light?",
      "Which one had parking?",
      "Which one was quieter at night?",
    ],
    failsLabel: "When the decision is important, these systems break:",
    fails: ["Notes", "Spreadsheets", "Memory"],
    solutionLine:
      "ComparaCasa gives you one structured place to evaluate every property with the criteria that matter to you.",
  },
  solution: {
    title: "A simple workflow for better home decisions",
    description:
      "Define what matters, evaluate each visit while it is fresh, and compare every option objectively.",
    cards: [
      {
        title: "Define what matters",
        description:
          "Create your own criteria and assign weight based on importance.",
        bullets: ["Location", "Garden", "Parking", "Natural light", "Neighborhood", "Price"],
      },
      {
        title: "Evaluate every visit",
        description:
          "Score each home from 0–10 and save context while details are still fresh.",
        bullets: ["Notes", "Pros & cons", "Checklist", "Listing links"],
      },
      {
        title: "Compare objectively",
        description:
          "Automatic weighted scoring ranks every property side by side so you can choose with confidence.",
        bullets: ["Automatic ranking", "Side-by-side view", "Clear winner"],
      },
    ],
  },
  walkthrough: {
    title: "See the full workflow in minutes",
    description:
      "From setup to final ranking, each step is focused and easy to do on desktop or phone.",
    steps: [
      {
        title: "Create your criteria",
        description: "Set what matters and how much it matters with simple weights.",
        caption: "Criteria creation",
        placeholder: true,
        kind: "criteria",
      },
      {
        title: "Capture each house visit",
        description:
          "Save scores, notes, checklist items, and pros/cons before details fade.",
        caption: "House details",
        placeholder: true,
        kind: "house",
      },
      {
        title: "Compare every option side by side",
        description:
          "Weighted scores update automatically so the strongest options rise to the top.",
        caption: "Comparison page",
        placeholder: false,
        kind: "comparison",
      },
      {
        title: "See locations on one map",
        description:
          "Keep a location overview so you can spot commute and neighborhood trade-offs quickly.",
        caption: "Dashboard map",
        placeholder: true,
        kind: "map",
      },
    ],
  },
  notesVsExcel: {
    title: "Why this beats notes or Excel",
    description:
      "Spreadsheets can store data, but they do not guide decisions during real home visits.",
    left: "Notes / Excel",
    right: "ComparaCasa",
    rows: [
      { label: "Setup", left: "Manual every time", right: "Reusable structure" },
      { label: "Scoring", left: "Manual formulas", right: "Automatic weighted scoring" },
      { label: "Visit notes", left: "Messy and scattered", right: "Structured evaluation" },
      { label: "Ranking", left: "No clear ranking", right: "Automatic ranking" },
      { label: "Comparison", left: "Hard to read", right: "Side-by-side comparison" },
      { label: "Mobile use", left: "Painful on phone", right: "Designed for house visits" },
    ],
  },
  highlights: {
    title: "Everything you need to choose with confidence",
    description:
      "Each feature is built to reduce uncertainty and keep your decisions objective.",
    items: [
      {
        title: "Weighted scoring",
        benefit: "Decide using what matters most to you, not generic ratings.",
      },
      {
        title: "Side-by-side comparison",
        benefit: "See every option together so trade-offs are obvious.",
      },
      {
        title: "Custom criteria",
        benefit: "Evaluate homes using your own priorities, not someone else’s checklist.",
      },
      {
        title: "Pros & cons",
        benefit: "Keep emotional impressions visible and balanced for each property.",
      },
      {
        title: "Checklist",
        benefit: "Verify the same practical details on every visit.",
      },
      {
        title: "Notes",
        benefit: "Capture context you will forget later.",
      },
      {
        title: "Interactive map",
        benefit: "Compare location impact without jumping between tabs.",
      },
      {
        title: "Listing links",
        benefit: "Open each listing instantly when you need to re-check details.",
      },
      {
        title: "Guest mode",
        benefit: "Start immediately without account friction.",
      },
      {
        title: "Cloud sync",
        benefit: "Pick up where you left off across devices.",
      },
      {
        title: "Mobile friendly",
        benefit: "Use it while visiting homes, not only at your desk.",
      },
    ],
  },
  roadmap: {
    title: "Coming Soon",
    description: "More tools to make shared decisions even easier.",
    badge: "Coming Soon",
    items: [
      "Partner collaboration",
      "Import from Idealista",
      "Import from Fotocasa",
      "Photo uploads",
      "AI recommendations",
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        question: "Why not just use Excel?",
        answer:
          "Excel stores data, but ComparaCasa is built for home visits with weighted scoring, structured notes, and automatic ranking.",
      },
      {
        question: "Is it free?",
        answer: "Yes. You can start for free and begin comparing homes right away.",
      },
      {
        question: "Do I need an account?",
        answer: "No. You can start in guest mode and create an account later.",
      },
      {
        question: "Can I use it on my phone?",
        answer: "Yes. The app is fully responsive and designed for use during visits.",
      },
      {
        question: "Can I compare apartments too?",
        answer: "Absolutely. It works for houses, flats, and rental properties.",
      },
      {
        question: "How many properties can I add?",
        answer: "Add as many as you need while searching for your next home.",
      },
    ],
  },
  finalCta: {
    title: "Don’t choose your next home based on memory.",
    description: "Know which option fits you best, then decide with confidence.",
    button: "Get started",
  },
};

const es: LandingCopy = {
  badge: "Hecho para decisiones reales de vivienda",
  hero: {
    title: "Sabe qué vivienda encaja mejor contigo antes de decidir.",
    description:
      "Guarda notas, puntúa cada visita, compara propiedades lado a lado y ordénalas con criterios ponderados para tomar una decisión clara y segura.",
    primaryCta: "Empezar",
    secondaryCta: "Ver cómo funciona",
    audience:
      "Para compradores primerizos, parejas, familias e inquilinos comparando varias viviendas.",
  },
  problem: {
    title: "Después de varias visitas, todas las viviendas se parecen.",
    description:
      "Sales de una casa y ya dudas de lo que viste en la anterior.",
    questions: [
      "¿Cuál tenía la cocina más amplia?",
      "¿Cuál tenía mejor luz natural?",
      "¿Cuál tenía aparcamiento?",
      "¿Cuál era más silenciosa?",
    ],
    failsLabel: "Cuando la decisión es importante, estos sistemas fallan:",
    fails: ["Notas", "Hojas de cálculo", "Memoria"],
    solutionLine:
      "ComparaCasa te da un lugar estructurado para evaluar cada vivienda según lo que de verdad te importa.",
  },
  solution: {
    title: "Un flujo simple para decidir mejor",
    description:
      "Define lo importante, evalúa cada visita en caliente y compara opciones de forma objetiva.",
    cards: [
      {
        title: "Define lo que importa",
        description:
          "Crea tus propios criterios y asigna el peso según su importancia.",
        bullets: ["Ubicación", "Jardín", "Aparcamiento", "Luz natural", "Barrio", "Precio"],
      },
      {
        title: "Evalúa cada visita",
        description:
          "Puntúa cada vivienda del 0 al 10 y guarda el contexto mientras está fresco.",
        bullets: ["Notas", "Pros y contras", "Checklist", "Enlaces del anuncio"],
      },
      {
        title: "Compara objetivamente",
        description:
          "La puntuación ponderada automática ordena cada opción para elegir con confianza.",
        bullets: ["Ranking automático", "Vista lado a lado", "Ganador claro"],
      },
    ],
  },
  walkthrough: {
    title: "Mira el flujo completo en minutos",
    description:
      "Desde la configuración hasta el ranking final, cada paso es rápido y claro en ordenador o móvil.",
    steps: [
      {
        title: "Crea tus criterios",
        description: "Define qué te importa y cuánto pesa cada cosa.",
        caption: "Creación de criterios",
        placeholder: true,
        kind: "criteria",
      },
      {
        title: "Guarda cada visita",
        description:
          "Añade puntuaciones, notas, checklist y pros/contras antes de olvidar detalles.",
        caption: "Detalle de vivienda",
        placeholder: true,
        kind: "house",
      },
      {
        title: "Compara todas las opciones",
        description:
          "Las puntuaciones ponderadas se actualizan automáticamente y muestran las mejores opciones.",
        caption: "Página de comparación",
        placeholder: false,
        kind: "comparison",
      },
      {
        title: "Visualiza ubicaciones en un mapa",
        description:
          "Mantén una vista global de zonas y desplazamientos sin cambiar de herramienta.",
        caption: "Mapa del panel",
        placeholder: true,
        kind: "map",
      },
    ],
  },
  notesVsExcel: {
    title: "Por qué es mejor que notas o Excel",
    description:
      "Una hoja de cálculo guarda datos, pero no guía decisiones reales durante visitas.",
    left: "Notas / Excel",
    right: "ComparaCasa",
    rows: [
      { label: "Configuración", left: "Manual cada vez", right: "Estructura reutilizable" },
      { label: "Puntuación", left: "Fórmulas manuales", right: "Puntuación ponderada automática" },
      { label: "Notas", left: "Desordenadas", right: "Evaluación estructurada" },
      { label: "Ranking", left: "Sin ranking claro", right: "Ranking automático" },
      { label: "Comparación", left: "Difícil de leer", right: "Comparación lado a lado" },
      { label: "Uso móvil", left: "Incómodo", right: "Diseñado para visitas" },
    ],
  },
  highlights: {
    title: "Todo lo que necesitas para decidir con seguridad",
    description:
      "Cada función está pensada para reducir dudas y mantener decisiones objetivas.",
    items: [
      {
        title: "Puntuación ponderada",
        benefit: "Decide según lo que más valoras, no con una nota genérica.",
      },
      {
        title: "Comparación lado a lado",
        benefit: "Ve todas las opciones juntas y detecta concesiones rápido.",
      },
      {
        title: "Criterios personalizados",
        benefit: "Evalúa viviendas con tus prioridades reales.",
      },
      {
        title: "Pros y contras",
        benefit: "Equilibra impresiones emocionales en cada vivienda.",
      },
      {
        title: "Checklist",
        benefit: "Comprueba siempre los mismos detalles prácticos.",
      },
      {
        title: "Notas",
        benefit: "Guarda contexto que después olvidarías.",
      },
      {
        title: "Mapa interactivo",
        benefit: "Compara impacto de ubicación sin saltar entre pestañas.",
      },
      {
        title: "Enlaces del anuncio",
        benefit: "Abre cada anuncio al instante para revisar información.",
      },
      {
        title: "Modo invitado",
        benefit: "Empieza al momento sin crear cuenta.",
      },
      {
        title: "Sincronización en la nube",
        benefit: "Continúa desde cualquier dispositivo.",
      },
      {
        title: "Diseño móvil",
        benefit: "Úsalo durante visitas, no solo en escritorio.",
      },
    ],
  },
  roadmap: {
    title: "Próximamente",
    description: "Más herramientas para decidir en equipo con más claridad.",
    badge: "Próximamente",
    items: [
      "Colaboración en pareja",
      "Importar desde Idealista",
      "Importar desde Fotocasa",
      "Subida de fotos",
      "Recomendaciones con IA",
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Por qué no usar Excel?",
        answer:
          "Excel guarda datos, pero ComparaCasa está hecho para visitas: puntuación ponderada, notas estructuradas y ranking automático.",
      },
      {
        question: "¿Es gratis?",
        answer: "Sí. Puedes empezar gratis y comparar viviendas desde ahora.",
      },
      {
        question: "¿Necesito una cuenta?",
        answer: "No. Puedes empezar como invitado y crear cuenta más tarde.",
      },
      {
        question: "¿Puedo usarlo en el móvil?",
        answer: "Sí. Es totalmente responsive y pensado para usarlo en visitas.",
      },
      {
        question: "¿Sirve también para pisos?",
        answer: "Sí. Funciona para casas, pisos y alquileres.",
      },
      {
        question: "¿Cuántas propiedades puedo añadir?",
        answer: "Puedes añadir todas las que necesites durante tu búsqueda.",
      },
    ],
  },
  finalCta: {
    title: "No elijas tu próxima vivienda por memoria.",
    description: "Descubre cuál encaja mejor contigo y decide con confianza.",
    button: "Empezar",
  },
};

export function getLandingCopy(locale: Locale): LandingCopy {
  return locale === "es" ? es : en;
}

export type { LandingCopy };
