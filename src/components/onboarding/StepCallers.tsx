import { OnboardingData } from '@/types/onboarding';
import StepCard from './StepCard';
import FormField from './FormField';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import stepImage from '@/assets/step-callers.jpg';
import TagInput from './TagInput';
import { Input } from '@/components/ui/input';

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
}

const StepCallers = ({ data, onChange }: Props) => {
  return (
    <StepCard
      title="Anrufer-Typen & Datenschutz"
      description="Definieren Sie, wer anruft und welche Daten erfasst werden sollen."
      image={stepImage}
    >
      <div className="grid gap-4">
        <FormField label="Datenschutzhinweis auf der Website">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.datenschutzWebsite}
              onCheckedChange={(checked) => onChange({ datenschutzWebsite: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.datenschutzWebsite ? 'Ja (empfohlen)' : 'Nein'}
            </span>
          </div>
        </FormField>

        <FormField label="Datenschutzhinweis in der Ansage">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.datenschutzAnsage}
              onCheckedChange={(checked) => onChange({ datenschutzAnsage: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.datenschutzAnsage ? 'Ja' : 'Nein'}
            </span>
          </div>
        </FormField>

        <FormField label="Hinweis auf 112 bei lebensbedrohlichen Fällen">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.hinweis112}
              onCheckedChange={(checked) => onChange({ hinweis112: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.hinweis112 ? 'Ja' : 'Nein'}
            </span>
          </div>
        </FormField>
      </div>

      <div className="border-t border-border pt-5 mt-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Patientenaufnahme</h3>

        <FormField label="Neupatienten aufnehmen?">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.neupatientenAufnahme}
              onCheckedChange={(checked) => onChange({ neupatientenAufnahme: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.neupatientenAufnahme ? 'Ja' : 'Nein'}
            </span>
          </div>
        </FormField>

        <FormField label="Versicherungsarten">
          <TagInput
            tags={data.versicherungsarten}
            onChange={(versicherungsarten) => onChange({ versicherungsarten })}
            placeholder="z.B. BG-Fall"
          />
        </FormField>
      </div>

      <div className="border-t border-border pt-5 mt-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Zuweiser & ärztliche Kollegen</h3>

        <FormField label="Zuweiser direkt durchstellen?">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.zuweiserDurchstellen}
              onCheckedChange={(checked) => onChange({ zuweiserDurchstellen: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.zuweiserDurchstellen ? 'Ja' : 'Nein'}
            </span>
          </div>
        </FormField>

        {data.zuweiserDurchstellen && (
          <FormField label="Telefonnummer zum Durchstellen" hint="Darf nicht die reguläre Praxisnummer sein!">
            <Input
              value={data.zuweiserTelefon}
              onChange={(e) => onChange({ zuweiserTelefon: e.target.value })}
              placeholder="z.B. 089 12345679"
            />
          </FormField>
        )}
      </div>
    </StepCard>
  );
};

export default StepCallers;
