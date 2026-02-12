import { OnboardingData } from '@/types/onboarding';
import StepCard from './StepCard';
import FormField from './FormField';
import TagInput from './TagInput';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import stepImage from '@/assets/step-appointments.jpg';

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
}

const StepAppointments = ({ data, onChange }: Props) => {
  return (
    <StepCard
      title="Terminmanagement"
      description="Wie soll der Assistent Terminanfragen bearbeiten?"
      image={stepImage}
    >
      <div className="space-y-6">
        {/* Terminvereinbarung */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Terminvereinbarung</h3>
          <FormField label="Terminarten" hint="Welche Terminarten bieten Sie an? (z.B. nach Fachbereich, Versicherung)">
            <TagInput
              tags={data.terminarten}
              onChange={(terminarten) => onChange({ terminarten })}
              placeholder="z.B. Sprechstunde GKV, Erstuntersuchung PKV, Kontrolltermin"
            />
          </FormField>
          <div className="mt-3">
            <FormField label="Datenerfassung bei Terminen">
              <TagInput
                tags={data.terminDatenerfassung}
                onChange={(terminDatenerfassung) => onChange({ terminDatenerfassung })}
                placeholder="z.B. E-Mail-Adresse, Versicherungsstatus"
              />
            </FormField>
          </div>
          <div className="mt-3">
            <FormField label="Besondere Regeln für Termine" hint="z.B. Überweisungspflicht, Versicherungseinschränkungen">
              <Textarea
                value={data.terminRegeln}
                onChange={(e) => onChange({ terminRegeln: e.target.value })}
                placeholder="z.B. Neupatienten GKV nur mit Überweisung; Sportmedizin nur für Privat und Selbstzahler"
                rows={3}
              />
            </FormField>
          </div>
          <div className="mt-3">
            <FormField label="Online-Buchungshinweis" hint="Hinweis auf Online-Terminbuchung (z.B. Doctolib)">
              <Input
                value={data.onlineBuchungHinweis}
                onChange={(e) => onChange({ onlineBuchungHinweis: e.target.value })}
                placeholder="z.B. Termine können auch online über Doctolib gebucht werden"
              />
            </FormField>
          </div>
        </div>

        {/* Termin absagen/ändern */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Termin absagen / ändern</h3>
          <FormField label="Terminabsage/-änderung anbieten?">
            <div className="flex items-center gap-3">
              <Switch
                checked={data.terminAbsage}
                onCheckedChange={(checked) => onChange({ terminAbsage: checked })}
              />
              <span className="text-sm text-muted-foreground">
                {data.terminAbsage ? 'Ja' : 'Nein'}
              </span>
            </div>
          </FormField>
          {data.terminAbsage && (
            <div className="mt-3">
              <FormField label="Regeln für Terminabsage/-änderung">
                <Textarea
                  value={data.terminAbsageRegeln}
                  onChange={(e) => onChange({ terminAbsageRegeln: e.target.value })}
                  placeholder="z.B. Keine gesonderten Regeln"
                  rows={2}
                />
              </FormField>
            </div>
          )}
        </div>
      </div>
    </StepCard>
  );
};

export default StepAppointments;
