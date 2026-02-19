import { useState } from 'react';
import { OnboardingData, WeitereAnliegenItem } from '@/types/onboarding';
import StepCard from './StepCard';
import FormField from './FormField';
import TagInput from './TagInput';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import stepImage from '@/assets/step-appointments.jpg';

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
}

const emptyAnliegen: WeitereAnliegenItem = {
  name: '',
  verfuegbarFuer: [],
  regeln: '',
  datenerfassung: [],
  gespraechsabschluss: '',
  tags: [],
};

/** Reusable Ja/Nein toggle with alternative field */
const ServiceToggle = ({
  label,
  checked,
  onToggle,
  alternative,
  onAlternativeChange,
  children,
}: {
  label: string;
  checked: boolean;
  onToggle: (v: boolean) => void;
  alternative: string;
  onAlternativeChange: (v: string) => void;
  children: React.ReactNode;
}) => (
  <>
    <FormField label={`${label} anbieten?`}>
      <div className="flex items-center gap-3">
        <Switch checked={checked} onCheckedChange={onToggle} />
        <span className="text-sm text-muted-foreground">{checked ? 'Ja' : 'Nein'}</span>
      </div>
    </FormField>
    {!checked && (
      <div className="mt-3">
        <FormField label="Alternative" hint="z.B. Weiterleitung an andere Rufnummer">
          <Input
            value={alternative}
            onChange={(e) => onAlternativeChange(e.target.value)}
            placeholder="z.B. Weiterleitung an 089 12345680"
          />
        </FormField>
      </div>
    )}
    {checked && children}
  </>
);

const StepDocuments = ({ data, onChange }: Props) => {
  const [expandedAnliegen, setExpandedAnliegen] = useState<number | null>(null);

  const addAnliegen = () => {
    onChange({ weitereAnliegen: [...data.weitereAnliegen, { ...emptyAnliegen }] });
    setExpandedAnliegen(data.weitereAnliegen.length);
  };

  const removeAnliegen = (index: number) => {
    onChange({ weitereAnliegen: data.weitereAnliegen.filter((_, i) => i !== index) });
    setExpandedAnliegen(null);
  };

  const updateAnliegen = (index: number, partial: Partial<WeitereAnliegenItem>) => {
    const updated = data.weitereAnliegen.map((item, i) => (i === index ? { ...item, ...partial } : item));
    onChange({ weitereAnliegen: updated });
  };

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
          <ServiceToggle
            label="Rezeptanfragen"
            checked={data.rezeptAnfrage}
            onToggle={(checked) => onChange({ rezeptAnfrage: checked })}
            alternative={data.rezeptAlternative}
            onAlternativeChange={(v) => onChange({ rezeptAlternative: v })}
          >
            <div className="mt-3">
              <FormField label="Verfügbar für">
                <TagInput
                  tags={data.rezeptVerfuegbar}
                  onChange={(rezeptVerfuegbar) => onChange({ rezeptVerfuegbar })}
                  placeholder="z.B. Vertreter"
                />
              </FormField>
            </div>
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
              <FormField label="Datenerfassung" hint="Zusätzlich zu den auf Seite 2 definierten Patientendaten">
                <TagInput
                  tags={data.rezeptDatenerfassung}
                  onChange={(rezeptDatenerfassung) => onChange({ rezeptDatenerfassung })}
                  placeholder="z.B. Karte eingelesen in diesem Quartal"
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Zustellung" hint="Wie kommt der Patient an das Rezept? (z.B. Post, Abholung, medflex, Mail)">
                <Textarea
                  value={data.rezeptZustellung}
                  onChange={(e) => onChange({ rezeptZustellung: e.target.value })}
                  placeholder="z.B. GKV: E-Rezept auf Gesundheitskarte; PKV: Abholen oder per Post"
                  rows={3}
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Gesprächsabschluss">
                <Textarea
                  value={data.rezeptGespraechsabschluss}
                  onChange={(e) => onChange({ rezeptGespraechsabschluss: e.target.value })}
                  placeholder="z.B. Ihre Rezeptanfrage wurde aufgenommen. Das Rezept wird wie besprochen bereitgestellt."
                  rows={2}
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Tag(s)">
                <TagInput
                  tags={data.rezeptTags}
                  onChange={(rezeptTags) => onChange({ rezeptTags })}
                  placeholder="z.B. Rezept, Folgerezept"
                />
              </FormField>
            </div>
          </ServiceToggle>
        </div>

        {/* Befund */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Befund anfordern</h3>
          <ServiceToggle
            label="Befundanfragen"
            checked={data.befundAnfrage}
            onToggle={(checked) => onChange({ befundAnfrage: checked })}
            alternative={data.befundAlternative}
            onAlternativeChange={(v) => onChange({ befundAlternative: v })}
          >
            <div className="mt-3">
              <FormField label="Verfügbar für">
                <TagInput
                  tags={data.befundVerfuegbar}
                  onChange={(befundVerfuegbar) => onChange({ befundVerfuegbar })}
                  placeholder="z.B. Ärztliche Kollegen"
                />
              </FormField>
            </div>
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
              <FormField label="Datenerfassung" hint="Zusätzlich zu den auf Seite 2 definierten Patientendaten">
                <TagInput
                  tags={data.befundDatenerfassung}
                  onChange={(befundDatenerfassung) => onChange({ befundDatenerfassung })}
                  placeholder="z.B. Befundart, Zustellweg (Hausarzt/ePA/Abholung)"
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Gesprächsabschluss">
                <Textarea
                  value={data.befundGespraechsabschluss}
                  onChange={(e) => onChange({ befundGespraechsabschluss: e.target.value })}
                  placeholder="z.B. Ihre Befundanfrage wurde aufgenommen."
                  rows={2}
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Tag(s)">
                <TagInput
                  tags={data.befundTags}
                  onChange={(befundTags) => onChange({ befundTags })}
                  placeholder="z.B. Befund, Labor"
                />
              </FormField>
            </div>
          </ServiceToggle>
        </div>

        {/* Überweisung */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">Überweisungen</h3>
          <ServiceToggle
            label="Überweisungsanfragen"
            checked={data.ueberweisung}
            onToggle={(checked) => onChange({ ueberweisung: checked })}
            alternative={data.ueberweisungAlternative}
            onAlternativeChange={(v) => onChange({ ueberweisungAlternative: v })}
          >
            <div className="mt-3">
              <FormField label="Verfügbar für">
                <TagInput
                  tags={data.ueberweisungVerfuegbar}
                  onChange={(ueberweisungVerfuegbar) => onChange({ ueberweisungVerfuegbar })}
                  placeholder="z.B. Stammpatienten, Vertreter"
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Datenerfassung" hint="Zusätzlich zu den auf Seite 2 definierten Patientendaten (z.B. Fachbereich, Grund)">
                <TagInput
                  tags={data.ueberweisungDatenerfassung}
                  onChange={(ueberweisungDatenerfassung) => onChange({ ueberweisungDatenerfassung })}
                  placeholder="z.B. Fachbereich, Grund, Behandlung"
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Zustellung" hint="z.B. Post, Abholung, medflex, Mail">
                <Input
                  value={data.ueberweisungZustellung}
                  onChange={(e) => onChange({ ueberweisungZustellung: e.target.value })}
                  placeholder="z.B. Abholung, Post, medflex"
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Gesprächsabschluss">
                <Textarea
                  value={data.ueberweisungGespraechsabschluss}
                  onChange={(e) => onChange({ ueberweisungGespraechsabschluss: e.target.value })}
                  placeholder="z.B. Ihre Überweisungsanfrage wurde aufgenommen."
                  rows={2}
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Tag(s)">
                <TagInput
                  tags={data.ueberweisungTags}
                  onChange={(ueberweisungTags) => onChange({ ueberweisungTags })}
                  placeholder="z.B. Überweisung"
                />
              </FormField>
            </div>
          </ServiceToggle>
        </div>

        {/* AU / Krankschreibung */}
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold text-foreground mb-3">AU / Krankschreibung</h3>
          <ServiceToggle
            label="AU-Anfragen"
            checked={data.auKrankschreibung}
            onToggle={(checked) => onChange({ auKrankschreibung: checked })}
            alternative={data.auAlternative}
            onAlternativeChange={(v) => onChange({ auAlternative: v })}
          >
            <div className="mt-3">
              <FormField label="Regeln" hint="z.B. Erst-AU → Terminvereinbarung, Folge-AU → Datenerfassung">
                <Textarea
                  value={data.auRegeln}
                  onChange={(e) => onChange({ auRegeln: e.target.value })}
                  placeholder="z.B. Erst-AU: Weiter mit Terminvereinbarung; Folge-AU vom MVZ: Datenerfassung"
                  rows={3}
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Datenerfassung" hint="Zusätzlich zu den auf Seite 2 definierten Patientendaten">
                <TagInput
                  tags={data.auDatenerfassung}
                  onChange={(auDatenerfassung) => onChange({ auDatenerfassung })}
                  placeholder="z.B. Art der AU (Erst/Folge), Dauer"
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Gesprächsabschluss">
                <Textarea
                  value={data.auGespraechsabschluss}
                  onChange={(e) => onChange({ auGespraechsabschluss: e.target.value })}
                  placeholder="z.B. Ihre AU-Anfrage wurde aufgenommen."
                  rows={2}
                />
              </FormField>
            </div>
            <div className="mt-3">
              <FormField label="Tag(s)">
                <TagInput
                  tags={data.auTags}
                  onChange={(auTags) => onChange({ auTags })}
                  placeholder="z.B. AU, Krankschreibung"
                />
              </FormField>
            </div>
          </ServiceToggle>
        </div>

        {/* Weitere Anliegen (erweiterbar) */}
        <div className="border-t border-border pt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">Weitere Anliegen</h3>
            <Button variant="outline" size="sm" onClick={addAnliegen} className="gap-1.5">
              <Plus className="w-4 h-4" />
              Hinzufügen
            </Button>
          </div>

          {data.weitereAnliegen.length === 0 && (
            <p className="text-sm text-muted-foreground">Noch keine weiteren Anliegen definiert. Klicken Sie auf „Hinzufügen" um ein neues Anliegen zu erstellen.</p>
          )}

          <div className="space-y-3">
            {data.weitereAnliegen.map((item, index) => (
              <div key={index} className="border border-border rounded-lg">
                <button
                  type="button"
                  onClick={() => setExpandedAnliegen(expandedAnliegen === index ? null : index)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-foreground">
                    {item.name || `Anliegen ${index + 1}`}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeAnliegen(index); }}
                      className="p-1 text-destructive hover:bg-destructive/10 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {expandedAnliegen === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {expandedAnliegen === index && (
                  <div className="px-4 pb-4 space-y-3">
                    <FormField label="Bezeichnung">
                      <Input
                        value={item.name}
                        onChange={(e) => updateAnliegen(index, { name: e.target.value })}
                        placeholder="z.B. Impfberatung, Reisemedizin"
                      />
                    </FormField>
                    <FormField label="Verfügbar für">
                      <TagInput
                        tags={item.verfuegbarFuer}
                        onChange={(verfuegbarFuer) => updateAnliegen(index, { verfuegbarFuer })}
                        placeholder="z.B. Stammpatienten"
                      />
                    </FormField>
                    <FormField label="Regeln">
                      <Textarea
                        value={item.regeln}
                        onChange={(e) => updateAnliegen(index, { regeln: e.target.value })}
                        placeholder="Spezielle Regeln für dieses Anliegen"
                        rows={2}
                      />
                    </FormField>
                    <FormField label="Datenerfassung">
                      <TagInput
                        tags={item.datenerfassung}
                        onChange={(datenerfassung) => updateAnliegen(index, { datenerfassung })}
                        placeholder="z.B. Reiseziel, Reisedatum"
                      />
                    </FormField>
                    <FormField label="Gesprächsabschluss">
                      <Textarea
                        value={item.gespraechsabschluss}
                        onChange={(e) => updateAnliegen(index, { gespraechsabschluss: e.target.value })}
                        rows={2}
                      />
                    </FormField>
                    <FormField label="Tag(s)">
                      <TagInput
                        tags={item.tags}
                        onChange={(tags) => updateAnliegen(index, { tags })}
                        placeholder="z.B. Impfung"
                      />
                    </FormField>
                  </div>
                )}
              </div>
            ))}
          </div>
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
          {data.sonstigesAnliegen && (
            <div className="mt-3">
              <FormField label="Gesprächsabschluss">
                <Textarea
                  value={data.sonstigesGespraechsabschluss}
                  onChange={(e) => onChange({ sonstigesGespraechsabschluss: e.target.value })}
                  placeholder="z.B. Vielen Dank, Ihr Anliegen wurde aufgenommen."
                  rows={2}
                />
              </FormField>
            </div>
          )}
        </div>

        {/* Weiterleitung */}
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
            <>
              <div className="mt-3">
                <FormField label="Weiterleitungsnummer">
                  <Input
                    value={data.weiterleitungTelefon}
                    onChange={(e) => onChange({ weiterleitungTelefon: e.target.value })}
                    placeholder="z.B. +49 89 255447901"
                  />
                </FormField>
              </div>
              <div className="mt-3">
                <FormField label="Regeln" hint="z.B. Schlagwort oder Bedingung für Weiterleitung">
                  <Textarea
                    value={data.weiterleitungRegeln}
                    onChange={(e) => onChange({ weiterleitungRegeln: e.target.value })}
                    placeholder="z.B. Weiterleitung nur bei Nennung des Schlagworts ‚persönlich' oder ‚dringend'"
                    rows={2}
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

export default StepDocuments;
