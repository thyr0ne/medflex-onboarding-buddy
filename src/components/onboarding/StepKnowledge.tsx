import { OnboardingData } from '@/types/onboarding';
import StepCard from './StepCard';
import FormField from './FormField';
import SectionHeading from './SectionHeading';
import RichTextEditor from './RichTextEditor';
import stepImage from '@/assets/step-knowledge.jpg';

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
}

const StepKnowledge = ({ data, onChange }: Props) => {
  const setComment = (key: string, value: string) => {
    onChange({ comments: { ...data.comments, [key]: value } });
  };

  return (
    <StepCard
      title="Knowledge Base"
      description="Informationen, die der Assistent auf Nachfrage mitteilen kann."
      image={stepImage}
    >
      <SectionHeading
        title="Standort & Erreichbarkeit"
        commentKey="knowledgeStandort"
        comment={data.comments?.knowledgeStandort || ''}
        onCommentChange={setComment}
        className="mb-4 -mt-1"
      />

      <FormField label="Adresse">
        <RichTextEditor
          value={data.adresse}
          onChange={(v) => onChange({ adresse: v })}
          placeholder="z.B. Musterstraße 1, 80331 München"
          minHeight="50px"
        />
      </FormField>

      <FormField label="Anfahrtsbeschreibung">
        <RichTextEditor
          value={data.anfahrt}
          onChange={(v) => onChange({ anfahrt: v })}
          placeholder="z.B. Erreichbar mit U-Bahn Linie U3, Station Marienplatz. Von der A7 Ausfahrt Kassel-Ost..."
        />
      </FormField>

      <FormField label="Öffnungszeiten">
        <RichTextEditor
          value={data.oeffnungszeiten}
          onChange={(v) => onChange({ oeffnungszeiten: v })}
          placeholder="z.B. Mo-Fr 8:00-12:30, 14:00-17:00; Mi 7:00-12:00; Sa nach Vereinbarung"
        />
      </FormField>

      <FormField label="Parkhinweise">
        <RichTextEditor
          value={data.parkhinweise}
          onChange={(v) => onChange({ parkhinweise: v })}
          placeholder="z.B. Parkhaus nebenan, kostenlose Parkplätze im Hof"
          minHeight="50px"
        />
      </FormField>

      <div className="border-t border-border pt-5 mt-5">
        <SectionHeading
          title="Team & Leistungen"
          commentKey="knowledgeTeam"
          comment={data.comments?.knowledgeTeam || ''}
          onCommentChange={setComment}
          className="mb-4"
        />

        <FormField label="Behandler-Liste">
          <RichTextEditor
            value={data.behandlerListe}
            onChange={(v) => onChange({ behandlerListe: v })}
            placeholder="z.B. Dr. Müller (Allgemeinmedizin), Dr. Schmidt (Orthopädie), Barbara Steuer (Diabetologie)"
          />
        </FormField>

        <FormField label="Leistungen">
          <RichTextEditor
            value={data.leistungen}
            onChange={(v) => onChange({ leistungen: v })}
            placeholder="z.B. Vorsorgeuntersuchungen, Labordiagnostik, Schmerztherapie, Chirotherapie, MRT"
          />
        </FormField>

        <FormField label="Sonstige Besonderheiten">
          <RichTextEditor
            value={data.besonderheiten}
            onChange={(v) => onChange({ besonderheiten: v })}
            placeholder="z.B. Barrierefreier Zugang, Offene Sprechstunde für Notfälle täglich 8-9 Uhr"
            minHeight="50px"
          />
        </FormField>
      </div>
    </StepCard>
  );
};

export default StepKnowledge;
