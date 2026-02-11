export type Einrichtungstyp = 'Praxis' | 'MVZ' | 'Klinikum' | 'Sonstige';

export interface OnboardingData {
  // Step 1: Allgemeine Informationen
  einrichtungstyp: Einrichtungstyp;
  einrichtungsName: string;
  fachbereich: string;
  telefonnummer: string;
  sprachen: string[];
  stimme: string;
  
  // Step 2: Datenschutz & Anrufer-Typen
  datenschutzWebsite: boolean;
  datenschutzAnsage: boolean;
  begruessung: string;
  hinweis112: boolean;
  
  // Patientenaufnahme
  neupatientenAufnahme: boolean;
  neupatientenRegeln: string;
  versicherungsarten: string[];
  patientendatenFelder: string[];
  vertreterdatenErfassen: boolean;
  
  // Zuweiser
  zuweiserDurchstellen: boolean;
  zuweiserTelefon: string;
  
  // Rückrufer
  rueckruferHandling: boolean;
  rueckruferTelefon: string;
  
  // BG-Fall / Arbeitsunfälle
  bgFallHandling: boolean;
  bgFallHinweis: string;
  
  // Step 3: Notfallbearbeitung
  notfaelleIntern: boolean;
  notfallSchlagwoerter: string[];
  notfallTelefon: string;
  notfallDatenerfassung: string[];
  akutsprechstunde: boolean;
  
  // Step 4: Anfragetypen
  // Terminvereinbarung
  terminarten: string[];
  terminRegeln: string;
  terminDatenerfassung: string[];
  onlineBuchungHinweis: string;
  
  // Termin absagen/ändern
  terminAbsage: boolean;
  terminAbsageRegeln: string;
  
  // Rezept
  rezeptVerfuegbar: string[];
  rezeptRegeln: string;
  rezeptDatenerfassung: string[];
  rezeptAbholung: string;
  
  // Befund
  befundVerfuegbar: string[];
  befundRegeln: string;
  befundDatenerfassung: string[];
  
  // Überweisung
  ueberweisung: boolean;
  ueberweisungRegeln: string;
  
  // AU / Krankschreibung
  auKrankschreibung: boolean;
  auRegeln: string;
  
  // Sonstiges
  sonstigesAnliegen: boolean;
  
  // Weiterleitung bei persönlichem Gespräch
  weiterleitungBeiGespraech: boolean;
  weiterleitungTelefon: string;
  
  // Step 5: Knowledge Base
  adresse: string;
  anfahrt: string;
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
  neupatientenRegeln: '',
  versicherungsarten: ['Gesetzlich', 'Privat', 'Selbstzahler'],
  patientendatenFelder: ['Vor- und Nachname', 'Geburtsdatum', 'Bestands-/Neupatient', 'Handynummer'],
  vertreterdatenErfassen: true,
  
  zuweiserDurchstellen: true,
  zuweiserTelefon: '',
  
  rueckruferHandling: false,
  rueckruferTelefon: '',
  
  bgFallHandling: false,
  bgFallHinweis: '',
  
  notfaelleIntern: true,
  notfallSchlagwoerter: ['Notfall', 'Akute Beschwerden'],
  notfallTelefon: '',
  notfallDatenerfassung: [],
  akutsprechstunde: false,
  
  terminarten: [],
  terminRegeln: '',
  terminDatenerfassung: ['Terminwunsch', 'Behandler', 'Grund für Termin'],
  onlineBuchungHinweis: '',
  
  terminAbsage: true,
  terminAbsageRegeln: '',
  
  rezeptVerfuegbar: ['Stammpatienten'],
  rezeptRegeln: '',
  rezeptDatenerfassung: ['Medikamentenname', 'Wirkstärke/Dosierung'],
  rezeptAbholung: '',
  
  befundVerfuegbar: ['Stammpatienten', 'Vertreter'],
  befundRegeln: '',
  befundDatenerfassung: ['Welcher Befund', 'Gewünschter Zustellweg'],
  
  ueberweisung: false,
  ueberweisungRegeln: '',
  
  auKrankschreibung: false,
  auRegeln: '',
  
  sonstigesAnliegen: true,
  
  weiterleitungBeiGespraech: false,
  weiterleitungTelefon: '',
  
  adresse: '',
  anfahrt: '',
  oeffnungszeiten: '',
  parkhinweise: '',
  behandlerListe: '',
  leistungen: '',
  besonderheiten: '',
};

export const MLFX_VERSION = '1.1';

export interface MlfxFile {
  version: string;
  exportedAt: string;
  data: OnboardingData;
}
