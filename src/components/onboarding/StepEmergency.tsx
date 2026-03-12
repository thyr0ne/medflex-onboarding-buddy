import { OnboardingData } from '@/types/onboarding';
import StepCard from './StepCard';
import FormField from './FormField';
import SectionHeading from './SectionHeading';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import TagInput from './TagInput';
import stepImage from '@/assets/step-emergency.jpg';

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
}

const StepEmergency = ({ data, onChange }: Props) => {
  const setComment = (key: string, value: string) => {
    onChange({ comments: { ...data.comments, [key]: value } });
  };

  return (
    <StepCard
      title="Notfallbearbeitung"
      description="Definieren Sie, wie Notfälle erkannt und bearbeitet werden."
      image={stepImage}
    >
      <SectionHeading
        title="Notfallbearbeitung"
        commentKey="notfallbearbeitung"
        comment={data.comments?.notfallbearbeitung || ''}
        onCommentChange={setComment}
        className="mb-4 -mt-1"
      />

      <FormField label="Werden Notfälle intern bearbeitet?">
        <div className="flex items-center gap-3">
          <Switch
            checked={data.notfaelleIntern}
            onCheckedChange={(checked) => onChange({ notfaelleIntern: checked })}
          />
          <span className="text-sm text-muted-foreground">
            {data.notfaelleIntern ? 'Ja – Weiterleitung in die Einrichtung' : 'Nein'}
          </span>
        </div>
      </FormField>

      <FormField
        label="Notfall-Schlüsselwörter"
        hint="Bei Erkennung dieser Begriffe wird der Anruf als Notfall priorisiert."
      >
        <TagInput
          tags={data.notfallSchlagwoerter}
          onChange={(notfallSchlagwoerter) => onChange({ notfallSchlagwoerter })}
          placeholder="z.B. Starke Blutung, Brustschmerzen, Atemnot"
        />
      </FormField>

      {data.notfaelleIntern && (
        <>
          <FormField label="Notfallnummer" hint="Darf nicht die reguläre Hauptnummer sein!">
            <Input
              value={data.notfallTelefon}
              onChange={(e) => onChange({ notfallTelefon: e.target.value })}
              placeholder="z.B. 089 12345680"
            />
          </FormField>

          <FormField label="Akutsprechstunde anbieten?" hint="Differenzierung zwischen Akutsprechstunde und echtem Notfall">
            <div className="flex items-center gap-3">
              <Switch
                checked={data.akutsprechstunde}
                onCheckedChange={(checked) => onChange({ akutsprechstunde: checked })}
              />
              <span className="text-sm text-muted-foreground">
                {data.akutsprechstunde
                  ? 'Ja – Frage ob Akutsprechstunde oder Notfall-Weiterleitung'
                  : 'Nein – Direkte Weiterleitung bei Notfall'}
              </span>
            </div>
          </FormField>
        </>
      )}

      <FormField
        label="Notfall-Datenerfassung"
        hint="Welche zusätzlichen Daten sollen bei Notfällen erfasst werden?"
      >
        <TagInput
          tags={data.notfallDatenerfassung}
          onChange={(notfallDatenerfassung) => onChange({ notfallDatenerfassung })}
          placeholder="z.B. Art der Beschwerden, Dauer der Beschwerden"
        />
      </FormField>
    </StepCard>
  );
};

export default StepEmergency;
