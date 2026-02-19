import { OnboardingData, Einrichtungstyp, VERFUEGBARE_SPRACHEN } from '@/types/onboarding';
import StepCard from './StepCard';
import FormField from './FormField';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import stepImage from '@/assets/step-welcome.jpg';

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
}

const einrichtungstypen: Einrichtungstyp[] = ['Praxis', 'MVZ', 'Klinikum', 'Andere'];

const placeholderByType: Record<Einrichtungstyp, string> = {
  Praxis: 'z.B. Hausarztpraxis Dr. Müller',
  MVZ: 'z.B. MVZ Zentrum für Gesundheit',
  Klinikum: 'z.B. Städtisches Klinikum Musterstadt',
  Andere: 'z.B. Therapiezentrum Musterstadt',
};

const StepGeneral = ({ data, onChange }: Props) => {
  return (
    <StepCard
      title="Allgemeine Informationen"
      description="Grundlegende Angaben zur Einrichtung und zum KI-Telefonassistenten."
      image={stepImage}
    >
      <FormField label="Art der Einrichtung">
        <Select
          value={data.einrichtungstyp}
          onValueChange={(v) => onChange({ einrichtungstyp: v as Einrichtungstyp })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {einrichtungstypen.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      {data.einrichtungstyp === 'Andere' && (
        <FormField label="Bitte spezifizieren">
          <Input
            value={data.einrichtungstypAndere}
            onChange={(e) => onChange({ einrichtungstypAndere: e.target.value })}
            placeholder="z.B. Physiotherapie, Tagesklinik, Pflegeeinrichtung"
          />
        </FormField>
      )}

      <FormField label="Name der Einrichtung">
        <Input
          value={data.einrichtungsName}
          onChange={(e) => onChange({ einrichtungsName: e.target.value })}
          placeholder={placeholderByType[data.einrichtungstyp]}
        />
      </FormField>

      <FormField label="Fachbereich">
        <Input
          value={data.fachbereich}
          onChange={(e) => onChange({ fachbereich: e.target.value })}
          placeholder="z.B. Allgemeinmedizin, Orthopädie, Kardiologie"
        />
      </FormField>

      <FormField label="Leistungsspektrum">
        <Input
          value={data.leistungsspektrum}
          onChange={(e) => onChange({ leistungsspektrum: e.target.value })}
          placeholder="z.B. Vorsorge, Labordiagnostik, Schmerztherapie"
        />
      </FormField>

      <FormField label="Hauptrufnummer" hint="Die reguläre Praxisnummer für Patienten">
        <Input
          value={data.hauptrufnummer}
          onChange={(e) => onChange({ hauptrufnummer: e.target.value })}
          placeholder="z.B. 089 12345678"
        />
      </FormField>

      <FormField label="Durchwahl für medflex" hint="Separate Nummer, damit die Praxis weiterhin erreichbar bleibt, wenn der Assistent aktiv ist">
        <Input
          value={data.durchwahlMedflex}
          onChange={(e) => onChange({ durchwahlMedflex: e.target.value })}
          placeholder="z.B. 089 12345679"
        />
      </FormField>

      <FormField label="Sprachen" hint="Wählen Sie die Sprachen, die der Assistent unterstützen soll">
        <div className="flex flex-wrap gap-2">
          {VERFUEGBARE_SPRACHEN.map((sprache) => {
            const isSelected = data.sprachen.includes(sprache);
            return (
              <button
                key={sprache}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    onChange({ sprachen: data.sprachen.filter(s => s !== sprache) });
                  } else {
                    onChange({ sprachen: [...data.sprachen, sprache] });
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                }`}
              >
                {sprache}
              </button>
            );
          })}
        </div>
      </FormField>

      <FormField label="Stimme des Assistenten">
        <Select value={data.stimme} onValueChange={(stimme) => onChange({ stimme })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weiblich">Weiblich</SelectItem>
            <SelectItem value="männlich">Männlich</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </StepCard>
  );
};

export default StepGeneral;
