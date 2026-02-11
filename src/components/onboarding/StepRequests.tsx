import { OnboardingData } from '@/types/onboarding';
import StepCard from './StepCard';
import FormField from './FormField';
import TagInput from './TagInput';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import stepImage from '@/assets/step-appointments.jpg';

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
}

const StepRequests = ({ data, onChange }: Props) => {
  return (
    <StepCard
      title="Anfragetypen"
      description="Welche Anfragen soll der Assistent bearbeiten können?"
      image={stepImage}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Terminvereinbarung</h3>
          <FormField label="Terminarten" hint="Welche Terminarten bieten Sie an?">
            <TagInput
              tags={data.terminarten}
              onChange={(terminarten) => onChange({ terminarten })}
              placeholder="z.B. Routineuntersuchung, Erstgespräch, Behandlung"
            />
          </FormField>
          <div className="mt-3">
            <FormField label="Datenerfassung bei Terminen">
              <TagInput
                tags={data.terminDatenerfassung}
                onChange={(terminDatenerfassung) => onChange({ terminDatenerfassung })}
                placeholder="z.B. Wahlleistung"
              />
            </FormField>
          </div>
          <div className="mt-3">
            <FormField label="Besondere Regeln für Termine">
              <Textarea
                value={data.terminRegeln}
                onChange={(e) => onChange({ terminRegeln: e.target.value })}
                placeholder="z.B. Neupatienten nur vormittags, bestimmte Behandlungen nur bei Arzt X"
                rows={3}
              />
            </FormField>
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Rezeptanfragen</h3>
          <FormField label="Verfügbar für" hint="Wer darf Rezepte anfragen?">
            <TagInput
              tags={data.rezeptVerfuegbar}
              onChange={(rezeptVerfuegbar) => onChange({ rezeptVerfuegbar })}
              placeholder="z.B. Privat"
            />
          </FormField>
          <div className="mt-3">
            <FormField label="Regeln">
              <Textarea
                value={data.rezeptRegeln}
                onChange={(e) => onChange({ rezeptRegeln: e.target.value })}
                placeholder="z.B. Nur für bereits verordnete Medikamente"
                rows={2}
              />
            </FormField>
          </div>
        </div>

        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Befundanfragen</h3>
          <FormField label="Verfügbar für">
            <TagInput
              tags={data.befundVerfuegbar}
              onChange={(befundVerfuegbar) => onChange({ befundVerfuegbar })}
              placeholder="z.B. Ärztliche Kollegen"
            />
          </FormField>
        </div>

        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Sonstiges Anliegen</h3>
          <FormField label="Sonstige Anliegen annehmen?">
            <div className="flex items-center gap-3">
              <Switch
                checked={data.sonstigesAnliegen}
                onCheckedChange={(checked) => onChange({ sonstigesAnliegen: checked })}
              />
              <span className="text-sm text-muted-foreground">
                {data.sonstigesAnliegen ? 'Ja – Alle weiteren Anliegen werden erfasst' : 'Nein'}
              </span>
            </div>
          </FormField>
        </div>
      </div>
    </StepCard>
  );
};

export default StepRequests;
