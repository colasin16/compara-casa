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
		compare: "Compare",
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
			"Sign in with your email, or jump straight in as a guest. Your houses and criteria are saved to your account.",
		email: "Email",
		emailPlaceholder: "you@example.com",
		password: "Password",
		passwordPlaceholder: "At least 6 characters",
		signIn: "Sign in",
		signUp: "Sign up",
		createAccount: "Create account",
		confirmPassword: "Confirm password",
		confirmPasswordPlaceholder: "Re-enter your password",
		forgotPassword: "Forgot your password?",
		emailSent:
			"Check your inbox — we've sent you a link to confirm your email and finish signing up.",
		or: "or",
		continueAsGuest: "Continue as guest",
		forgotPasswordTitle: "Reset your password",
		forgotPasswordDescription:
			"Enter the email for your account and we'll send you a link to set a new password.",
		sendResetLink: "Send reset link",
		resetEmailSent:
			"If an account exists for that email, we've sent a link to reset your password. Check your inbox.",
		backToSignIn: "Back to sign in",
		updatePasswordTitle: "Set a new password",
		updatePasswordDescription:
			"Choose a new password for your account. You'll be signed in once it's saved.",
		newPassword: "New password",
		savePassword: "Save password",
	},
	dashboard: {
		title: "Your houses",
		subtitle:
			"Ranked by their weighted score. Open a house to rate it against your criteria.",
		emptyTitle: "No houses yet",
		emptyBodyBefore:
			"Add your first house using the form, then open it to score each criterion. Make sure you've set up your ",
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
		back: "Back to houses",
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
		noCriteriaBefore:
			"You haven't defined any criteria yet. Add some on the ",
		noCriteriaLink: "Criteria",
		noCriteriaAfter: " page first, then come back to score this house.",
		finalScore: "Weighted final score",
		criteriaRated: "{rated} of {total} criteria rated",
		weight: "weight {weight}",
	},
	prosCons: {
		sectionTitle: "Positives vs. negatives",
		sectionDescription:
			"Note what counts for or against this house. Use the switch button to move a line to the other list.",
		prosTitle: "Positives",
		prosDescription: "Things that count in this house's favour.",
		prosPlaceholder: "Add a positive…",
		consTitle: "Negatives",
		consDescription: "Things that count against this house.",
		consPlaceholder: "Add a negative…",
		itemLabel: "{label} item {index}",
		addItemLabel: "Add {label} item",
		moveToPros: "Move to positives",
		moveToCons: "Move to negatives",
		remove: "Remove",
		empty: "Nothing yet — add a line below.",
		saveError: "Could not save: {error}",
	},
	houseNotes: {
		sectionTitle: "Notes",
		sectionDescription:
			"Jot down anything you want to remember about this house that doesn't fit elsewhere.",
		placeholder: "Add a note…",
		addNoteLabel: "Add note",
		itemLabel: "Note {index}",
		moveUp: "Move up",
		moveDown: "Move down",
		remove: "Remove",
		empty: "No notes yet — add one below.",
		saveError: "Could not save: {error}",
	},
	compare: {
		title: "Compare houses",
		subtitle:
			"Side-by-side view of every house scored against each criterion. The best score in each row is highlighted.",
		criterionColumn: "Criterion",
		weightColumn: "Weight",
		finalScore: "Final score",
		unrated: "—",
		emptyTitle: "Nothing to compare yet",
		emptyBodyBefore: "Add at least one house and rate it against your ",
		emptyBodyLink: "criteria",
		emptyBodyAfter: " to see a comparison here.",
		scoresTitle: "Scores",
		positivesTitle: "Positives",
		positivesSubtitle: "What counts in each house's favour.",
		negativesTitle: "Negatives",
		negativesSubtitle: "What counts against each house.",
		notesTitle: "Notes",
		notesSubtitle: "Anything else worth remembering about each house.",
		noPoints: "—",
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
		compare: "Comparar",
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
			"Inicia sesión con tu email o entra directamente como invitado. Tus casas y criterios se guardan en tu cuenta.",
		email: "Email",
		emailPlaceholder: "tu@ejemplo.com",
		password: "Contraseña",
		passwordPlaceholder: "Al menos 6 caracteres",
		signIn: "Iniciar sesión",
		signUp: "Registrarse",
		createAccount: "Crear cuenta",
		confirmPassword: "Confirmar contraseña",
		confirmPasswordPlaceholder: "Vuelve a escribir tu contraseña",
		forgotPassword: "¿Olvidaste tu contraseña?",
		emailSent:
			"Revisa tu correo — te hemos enviado un enlace para confirmar tu email y terminar el registro.",
		or: "o",
		continueAsGuest: "Continuar como invitado",
		forgotPasswordTitle: "Restablece tu contraseña",
		forgotPasswordDescription:
			"Introduce el email de tu cuenta y te enviaremos un enlace para crear una nueva contraseña.",
		sendResetLink: "Enviar enlace",
		resetEmailSent:
			"Si existe una cuenta con ese email, te hemos enviado un enlace para restablecer tu contraseña. Revisa tu correo.",
		backToSignIn: "Volver a iniciar sesión",
		updatePasswordTitle: "Crea una nueva contraseña",
		updatePasswordDescription:
			"Elige una nueva contraseña para tu cuenta. Iniciarás sesión en cuanto se guarde.",
		newPassword: "Nueva contraseña",
		savePassword: "Guardar contraseña",
	},
	dashboard: {
		title: "Tus casas",
		subtitle:
			"Ordenadas por su puntuación ponderada. Abre una casa para puntuarla según tus criterios.",
		emptyTitle: "Aún no hay casas",
		emptyBodyBefore:
			"Añade tu primera casa con el formulario y luego ábrela para puntuar cada criterio. Asegúrate de haber configurado tus ",
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
		back: "Volver a las casas",
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
		noCriteriaBefore:
			"Aún no has definido ningún criterio. Añade algunos en la página de ",
		noCriteriaLink: "Criterios",
		noCriteriaAfter: " primero y luego vuelve para puntuar esta casa.",
		finalScore: "Puntuación final ponderada",
		criteriaRated: "{rated} de {total} criterios puntuados",
		weight: "peso {weight}",
	},
	prosCons: {
		sectionTitle: "Puntos positivos y negativos",
		sectionDescription:
			"Anota lo que cuenta a favor o en contra de esta casa. Usa el botón de cambio para mover una línea a la otra lista.",
		prosTitle: "Positivos",
		prosDescription: "Cosas que juegan a favor de esta casa.",
		prosPlaceholder: "Añadir un punto positivo…",
		consTitle: "Negativos",
		consDescription: "Cosas que juegan en contra de esta casa.",
		consPlaceholder: "Añadir un punto negativo…",
		itemLabel: "{label}: elemento {index}",
		addItemLabel: "Añadir elemento a {label}",
		moveToPros: "Mover a puntos positivos",
		moveToCons: "Mover a puntos negativos",
		remove: "Eliminar",
		empty: "Nada todavía — añade una línea abajo.",
		saveError: "No se pudo guardar: {error}",
	},
	houseNotes: {
		sectionTitle: "Notas",
		sectionDescription:
			"Apunta cualquier cosa que quieras recordar sobre esta casa y que no encaje en otro sitio.",
		placeholder: "Añadir una nota…",
		addNoteLabel: "Añadir nota",
		itemLabel: "Nota {index}",
		moveUp: "Subir",
		moveDown: "Bajar",
		remove: "Eliminar",
		empty: "Aún no hay notas — añade una abajo.",
		saveError: "No se pudo guardar: {error}",
	},
	compare: {
		title: "Comparar casas",
		subtitle:
			"Vista comparativa de cada casa puntuada según cada criterio. La mejor puntuación de cada fila aparece resaltada.",
		criterionColumn: "Criterio",
		weightColumn: "Peso",
		finalScore: "Puntuación final",
		unrated: "—",
		emptyTitle: "Nada que comparar todavía",
		emptyBodyBefore: "Añade al menos una casa y puntúala según tus ",
		emptyBodyLink: "criterios",
		emptyBodyAfter: " para ver una comparativa aquí.",
		scoresTitle: "Puntuaciones",
		positivesTitle: "Positivos",
		positivesSubtitle: "Lo que juega a favor de cada casa.",
		negativesTitle: "Negativos",
		negativesSubtitle: "Lo que juega en contra de cada casa.",
		notesTitle: "Notas",
		notesSubtitle:
			"Cualquier otra cosa que valga la pena recordar de cada casa.",
		noPoints: "—",
	},
};

export const dictionaries: Record<Locale, Dictionary> = { en, es };
