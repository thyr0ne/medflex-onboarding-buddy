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
        {/* Online-Buchungshinweis (an den Anfang) */}
        <FormField label="Online-Buchungshinweis" hint="Hinweis auf Online-Terminbuchung (z.B. Doctolib, Jameda)">
          <Input
            value={data.onlineBuchungHinweis}
            onChange={(e) => onChange({ onlineBuchungHinweis: e.target.value })}
            placeholder="z.B. Termine können auch online über Doctolib gebucht werden"
          />
        </FormField>

        {/* Terminanfrage */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Terminanfrage</h3>

          <FormField label="Terminanfragen anbieten?">
            <div className="flex items-center gap-3">
              <Switch
                checked={data.terminAnfrage}
                onCheckedChange={(checked) => onChange({ terminAnfrage: checked })}
              />
              <span className="text-sm text-muted-foreground">
                {data.terminAnfrage ? 'Ja' : 'Nein'}
              </span>
            </div>
          </FormField>

          {!data.terminAnfrage && (
            <div className="mt-3">
              <FormField label="Alternative" hint="z.B. Weiterleitung an andere Rufnummer">
                <Input
                  value={data.terminAnfrageAlternative}
                  onChange={(e) => onChange({ terminAnfrageAlternative: e.target.value })}
                  placeholder="z.B. Weiterleitung an 089 12345680"
                />
              </FormField>
            </div>
          )}

          {data.terminAnfrage && (
            <>
              <div className="mt-3">
                <FormField label="Terminarten" hint="Welche Terminarten bieten Sie an?">
                  <TagInput
                    tags={data.terminarten}
                    onChange={(terminarten) => onChange({ terminarten })}
                    placeholder="z.B. Sprechstunde GKV, Erstuntersuchung PKV, Kontrolltermin"
                  />
                </FormField>
              </div>

              <div className="mt-3">
                <FormField label="Verfügbar für" hint="Verknüpft mit jeweiliger Terminart (z.B. Stammpatienten, Neupatienten)">
                  <TagInput
                    tags={data.terminVerfuegbarFuer}
                    onChange={(terminVerfuegbarFuer) => onChange({ terminVerfuegbarFuer })}
                    placeholder="z.B. Stammpatienten, Neupatienten"
                  />
                </FormField>
              </div>

              <div className="mt-3">
                <FormField label="Regeln" hint="z.B. Überweisungspflicht, Versicherungseinschränkungen">
                  <Textarea
                    value={data.terminRegeln}
                    onChange={(e) => onChange({ terminRegeln: e.target.value })}
                    placeholder="z.B. Neupatienten GKV nur mit Überweisung; Sportmedizin nur für Privat und Selbstzahler"
                    rows={3}
                  />
                </FormField>
              </div>

              <div className="mt-3">
                <FormField label="Datenerfassung" hint="Zusätzlich zu den auf Seite 2 definierten Patientendaten">
                  <TagInput
                    tags={data.terminDatenerfassung}
                    onChange={(terminDatenerfassung) => onChange({ terminDatenerfassung })}
                    placeholder="z.B. Terminwunsch, Behandler, Grund"
                  />
                </FormField>
              </div>

              <div className="mt-3">
                <FormField label="Gesprächsabschluss" hint="Was soll der Assistent am Ende des Gesprächs sagen?">
                  <Textarea
                    value={data.terminGespraechsabschluss}
                    onChange={(e) => onChange({ terminGespraechsabschluss: e.target.value })}
                    placeholder="z.B. Vielen Dank, Ihre Terminanfrage wurde aufgenommen. Wir melden uns zeitnah bei Ihnen."
                    rows={3}
                  />
                </FormField>
              </div>

              <div className="mt-3">
                <FormField label="Tag(s)" hint="Falls bestimmte Terminarten priorisiert werden">
                  <TagInput
                    tags={data.terminTags}
                    onChange={(terminTags) => onChange({ terminTags })}
                    placeholder="z.B. Dringend, Neupatienten, Kontrolltermin"
                  />
                </FormField>
              </div>
            </>
          )}
        </div>

        {/* Termin absagen/ändern */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Terminabsage / -änderung</h3>

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

          {!data.terminAbsage && (
            <div className="mt-3">
              <FormField label="Alternative">
                <Input
                  value={data.terminAbsageAlternative}
                  onChange={(e) => onChange({ terminAbsageAlternative: e.target.value })}
                  placeholder="z.B. Weiterleitung an andere Rufnummer"
                />
              </FormField>
            </div>
          )}

          {data.terminAbsage && (
            <>
              <div className="mt-3">
                <FormField label="Regeln" hint="z.B. Stornierungsgebühren, Fristen">
                  <Textarea
                    value={data.terminAbsageRegeln}
                    onChange={(e) => onChange({ terminAbsageRegeln: e.target.value })}
                    placeholder="z.B. Absage bis 24h vorher kostenlos; danach ggf. Ausfallhonorar"
                    rows={2}
                  />
                </FormField>
              </div>

              <div className="mt-3">
                <FormField label="Datenerfassung" hint="Zusätzlich zu den auf Seite 2 definierten Patientendaten">
                  <TagInput
                    tags={data.terminAbsageDatenerfassung}
                    onChange={(terminAbsageDatenerfassung) => onChange({ terminAbsageDatenerfassung })}
                    placeholder="z.B. Termindatum, Grund der Absage"
                  />
                </FormField>
              </div>

              <div className="mt-3">
                <FormField label="Gesprächsabschluss">
                  <Textarea
                    value={data.terminAbsageGespraechsabschluss}
                    onChange={(e) => onChange({ terminAbsageGespraechsabschluss: e.target.value })}
                    placeholder="z.B. Ihr Termin wurde zur Absage vorgemerkt. Das Praxisteam wird sich ggf. bei Ihnen melden."
                    rows={2}
                  />
                </FormField>
              </div>

              <div className="mt-3">
                <FormField label="Tag(s)">
                  <TagInput
                    tags={data.terminAbsageTags}
                    onChange={(terminAbsageTags) => onChange({ terminAbsageTags })}
                    placeholder="z.B. Absage, Änderung"
                  />
                </FormField>
              </div>
            </>
          )}
        </div>
      </div>
    </StepCard>
  );
};

export default StepAppointments;
