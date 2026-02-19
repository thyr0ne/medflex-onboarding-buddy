import { OnboardingData, VERFUEGBARE_VERSICHERUNGEN } from '@/types/onboarding';
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
      description="Begrüßung, Datenschutz und Konfiguration der verschiedenen Anrufer-Typen."
      image={stepImage}
    >
      {/* Begrüßung (von Seite 1 hierher verschoben) */}
      <FormField label="Beispiel-Begrüßung" hint="Passen Sie die Begrüßung an Ihre Einrichtung an.">
        <Textarea
          value={data.begruessung}
          onChange={(e) => onChange({ begruessung: e.target.value })}
          placeholder='z.B. "Herzlich willkommen bei [Name]. Ich bin Lisa, die KI-Telefonassistentin. Wie kann ich Ihnen helfen?"'
          rows={4}
        />
      </FormField>

      <div className="grid gap-4">
        <FormField label="Datenschutzhinweis auf Ihrer Website">
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

        <FormField label="Datenschutzhinweis in der Begrüßung / Ansage">
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

        <FormField label="Hinweis auf 112 bei lebensbedrohlichen Notfällen">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.hinweis112}
              onCheckedChange={(checked) => onChange({ hinweis112: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.hinweis112 ? 'Ja – „Bitte rufen Sie bei lebensbedrohlichen Notfällen die 112 an."' : 'Nein'}
            </span>
          </div>
        </FormField>
      </div>

      {/* Patientenaufnahme */}
      <div className="border-t border-border pt-5 mt-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Patientenaufnahme</h3>

        <FormField label="Versicherungsarten" hint="Welche Versicherungsarten akzeptieren Sie?">
          <div className="flex flex-wrap gap-2">
            {VERFUEGBARE_VERSICHERUNGEN.map((v) => {
              const isSelected = data.versicherungsarten.includes(v);
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      onChange({ versicherungsarten: data.versicherungsarten.filter(s => s !== v) });
                    } else {
                      onChange({ versicherungsarten: [...data.versicherungsarten, v] });
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                  }`}
                >
                  {v}
                </button>
              );
            })}
          </div>
        </FormField>

        <FormField label="Zu erfassende Patientendaten" hint="Welche Daten soll der Assistent vom Anrufer abfragen?">
          <TagInput
            tags={data.patientendatenFelder}
            onChange={(patientendatenFelder) => onChange({ patientendatenFelder })}
            placeholder="z.B. Krankenversicherung, Geburtsdatum"
          />
        </FormField>

        <FormField label="Prioritäts-Tags" hint="Falls bestimmte Anliegen oder Anrufer priorisiert werden sollen">
          <TagInput
            tags={data.prioTags}
            onChange={(prioTags) => onChange({ prioTags })}
            placeholder="z.B. Dringend, VIP, Rückruf heute"
          />
        </FormField>
      </div>

      {/* Neupatienten → zur Terminanfrage verknüpft */}
      <div className="border-t border-border pt-5 mt-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Neupatienten</h3>

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

        {data.neupatientenAufnahme && (
          <FormField label="Regeln für Neupatientenaufnahme" hint="z.B. Altersgrenzen, Überweisungspflicht, Versicherungsbeschränkungen">
            <Textarea
              value={data.neupatientenRegeln}
              onChange={(e) => onChange({ neupatientenRegeln: e.target.value })}
              placeholder="z.B. Ab 16 Jahren; GKV nur mit Überweisung; Privat und Selbstzahler ohne Einschränkung"
              rows={3}
            />
          </FormField>
        )}
      </div>

      {/* Vertreter als eigener Usertyp */}
      <div className="border-t border-border pt-5 mt-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Vertreter</h3>

        <FormField label="Vertreter als Anrufer-Typ?" hint="z.B. Eltern, Angehörige, Bevollmächtigte">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.vertreterHandling}
              onCheckedChange={(checked) => onChange({ vertreterHandling: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.vertreterHandling ? 'Ja' : 'Nein'}
            </span>
          </div>
        </FormField>

        {data.vertreterHandling && (
          <FormField label="Datenerfassung bei Vertretern">
            <TagInput
              tags={data.vertreterDatenerfassung}
              onChange={(vertreterDatenerfassung) => onChange({ vertreterDatenerfassung })}
              placeholder="z.B. Name des Vertreters, Beziehung zum Patienten"
            />
          </FormField>
        )}
      </div>

      {/* Zuweiser */}
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
          <FormField label="Telefonnummer zum Durchstellen" hint="Darf nicht die reguläre Hauptnummer sein!">
            <Input
              value={data.zuweiserTelefon}
              onChange={(e) => onChange({ zuweiserTelefon: e.target.value })}
              placeholder="z.B. 089 12345679"
            />
          </FormField>
        )}

        {!data.zuweiserDurchstellen && (
          <FormField label="Zu erfassende Daten bei Zuweisern">
            <TagInput
              tags={data.zuweiserDatenerfassung}
              onChange={(zuweiserDatenerfassung) => onChange({ zuweiserDatenerfassung })}
              placeholder="z.B. Name, Praxis, Rückrufnummer, Anliegen"
            />
          </FormField>
        )}
      </div>

      {/* Rückrufer */}
      <div className="border-t border-border pt-5 mt-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Rückrufer</h3>

        <FormField label="Rückrufer-Behandlung aktiv?" hint="Anrufer, die zurückrufen weil sie angerufen wurden">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.rueckruferHandling}
              onCheckedChange={(checked) => onChange({ rueckruferHandling: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.rueckruferHandling ? 'Ja' : 'Nein'}
            </span>
          </div>
        </FormField>

        {data.rueckruferHandling && (
          <>
            <FormField label="Rückrufer direkt durchstellen?">
              <div className="flex items-center gap-3">
                <Switch
                  checked={data.rueckruferDurchstellen}
                  onCheckedChange={(checked) => onChange({ rueckruferDurchstellen: checked })}
                />
                <span className="text-sm text-muted-foreground">
                  {data.rueckruferDurchstellen ? 'Ja – Weiterleitung' : 'Nein – Daten erfassen'}
                </span>
              </div>
            </FormField>

            {data.rueckruferDurchstellen ? (
              <FormField label="Weiterleitungsnummer für Rückrufer">
                <Input
                  value={data.rueckruferTelefon}
                  onChange={(e) => onChange({ rueckruferTelefon: e.target.value })}
                  placeholder="z.B. 0049 2064 60 92 – 25"
                />
              </FormField>
            ) : (
              <FormField label="Zu erfassende Daten bei Rückrufern">
                <TagInput
                  tags={data.rueckruferDatenerfassung}
                  onChange={(rueckruferDatenerfassung) => onChange({ rueckruferDatenerfassung })}
                  placeholder="z.B. Name, Rückrufnummer, Anliegen"
                />
              </FormField>
            )}
          </>
        )}
      </div>

      {/* BG-Fall */}
      <div className="border-t border-border pt-5 mt-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">BG-Fall / Arbeitsunfälle</h3>

        <FormField label="Spezielle BG-Fall Behandlung?" hint="Arbeits-, Wege-, Schul- und Kindergartenunfälle">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.bgFallHandling}
              onCheckedChange={(checked) => onChange({ bgFallHandling: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.bgFallHandling ? 'Ja – Sonderbehandlung aktiv' : 'Nein'}
            </span>
          </div>
        </FormField>

        {data.bgFallHandling && (
          <FormField label="Hinweistext / Verweis bei BG-Fällen" hint="z.B. Verweis auf D-Arzt, Partnerpraxen">
            <Textarea
              value={data.bgFallHinweis}
              onChange={(e) => onChange({ bgFallHinweis: e.target.value })}
              placeholder="z.B. In der Praxis können leider keine Arbeits-, Wege-, Schul- und Kindergartenunfälle behandelt werden. Bitte wenden Sie sich an eine Praxis mit D-Arzt-Zulassung."
              rows={4}
            />
          </FormField>
        )}
      </div>
    </StepCard>
  );
};

export default StepCallers;
