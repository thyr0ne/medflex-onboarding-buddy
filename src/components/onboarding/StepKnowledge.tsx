import { OnboardingData } from '@/types/onboarding';
import StepCard from './StepCard';
import FormField from './FormField';
import { Textarea } from '@/components/ui/textarea';
import stepImage from '@/assets/step-knowledge.jpg';

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
}

const StepKnowledge = ({ data, onChange }: Props) => {
  return (
    <StepCard
      title="Knowledge Base"
      description="Informationen, die der Assistent auf Nachfrage mitteilen kann."
      image={stepImage}
    >
      <FormField label="Adresse / Anfahrtsbeschreibung">
        <Textarea
          value={data.adresse}
          onChange={(e) => onChange({ adresse: e.target.value })}
          placeholder="z.B. Musterstraße 1, 80331 München. Erreichbar mit U-Bahn Linie U3, Station Marienplatz."
          rows={3}
        />
      </FormField>

      <FormField label="Öffnungszeiten">
        <Textarea
          value={data.oeffnungszeiten}
          onChange={(e) => onChange({ oeffnungszeiten: e.target.value })}
          placeholder="z.B. Mo-Fr 8:00-18:00, Sa nach Vereinbarung"
          rows={3}
        />
      </FormField>

      <FormField label="Parkhinweise">
        <Textarea
          value={data.parkhinweise}
          onChange={(e) => onChange({ parkhinweise: e.target.value })}
          placeholder="z.B. Parkhaus nebenan, kostenlose Parkplätze im Hof"
          rows={2}
        />
      </FormField>

      <FormField label="Behandler-Liste">
        <Textarea
          value={data.behandlerListe}
          onChange={(e) => onChange({ behandlerListe: e.target.value })}
          placeholder="z.B. Dr. Müller (Allgemeinmedizin), Dr. Schmidt (Orthopädie)"
          rows={3}
        />
      </FormField>

      <FormField label="Leistungen">
        <Textarea
          value={data.leistungen}
          onChange={(e) => onChange({ leistungen: e.target.value })}
          placeholder="z.B. Vorsorgeuntersuchungen, Labordiagnostik, Schmerztherapie"
          rows={3}
        />
      </FormField>

      <FormField label="Sonstige Besonderheiten">
        <Textarea
          value={data.besonderheiten}
          onChange={(e) => onChange({ besonderheiten: e.target.value })}
          placeholder="z.B. Barrierefreier Zugang, Kinderecke im Wartezimmer"
          rows={2}
        />
      </FormField>
    </StepCard>
  );
};

export default StepKnowledge;
