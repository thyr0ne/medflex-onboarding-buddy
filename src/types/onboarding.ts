export type Einrichtungstyp = 'Praxis' | 'MVZ' | 'Klinikum' | 'Andere';

export interface OnboardingData {
  // Step 1: Allgemeine Informationen
  einrichtungstyp: Einrichtungstyp;
  einrichtungstypAndere: string;
  einrichtungsName: string;
  fachbereich: string;
  leistungsspektrum: string;
  hauptrufnummer: string;
  durchwahlMedflex: string;
  telefonnummer: string;
  sprachen: string[];
  stimme: string;
  
  // Step 2: Datenschutz & Anrufer-Typen
  begruessung: string;
  datenschutzWebsite: boolean;
  datenschutzAnsage: boolean;
  hinweis112: boolean;
  
  // Patientenaufnahme
  neupatientenAufnahme: boolean;
  neupatientenRegeln: string;
  versicherungsarten: string[];
  patientendatenFelder: string[];
  prioTags: string[];
  
  // Vertreter
  vertreterHandling: boolean;
  vertreterDatenerfassung: string[];
  
  // Zuweiser
  zuweiserDurchstellen: boolean;
  zuweiserTelefon: string;
  zuweiserDatenerfassung: string[];
  
  // Rückrufer
  rueckruferHandling: boolean;
  rueckruferDurchstellen: boolean;
  rueckruferTelefon: string;
  rueckruferDatenerfassung: string[];
  
  // BG-Fall / Arbeitsunfälle (bei Versicherung)
  bgFallHandling: boolean;
  bgFallHinweis: string;
  
  // Step 3: Notfallbearbeitung
  notfaelleIntern: boolean;
  notfallSchlagwoerter: string[];
  notfallTelefon: string;
  notfallDatenerfassung: string[];
  akutsprechstunde: boolean;
  
  // Step 4: Terminmanagement
  terminAnfrage: boolean;
  terminAnfrageAlternative: string;
  terminarten: string[];
  terminVerfuegbarFuer: string[];
  terminRegeln: string;
  terminDatenerfassung: string[];
  terminGespraechsabschluss: string;
  terminTags: string[];
  onlineBuchungHinweis: string;
  
  terminAbsage: boolean;
  terminAbsageAlternative: string;
  terminAbsageRegeln: string;
  terminAbsageDatenerfassung: string[];
  terminAbsageGespraechsabschluss: string;
  terminAbsageTags: string[];
  
  // Step 5: Dokumente & Weiteres
  // Rezept
  rezeptAnfrage: boolean;
  rezeptAlternative: string;
  rezeptVerfuegbar: string[];
  rezeptRegeln: string;
  rezeptDatenerfassung: string[];
  rezeptZustellung: string;
  rezeptGespraechsabschluss: string;
  rezeptTags: string[];
  
  // Befund
  befundAnfrage: boolean;
  befundAlternative: string;
  befundVerfuegbar: string[];
  befundRegeln: string;
  befundDatenerfassung: string[];
  befundGespraechsabschluss: string;
  befundTags: string[];
  
  // Überweisung
  ueberweisung: boolean;
  ueberweisungAlternative: string;
  ueberweisungVerfuegbar: string[];
  ueberweisungRegeln: string;
  ueberweisungDatenerfassung: string[];
  ueberweisungZustellung: string;
  ueberweisungGespraechsabschluss: string;
  ueberweisungTags: string[];
  
  // AU / Krankschreibung
  auKrankschreibung: boolean;
  auAlternative: string;
  auRegeln: string;
  auDatenerfassung: string[];
  auGespraechsabschluss: string;
  auTags: string[];
  
  // Weitere Anliegen (erweiterbar)
  weitereAnliegen: WeitereAnliegenItem[];
  
  // Sonstiges
  sonstigesAnliegen: boolean;
  sonstigesGespraechsabschluss: string;
  
  // Weiterleitung bei persönlichem Gespräch
  weiterleitungBeiGespraech: boolean;
  weiterleitungTelefon: string;
  weiterleitungRegeln: string;
  
  // Step 6: Knowledge Base
  adresse: string;
  anfahrt: string;
  oeffnungszeiten: string;
  parkhinweise: string;
  behandlerListe: string;
  leistungen: string;
  besonderheiten: string;

  // Kommentare (intern)
  comments: Record<string, string>;
}

export interface WeitereAnliegenItem {
  name: string;
  verfuegbarFuer: string[];
  regeln: string;
  datenerfassung: string[];
  gespraechsabschluss: string;
  tags: string[];
}

export const defaultOnboardingData: OnboardingData = {
  einrichtungstyp: 'Praxis',
  einrichtungstypAndere: '',
  einrichtungsName: '',
  fachbereich: '',
  leistungsspektrum: '',
  hauptrufnummer: '',
  durchwahlMedflex: '',
  telefonnummer: '',
  sprachen: ['Deutsch'],
  stimme: 'weiblich',
  
  begruessung: '',
  datenschutzWebsite: true,
  datenschutzAnsage: false,
  hinweis112: true,
  
  neupatientenAufnahme: true,
  neupatientenRegeln: '',
  versicherungsarten: ['Gesetzlich', 'Privat', 'Selbstzahler'],
  patientendatenFelder: ['Vor- und Nachname', 'Geburtsdatum', 'Bestands-/Neupatient', 'Handynummer', 'Krankenversicherung'],
  prioTags: [],
  
  vertreterHandling: true,
  vertreterDatenerfassung: ['Name des Vertreters', 'Beziehung zum Patienten'],
  
  zuweiserDurchstellen: true,
  zuweiserTelefon: '',
  zuweiserDatenerfassung: [],
  
  rueckruferHandling: false,
  rueckruferDurchstellen: false,
  rueckruferTelefon: '',
  rueckruferDatenerfassung: [],
  
  bgFallHandling: false,
  bgFallHinweis: '',
  
  notfaelleIntern: true,
  notfallSchlagwoerter: ['Notfall', 'Akute Beschwerden'],
  notfallTelefon: '',
  notfallDatenerfassung: [],
  akutsprechstunde: false,
  
  terminAnfrage: true,
  terminAnfrageAlternative: '',
  terminarten: [],
  terminVerfuegbarFuer: ['Stammpatienten', 'Neupatienten'],
  terminRegeln: '',
  terminDatenerfassung: ['Terminwunsch', 'Behandler', 'Grund für Termin'],
  terminGespraechsabschluss: '',
  terminTags: [],
  onlineBuchungHinweis: '',
  
  terminAbsage: true,
  terminAbsageAlternative: '',
  terminAbsageRegeln: '',
  terminAbsageDatenerfassung: [],
  terminAbsageGespraechsabschluss: '',
  terminAbsageTags: [],
  
  rezeptAnfrage: true,
  rezeptAlternative: '',
  rezeptVerfuegbar: ['Stammpatienten'],
  rezeptRegeln: '',
  rezeptDatenerfassung: ['Medikamentenname', 'Wirkstärke/Dosierung'],
  rezeptZustellung: '',
  rezeptGespraechsabschluss: '',
  rezeptTags: [],
  
  befundAnfrage: true,
  befundAlternative: '',
  befundVerfuegbar: ['Stammpatienten', 'Vertreter'],
  befundRegeln: '',
  befundDatenerfassung: ['Welcher Befund', 'Gewünschter Zustellweg'],
  befundGespraechsabschluss: '',
  befundTags: [],
  
  ueberweisung: false,
  ueberweisungAlternative: '',
  ueberweisungVerfuegbar: [],
  ueberweisungRegeln: '',
  ueberweisungDatenerfassung: [],
  ueberweisungZustellung: '',
  ueberweisungGespraechsabschluss: '',
  ueberweisungTags: [],
  
  auKrankschreibung: false,
  auAlternative: '',
  auRegeln: '',
  auDatenerfassung: [],
  auGespraechsabschluss: '',
  auTags: [],
  
  weitereAnliegen: [],
  
  sonstigesAnliegen: true,
  sonstigesGespraechsabschluss: '',
  
  weiterleitungBeiGespraech: false,
  weiterleitungTelefon: '',
  weiterleitungRegeln: '',
  
  adresse: '',
  anfahrt: '',
  oeffnungszeiten: '',
  parkhinweise: '',
  behandlerListe: '',
  leistungen: '',
  besonderheiten: '',

  comments: {},
};

export const MLFX_VERSION = '1.2';

export interface MlfxFile {
  version: string;
  exportedAt: string;
  data: OnboardingData;
}

export const VERFUEGBARE_SPRACHEN = [
  'Deutsch', 'Englisch', 'Französisch', 'Spanisch', 'Italienisch',
  'Türkisch', 'Russisch', 'Arabisch', 'Polnisch', 'Portugiesisch',
  'Griechisch', 'Rumänisch', 'Kroatisch', 'Serbisch', 'Ukrainisch',
];

export const VERFUEGBARE_VERSICHERUNGEN = [
  'Gesetzlich', 'Privat', 'Selbstzahler', 'BG', 'Bundeswehr',
];
