import type { Locale } from "./config";

export const en = {
	metadata: {
		title: "ComparaCasa — Compare houses & flats with weighted criteria",
		description:
			"Compare houses and flats side by side. Score each on weighted criteria that matter to you — location, condition, parking, light — with a checklist and pros & cons.",
		keywords: [
			"compare houses",
			"house comparison tool",
			"compare apartments",
			"compare flats",
			"house hunting checklist",
			"home buying decision matrix",
			"weighted scoring",
			"rate houses",
			"side-by-side house comparison",
			"decide between houses",
		],
		ogImageAlt: "ComparaCasa — compare houses and flats with weighted criteria",
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
		checklist: "Features",
		compare: "Compare",
		guest: "Guest {id}",
		signOut: "Sign out",
		logIn: "Log in",
		selectLanguage: "Select language",
		toggleTheme: "Toggle theme",
		navigation: "Navigation",
		account: "Account",
		openMenu: "Open menu",
		closeMenu: "Close menu",
		collapseSidebar: "Collapse sidebar",
		expandSidebar: "Expand sidebar",
	},
	home: {
		badge: "ComparaCasa",
		titleLead: "Compare houses and flats and",
		titleHighlight: "decide with confidence",
		description:
			"Score every house on the criteria that matter to you — location, condition, parking, light — then compare them side by side with a checklist and pros & cons to decide with confidence.",
		getStarted: "Get started",
		logIn: "Log in",
		howItWorks: {
			title: "How it works",
			step1Title: "Define your criteria",
			step1Desc:
				"Choose what matters — location, condition, parking, light — and weight each one by importance.",
			step2Title: "Score each house",
			step2Desc:
				"Rate every house and flat against your criteria and tick off your checklist of must-have features.",
			step3Title: "Compare and decide",
			step3Desc:
				"See houses ranked by weighted score, side by side with pros & cons, and pick with confidence.",
		},
		features: {
			title: "Everything you need to choose a home",
			weightedTitle: "Weighted criteria",
			weightedDesc:
				"Build your own decision matrix so the criteria you value most drive the final score.",
			checklistTitle: "House-hunting checklist",
			checklistDesc:
				"Reuse one checklist across every visit and tick which features each house actually has.",
			prosConsTitle: "Pros & cons",
			prosConsDesc:
				"Capture the positives and negatives of each house while the details are still fresh.",
			compareTitle: "Side-by-side comparison",
			compareDesc:
				"Compare houses and flats in one table, ranked by the score that matters to you.",
		},
		faq: {
			title: "Frequently asked questions",
			q1: "How do I decide between two houses?",
			a1: "List the criteria that matter to you, weight each by importance, score both houses, and ComparaCasa ranks them so the right choice is clear.",
			q2: "What criteria should I compare?",
			a2: "Common ones are location, condition, price, parking, terrace and natural light — but you define your own and weight them however you like.",
			q3: "Is ComparaCasa free to use?",
			a3: "Yes. Create an account or continue as a guest, add your houses and start comparing right away.",
		},
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
	checklist: {
		title: "Your features",
		subtitle:
			"Define the features you want to verify on every house. The same list is reused so you can tick off what each house actually has.",
		loadError: "Couldn't load features: {message}",
		emptyTitle: "No features yet",
		emptyBody:
			"Start from a common set of features to check when house-hunting, then tweak the list to match what matters to you.",
		addStarter: "Add starter features",
		addItem: "Add an item",
	},
	houseDetail: {
		back: "Back to houses",
		deleteHouse: "Delete this house",
		deleteConfirmTitle: "Delete this house?",
		deleteConfirmDescription:
			"This will permanently delete this house and all of its ratings, notes and checklist progress. This action cannot be undone.",
		deleteConfirm: "Delete house",
	},
	houseForm: {
		name: "Name",
		namePlaceholder: "e.g. Sunny flat on Main St",
		price: "Price",
		pricePlaceholder: "e.g. 250000",
		currency: "Currency",
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
	checklistItemForm: {
		name: "Name",
		namePlaceholder: "e.g. Lift, Storage room, Parking…",
		add: "Add item",
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
	houseChecklist: {
		sectionTitle: "Features",
		sectionDescription:
			"Tick the items this house actually has. The list is shared across every house.",
		noItemsBefore:
			"You haven't defined any features yet. Add some on the ",
		noItemsLink: "Features",
		noItemsAfter: " page first, then come back to tick what this house has.",
		checkedCount: "{checked} of {total} items checked",
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
		priceTitle: "Price",
		scoresTitle: "Scores",
		featuresTitle: "Features",
		featuresSubtitle:
			"Which features each house actually has, side by side.",
		featureColumn: "Feature",
		featureHas: "Has it",
		featureMissing: "Doesn't have it",
		featuresEmptyBefore: "You haven't defined any features yet. Add some on the ",
		featuresEmptyLink: "Features",
		featuresEmptyAfter: " page to compare them here.",
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
		title: "ComparaCasa — Compara pisos y casas con criterios ponderados",
		description:
			"Compara pisos y casas en paralelo. Puntúa cada uno con criterios ponderados — ubicación, estado, aparcamiento, luz — con checklist y pros y contras.",
		keywords: [
			"comparar pisos",
			"comparador de pisos",
			"comparador de casas",
			"cómo elegir entre varios pisos",
			"tabla para comparar viviendas",
			"puntuar pisos para comprar",
			"checklist para visitar pisos",
			"criterios para comparar casas",
			"comparar casas en paralelo",
			"comparar viviendas",
		],
		ogImageAlt: "ComparaCasa — compara pisos y casas con criterios ponderados",
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
		checklist: "Características",
		compare: "Comparar",
		guest: "Invitado {id}",
		signOut: "Cerrar sesión",
		logIn: "Iniciar sesión",
		selectLanguage: "Seleccionar idioma",
		toggleTheme: "Cambiar tema",
		navigation: "Navegación",
		account: "Cuenta",
		openMenu: "Abrir menú",
		closeMenu: "Cerrar menú",
		collapseSidebar: "Contraer barra lateral",
		expandSidebar: "Expandir barra lateral",
	},
	home: {
		badge: "ComparaCasa",
		titleLead: "Compara pisos y casas y",
		titleHighlight: "decide con confianza",
		description:
			"Puntúa cada vivienda con los criterios que te importan — ubicación, estado, aparcamiento, luz — y compáralas en paralelo con checklist y pros y contras para decidir con confianza.",
		getStarted: "Empezar",
		logIn: "Iniciar sesión",
		howItWorks: {
			title: "Cómo funciona",
			step1Title: "Define tus criterios",
			step1Desc:
				"Elige lo que importa — ubicación, estado, aparcamiento, luz — y dale un peso a cada uno según su importancia.",
			step2Title: "Puntúa cada casa",
			step2Desc:
				"Valora cada piso y casa según tus criterios y marca las características imprescindibles de tu checklist.",
			step3Title: "Compara y decide",
			step3Desc:
				"Verás las casas ordenadas por puntuación ponderada, en paralelo con pros y contras, para elegir con confianza.",
		},
		features: {
			title: "Todo lo que necesitas para elegir vivienda",
			weightedTitle: "Criterios ponderados",
			weightedDesc:
				"Crea tu propia matriz de decisión para que los criterios que más valoras marquen la puntuación final.",
			checklistTitle: "Checklist para visitas",
			checklistDesc:
				"Reutiliza una misma checklist en cada visita y marca qué características tiene realmente cada casa.",
			prosConsTitle: "Pros y contras",
			prosConsDesc:
				"Anota lo positivo y lo negativo de cada casa mientras tienes los detalles frescos.",
			compareTitle: "Comparación en paralelo",
			compareDesc:
				"Compara pisos y casas en una sola tabla, ordenados por la puntuación que te importa.",
		},
		faq: {
			title: "Preguntas frecuentes",
			q1: "¿Cómo decido entre dos casas?",
			a1: "Enumera los criterios que te importan, dale un peso a cada uno, puntúa ambas casas y ComparaCasa las ordena para que la mejor opción quede clara.",
			q2: "¿Qué criterios debería comparar?",
			a2: "Los más habituales son ubicación, estado, precio, aparcamiento, terraza y luz natural, pero defines los tuyos y los ponderas como quieras.",
			q3: "¿ComparaCasa es gratis?",
			a3: "Sí. Crea una cuenta o entra como invitado, añade tus casas y empieza a comparar al momento.",
		},
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
	checklist: {
		title: "Tus características",
		subtitle:
			"Define las características que quieres verificar en cada casa. La misma lista se reutiliza para marcar lo que cada casa tiene de verdad.",
		loadError: "No se pudieron cargar las características: {message}",
		emptyTitle: "Aún no hay características",
		emptyBody:
			"Empieza con un conjunto habitual de características a comprobar al buscar casa y luego ajusta la lista a lo que más te importa.",
		addStarter: "Añadir características iniciales",
		addItem: "Añadir un elemento",
	},
	houseDetail: {
		back: "Volver a las casas",
		deleteHouse: "Eliminar esta casa",
		deleteConfirmTitle: "¿Eliminar esta casa?",
		deleteConfirmDescription:
			"Esto eliminará permanentemente esta casa y todas sus valoraciones, notas y progreso de la lista de comprobación. Esta acción no se puede deshacer.",
		deleteConfirm: "Eliminar casa",
	},
	houseForm: {
		name: "Nombre",
		namePlaceholder: "p. ej. Piso luminoso en la calle Mayor",
		price: "Precio",
		pricePlaceholder: "p. ej. 250000",
		currency: "Moneda",
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
	checklistItemForm: {
		name: "Nombre",
		namePlaceholder: "p. ej. Ascensor, Trastero, Garaje…",
		add: "Añadir elemento",
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
	houseChecklist: {
		sectionTitle: "Características",
		sectionDescription:
			"Marca los elementos que esta casa tiene de verdad. La lista es la misma para todas las casas.",
		noItemsBefore:
			"Aún no has definido ninguna característica. Añade algunas en la página de ",
		noItemsLink: "Características",
		noItemsAfter: " primero y luego vuelve para marcar lo que tiene esta casa.",
		checkedCount: "{checked} de {total} elementos marcados",
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
		priceTitle: "Precio",
		scoresTitle: "Puntuaciones",
		featuresTitle: "Características",
		featuresSubtitle:
			"Qué características tiene de verdad cada casa, una al lado de la otra.",
		featureColumn: "Característica",
		featureHas: "La tiene",
		featureMissing: "No la tiene",
		featuresEmptyBefore:
			"Aún no has definido ninguna característica. Añade algunas en la página de ",
		featuresEmptyLink: "Características",
		featuresEmptyAfter: " para compararlas aquí.",
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
