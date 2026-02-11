export interface OnboardingData {
  // Step 1: Allgemeine Informationen
  praxisName: string;
  fachbereich: string;
  telefonnummer: string;
  sprachen: string[];
  stimme: string;
  
  // Step 2: Datenschutz & Begrüßung
  datenschutzWebsite: boolean;
  datenschutzAnsage: boolean;
  begruessung: string;
  hinweis112: boolean;
  
  // Step 3: Anrufer-Typen
  neupatientenAufnahme: boolean;
  versicherungsarten: string[];
  vertreterdatenErfassen: boolean;
  zuweiserDurchstellen: boolean;
  zuweiserTelefon: string;
  
  // Step 4: Notfallbearbeitung
  notfaelleIntern: boolean;
  notfallSchlagwoerter: string[];
  notfallTelefon: string;
  
  // Step 5: Anfragetypen
  terminarten: string[];
  terminRegeln: string;
  terminDatenerfassung: string[];
  rezeptVerfuegbar: string[];
  rezeptRegeln: string;
  befundVerfuegbar: string[];
  sonstigesAnliegen: boolean;
  
  // Step 6: Knowledge Base
  adresse: string;
  oeffnungszeiten: string;
  parkhinweise: string;
  behandlerListe: string;
  leistungen: string;
  besonderheiten: string;
}

export const defaultOnboardingData: OnboardingData = {
  praxisName: '',
  fachbereich: 'Zahnmedizin',
  telefonnummer: '',
  sprachen: ['Deutsch'],
  stimme: 'weiblich',
  
  datenschutzWebsite: true,
  datenschutzAnsage: false,
  begruessung: '',
  hinweis112: true,
  
  neupatientenAufnahme: true,
  versicherungsarten: ['Gesetzlich', 'Privat', 'Selbstzahler'],
  vertreterdatenErfassen: true,
  zuweiserDurchstellen: true,
  zuweiserTelefon: '',
  
  notfaelleIntern: true,
  notfallSchlagwoerter: [
    'Zahnersatz kaputt',
    'Zahn abgebrochen',
    'Füllung rausgefallen',
    'Dicke Backe',
    'Krone rausgefallen',
    'Starke Schmerzen',
    'Unfall',
  ],
  notfallTelefon: '',
  
  terminarten: [],
  terminRegeln: '',
  terminDatenerfassung: ['Terminwunsch', 'Behandler', 'Grund für Termin'],
  rezeptVerfuegbar: ['Stammpatienten'],
  rezeptRegeln: 'Medikament muss schon mal von der Praxis verordnet worden sein',
  befundVerfuegbar: ['Stammpatienten', 'Vertreter'],
  sonstigesAnliegen: true,
  
  adresse: '',
  oeffnungszeiten: '',
  parkhinweise: '',
  behandlerListe: '',
  leistungen: '',
  besonderheiten: '',
};
