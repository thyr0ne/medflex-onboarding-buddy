export type Einrichtungstyp = 'Praxis' | 'MVZ' | 'Klinikum' | 'Sonstige';

export interface OnboardingData {
  // Step 1: Allgemeine Informationen
  einrichtungstyp: Einrichtungstyp;
  einrichtungsName: string;
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
  einrichtungstyp: 'Praxis',
  einrichtungsName: '',
  fachbereich: '',
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
  notfallSchlagwoerter: ['Starke Schmerzen', 'Unfall', 'Akuter Notfall'],
  notfallTelefon: '',
  
  terminarten: [],
  terminRegeln: '',
  terminDatenerfassung: ['Terminwunsch', 'Behandler', 'Grund für Termin'],
  rezeptVerfuegbar: ['Stammpatienten'],
  rezeptRegeln: '',
  befundVerfuegbar: ['Stammpatienten', 'Vertreter'],
  sonstigesAnliegen: true,
  
  adresse: '',
  oeffnungszeiten: '',
  parkhinweise: '',
  behandlerListe: '',
  leistungen: '',
  besonderheiten: '',
};

export const MLFX_VERSION = '1.0';

export interface MlfxFile {
  version: string;
  exportedAt: string;
  data: OnboardingData;
}
