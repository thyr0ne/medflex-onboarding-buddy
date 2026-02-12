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

const StepDocuments = ({ data, onChange }: Props) => {
  return (
    <StepCard
      title="Dokumente & Weiteres"
      description="Rezepte, Befunde, Überweisungen und weitere Anliegen"
      image={stepImage}
    >
      <div className="space-y-6">
        {/* Rezept */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Rezeptanfragen</h3>
          <FormField label="Verfügbar für" hint="Wer darf Rezepte anfragen?">
            <TagInput
              tags={data.rezeptVerfuegbar}
              onChange={(rezeptVerfuegbar) => onChange({ rezeptVerfuegbar })}
              placeholder="z.B. Vertreter"
            />
          </FormField>
          <div className="mt-3">
            <FormField label="Regeln">
              <Textarea
                value={data.rezeptRegeln}
                onChange={(e) => onChange({ rezeptRegeln: e.target.value })}
                placeholder="z.B. Medikament muss bereits verordnet worden sein; Wenn nicht verordnet → Terminvereinbarung"
                rows={3}
              />
            </FormField>
          </div>
          <div className="mt-3">
            <FormField label="Datenerfassung bei Rezepten">
              <TagInput
                tags={data.rezeptDatenerfassung}
                onChange={(rezeptDatenerfassung) => onChange({ rezeptDatenerfassung })}
                placeholder="z.B. Karte eingelesen in diesem Quartal"
              />
            </FormField>
          </div>
          <div className="mt-3">
            <FormField label="Rezeptabholung / Zustellung" hint="Wie kommt der Patient an das Rezept? (GKV/PKV-Regeln)">
              <Textarea
                value={data.rezeptAbholung}
                onChange={(e) => onChange({ rezeptAbholung: e.target.value })}
                placeholder="z.B. GKV: E-Rezept auf Gesundheitskarte; PKV: Abholen oder per Post"
                rows={3}
              />
            </FormField>
          </div>
        </div>

        {/* Befund */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Befundanfragen</h3>
          <FormField label="Verfügbar für">
            <TagInput
              tags={data.befundVerfuegbar}
              onChange={(befundVerfuegbar) => onChange({ befundVerfuegbar })}
              placeholder="z.B. Ärztliche Kollegen"
            />
          </FormField>
          <div className="mt-3">
            <FormField label="Regeln">
              <Textarea
                value={data.befundRegeln}
                onChange={(e) => onChange({ befundRegeln: e.target.value })}
                placeholder="z.B. Ärztliche Kollegen werden direkt durchgestellt"
                rows={2}
              />
            </FormField>
          </div>
          <div className="mt-3">
            <FormField label="Datenerfassung bei Befunden">
              <TagInput
                tags={data.befundDatenerfassung}
                onChange={(befundDatenerfassung) => onChange({ befundDatenerfassung })}
                placeholder="z.B. Befundart, Zustellweg (Hausarzt/ePA/Abholung)"
              />
            </FormField>
          </div>
        </div>

        {/* Überweisung */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Überweisungen</h3>
          <FormField label="Überweisungsanfragen anbieten?">
            <div className="flex items-center gap-3">
              <Switch
                checked={data.ueberweisung}
                onCheckedChange={(checked) => onChange({ ueberweisung: checked })}
              />
              <span className="text-sm text-muted-foreground">
                {data.ueberweisung ? 'Ja' : 'Nein'}
              </span>
            </div>
          </FormField>
          {data.ueberweisung && (
            <div className="mt-3">
              <FormField label="Regeln für Überweisungen">
                <Textarea
                  value={data.ueberweisungRegeln}
                  onChange={(e) => onChange({ ueberweisungRegeln: e.target.value })}
                  placeholder="z.B. Verfügbar für Stammpatienten und Vertreter"
                  rows={2}
                />
              </FormField>
            </div>
          )}
        </div>

        {/* AU / Krankschreibung */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">AU / Krankschreibung</h3>
          <FormField label="AU-Anfragen anbieten?">
            <div className="flex items-center gap-3">
              <Switch
                checked={data.auKrankschreibung}
                onCheckedChange={(checked) => onChange({ auKrankschreibung: checked })}
              />
              <span className="text-sm text-muted-foreground">
                {data.auKrankschreibung ? 'Ja' : 'Nein'}
              </span>
            </div>
          </FormField>
          {data.auKrankschreibung && (
            <div className="mt-3">
              <FormField label="Regeln für AU" hint="z.B. Erst-AU → Terminvereinbarung, Folge-AU → Datenerfassung">
                <Textarea
                  value={data.auRegeln}
                  onChange={(e) => onChange({ auRegeln: e.target.value })}
                  placeholder="z.B. Erst-AU: Weiter mit Terminvereinbarung; Folge-AU vom MVZ: Datenerfassung; Folge-AU vom Hausarzt: Hinweis auf Terminvereinbarung"
                  rows={3}
                />
              </FormField>
            </div>
          )}
        </div>

        {/* Sonstiges */}
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

        {/* Weiterleitung bei persönlichem Gespräch */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Weiterleitung bei persönlichem Gesprächswunsch</h3>
          <FormField label="Weiterleitung anbieten?" hint="Wenn der Anrufer ein persönliches Gespräch wünscht">
            <div className="flex items-center gap-3">
              <Switch
                checked={data.weiterleitungBeiGespraech}
                onCheckedChange={(checked) => onChange({ weiterleitungBeiGespraech: checked })}
              />
              <span className="text-sm text-muted-foreground">
                {data.weiterleitungBeiGespraech ? 'Ja' : 'Nein'}
              </span>
            </div>
          </FormField>
          {data.weiterleitungBeiGespraech && (
            <div className="mt-3">
              <FormField label="Weiterleitungsnummer">
                <Input
                  value={data.weiterleitungTelefon}
                  onChange={(e) => onChange({ weiterleitungTelefon: e.target.value })}
                  placeholder="z.B. +49 89 255447901"
                />
              </FormField>
            </div>
          )}
        </div>
      </div>
    </StepCard>
  );
};

export default StepDocuments;
