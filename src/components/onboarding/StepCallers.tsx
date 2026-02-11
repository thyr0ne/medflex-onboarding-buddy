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

        <FormField label="Versicherungsarten">
          <TagInput
            tags={data.versicherungsarten}
            onChange={(versicherungsarten) => onChange({ versicherungsarten })}
            placeholder="z.B. Bundeswehr"
          />
        </FormField>

        <FormField label="Zu erfassende Patientendaten" hint="Welche Daten soll der Assistent vom Anrufer abfragen?">
          <TagInput
            tags={data.patientendatenFelder}
            onChange={(patientendatenFelder) => onChange({ patientendatenFelder })}
            placeholder="z.B. E-Mail-Adresse"
          />
        </FormField>

        <FormField label="Vertreterdaten zusätzlich erfassen?">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.vertreterdatenErfassen}
              onCheckedChange={(checked) => onChange({ vertreterdatenErfassen: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.vertreterdatenErfassen ? 'Ja – Name Vertreter + Beziehung zum Patienten' : 'Nein'}
            </span>
          </div>
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
          <FormField label="Telefonnummer zum Durchstellen" hint="Darf nicht die reguläre Hauptnummer sein!">
            <Input
              value={data.zuweiserTelefon}
              onChange={(e) => onChange({ zuweiserTelefon: e.target.value })}
              placeholder="z.B. 089 12345679"
            />
          </FormField>
        )}
      </div>

      <div className="border-t border-border pt-5 mt-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Rückrufer</h3>

        <FormField label="Rückrufer-Behandlung aktiv?" hint="Anrufer, die zurückrufen weil sie angerufen wurden">
          <div className="flex items-center gap-3">
            <Switch
              checked={data.rueckruferHandling}
              onCheckedChange={(checked) => onChange({ rueckruferHandling: checked })}
            />
            <span className="text-sm text-muted-foreground">
              {data.rueckruferHandling ? 'Ja – Weiterleitung' : 'Nein'}
            </span>
          </div>
        </FormField>

        {data.rueckruferHandling && (
          <FormField label="Weiterleitungsnummer für Rückrufer">
            <Input
              value={data.rueckruferTelefon}
              onChange={(e) => onChange({ rueckruferTelefon: e.target.value })}
              placeholder="z.B. 0049 2064 60 92 – 25"
            />
          </FormField>
        )}
      </div>

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
