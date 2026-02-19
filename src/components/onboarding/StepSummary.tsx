import { OnboardingData } from '@/types/onboarding';
import StepCard from './StepCard';
import { Check, X, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import stepImage from '@/assets/step-summary.jpg';

interface Props {
  data: OnboardingData;
  onExportPdf: () => void;
}

const BoolBadge = ({ value }: { value: boolean }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
    value ? 'bg-step-complete/10 text-step-complete' : 'bg-destructive/10 text-destructive'
  }`}>
    {value ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
    {value ? 'Ja' : 'Nein'}
  </span>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-b border-border pb-4 last:border-0">
    <h3 className="text-sm font-bold text-accent uppercase tracking-wide mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-start gap-4">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <span className="text-sm text-foreground text-right font-medium">{value}</span>
  </div>
);

const Tags = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-1 justify-end">
    {items.length === 0 ? <span className="text-sm text-muted-foreground">–</span> : items.map((t) => (
      <span key={t} className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
        {t}
      </span>
    ))}
  </div>
);

const TextBlock = ({ text }: { text: string }) => (
  <div className="mt-1 p-2 rounded bg-muted text-sm text-foreground whitespace-pre-wrap">{text}</div>
);

const StepSummary = ({ data, onExportPdf }: Props) => {
  return (
    <StepCard
      title="Zusammenfassung"
      description="Überprüfen Sie alle Angaben und exportieren Sie das Konzept als PDF."
      image={stepImage}
    >
      <div className="space-y-5" id="pdf-content">
        <Section title="Allgemeine Informationen">
          <Row label="Typ" value={data.einrichtungstyp === 'Andere' ? data.einrichtungstypAndere || 'Andere' : data.einrichtungstyp} />
          <Row label="Name" value={data.einrichtungsName || '–'} />
          <Row label="Fachbereich" value={data.fachbereich || '–'} />
          <Row label="Leistungsspektrum" value={data.leistungsspektrum || '–'} />
          <Row label="Hauptrufnummer" value={data.hauptrufnummer || '–'} />
          <Row label="Durchwahl medflex" value={data.durchwahlMedflex || '–'} />
          <Row label="Sprachen" value={<Tags items={data.sprachen} />} />
          <Row label="Stimme" value={data.stimme} />
        </Section>

        <Section title="Datenschutz & Begrüßung">
          <Row label="Datenschutz Website" value={<BoolBadge value={data.datenschutzWebsite} />} />
          <Row label="Datenschutz Ansage" value={<BoolBadge value={data.datenschutzAnsage} />} />
          <Row label="Hinweis 112" value={<BoolBadge value={data.hinweis112} />} />
          {data.begruessung && <TextBlock text={data.begruessung} />}
        </Section>

        <Section title="Anrufer-Typen">
          <Row label="Versicherungsarten" value={<Tags items={data.versicherungsarten} />} />
          <Row label="Patientendaten" value={<Tags items={data.patientendatenFelder} />} />
          {data.prioTags.length > 0 && <Row label="Prioritäts-Tags" value={<Tags items={data.prioTags} />} />}
          <Row label="Neupatienten" value={<BoolBadge value={data.neupatientenAufnahme} />} />
          {data.neupatientenRegeln && <TextBlock text={data.neupatientenRegeln} />}
          <Row label="Vertreter" value={<BoolBadge value={data.vertreterHandling} />} />
          <Row label="Zuweiser durchstellen" value={<BoolBadge value={data.zuweiserDurchstellen} />} />
          {data.zuweiserDurchstellen && data.zuweiserTelefon && <Row label="Zuweiser-Telefon" value={data.zuweiserTelefon} />}
          <Row label="Rückrufer-Handling" value={<BoolBadge value={data.rueckruferHandling} />} />
          {data.rueckruferHandling && data.rueckruferDurchstellen && data.rueckruferTelefon && <Row label="Rückrufer-Telefon" value={data.rueckruferTelefon} />}
          <Row label="BG-Fall Behandlung" value={<BoolBadge value={data.bgFallHandling} />} />
          {data.bgFallHandling && data.bgFallHinweis && <TextBlock text={data.bgFallHinweis} />}
        </Section>

        <Section title="Notfallbearbeitung">
          <Row label="Intern bearbeitet" value={<BoolBadge value={data.notfaelleIntern} />} />
          <Row label="Schlüsselwörter" value={<Tags items={data.notfallSchlagwoerter} />} />
          {data.notfallTelefon && <Row label="Notfallnummer" value={data.notfallTelefon} />}
          <Row label="Akutsprechstunde" value={<BoolBadge value={data.akutsprechstunde} />} />
          <Row label="Notfall-Datenerfassung" value={<Tags items={data.notfallDatenerfassung} />} />
        </Section>

        <Section title="Terminmanagement">
          {data.onlineBuchungHinweis && <Row label="Online-Buchung" value={data.onlineBuchungHinweis} />}
          <Row label="Terminanfrage" value={<BoolBadge value={data.terminAnfrage} />} />
          {data.terminAnfrage && (
            <>
              <Row label="Terminarten" value={<Tags items={data.terminarten} />} />
              <Row label="Verfügbar für" value={<Tags items={data.terminVerfuegbarFuer} />} />
              <Row label="Datenerfassung" value={<Tags items={data.terminDatenerfassung} />} />
              {data.terminRegeln && <TextBlock text={data.terminRegeln} />}
              {data.terminGespraechsabschluss && <TextBlock text={data.terminGespraechsabschluss} />}
              {data.terminTags.length > 0 && <Row label="Tags" value={<Tags items={data.terminTags} />} />}
            </>
          )}
          <Row label="Terminabsage/-änderung" value={<BoolBadge value={data.terminAbsage} />} />
          {data.terminAbsage && data.terminAbsageRegeln && <TextBlock text={data.terminAbsageRegeln} />}
        </Section>

        <Section title="Dokumente & Weiteres">
          <Row label="Rezeptanfragen" value={<BoolBadge value={data.rezeptAnfrage} />} />
          {data.rezeptAnfrage && (
            <>
              <Row label="Rezept für" value={<Tags items={data.rezeptVerfuegbar} />} />
              <Row label="Rezept-Datenerfassung" value={<Tags items={data.rezeptDatenerfassung} />} />
              {data.rezeptRegeln && <TextBlock text={data.rezeptRegeln} />}
              {data.rezeptZustellung && <Row label="Zustellung" value={data.rezeptZustellung} />}
            </>
          )}
          <Row label="Befundanfragen" value={<BoolBadge value={data.befundAnfrage} />} />
          {data.befundAnfrage && (
            <>
              <Row label="Befund für" value={<Tags items={data.befundVerfuegbar} />} />
              <Row label="Befund-Datenerfassung" value={<Tags items={data.befundDatenerfassung} />} />
            </>
          )}
          <Row label="Überweisung" value={<BoolBadge value={data.ueberweisung} />} />
          {data.ueberweisung && data.ueberweisungVerfuegbar.length > 0 && <Row label="Verfügbar für" value={<Tags items={data.ueberweisungVerfuegbar} />} />}
          <Row label="AU / Krankschreibung" value={<BoolBadge value={data.auKrankschreibung} />} />
          {data.auKrankschreibung && data.auRegeln && <TextBlock text={data.auRegeln} />}
          {data.weitereAnliegen.length > 0 && (
            <Row label="Weitere Anliegen" value={data.weitereAnliegen.map(a => a.name).filter(Boolean).join(', ') || '–'} />
          )}
          <Row label="Sonstiges Anliegen" value={<BoolBadge value={data.sonstigesAnliegen} />} />
          <Row label="Weiterleitung Gespräch" value={<BoolBadge value={data.weiterleitungBeiGespraech} />} />
          {data.weiterleitungBeiGespraech && data.weiterleitungTelefon && <Row label="Weiterleitungs-Nr." value={data.weiterleitungTelefon} />}
        </Section>

        <Section title="Knowledge Base">
          <Row label="Adresse" value={data.adresse || '–'} />
          {data.anfahrt && <TextBlock text={data.anfahrt} />}
          <Row label="Öffnungszeiten" value={data.oeffnungszeiten || '–'} />
          <Row label="Parkhinweise" value={data.parkhinweise || '–'} />
          <Row label="Behandler" value={data.behandlerListe || '–'} />
          <Row label="Leistungen" value={data.leistungen || '–'} />
          <Row label="Besonderheiten" value={data.besonderheiten || '–'} />
        </Section>
      </div>

      <Button
        onClick={onExportPdf}
        className="w-full mt-6 gradient-accent text-accent-foreground font-semibold h-12 text-base"
        size="lg"
      >
        <FileDown className="w-5 h-5 mr-2" />
        Als PDF exportieren
      </Button>
    </StepCard>
  );
};

export default StepSummary;
