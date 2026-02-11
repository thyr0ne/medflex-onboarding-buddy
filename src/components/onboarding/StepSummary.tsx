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
    {items.map((t) => (
      <span key={t} className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
        {t}
      </span>
    ))}
  </div>
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
          <Row label="Praxis" value={data.praxisName || '–'} />
          <Row label="Fachbereich" value={data.fachbereich || '–'} />
          <Row label="Telefon" value={data.telefonnummer || '–'} />
          <Row label="Sprachen" value={<Tags items={data.sprachen} />} />
          <Row label="Stimme" value={data.stimme} />
        </Section>

        <Section title="Datenschutz & Begrüßung">
          <Row label="Datenschutz Website" value={<BoolBadge value={data.datenschutzWebsite} />} />
          <Row label="Datenschutz Ansage" value={<BoolBadge value={data.datenschutzAnsage} />} />
          <Row label="Hinweis 112" value={<BoolBadge value={data.hinweis112} />} />
          {data.begruessung && (
            <div className="mt-2 p-3 rounded-lg bg-muted text-sm text-foreground italic">
              "{data.begruessung}"
            </div>
          )}
        </Section>

        <Section title="Anrufer-Typen">
          <Row label="Neupatienten" value={<BoolBadge value={data.neupatientenAufnahme} />} />
          <Row label="Versicherungsarten" value={<Tags items={data.versicherungsarten} />} />
          <Row label="Zuweiser durchstellen" value={<BoolBadge value={data.zuweiserDurchstellen} />} />
          {data.zuweiserDurchstellen && data.zuweiserTelefon && (
            <Row label="Zuweiser-Telefon" value={data.zuweiserTelefon} />
          )}
        </Section>

        <Section title="Notfallbearbeitung">
          <Row label="Intern bearbeitet" value={<BoolBadge value={data.notfaelleIntern} />} />
          <Row label="Schlüsselwörter" value={<Tags items={data.notfallSchlagwoerter} />} />
          {data.notfallTelefon && <Row label="Notfallnummer" value={data.notfallTelefon} />}
        </Section>

        <Section title="Anfragetypen">
          <Row label="Terminarten" value={data.terminarten.length > 0 ? <Tags items={data.terminarten} /> : '–'} />
          <Row label="Termin-Datenerfassung" value={<Tags items={data.terminDatenerfassung} />} />
          {data.terminRegeln && <Row label="Terminregeln" value={data.terminRegeln} />}
          <Row label="Rezept für" value={<Tags items={data.rezeptVerfuegbar} />} />
          <Row label="Befund für" value={<Tags items={data.befundVerfuegbar} />} />
          <Row label="Sonstiges Anliegen" value={<BoolBadge value={data.sonstigesAnliegen} />} />
        </Section>

        <Section title="Knowledge Base">
          <Row label="Adresse" value={data.adresse || '–'} />
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
