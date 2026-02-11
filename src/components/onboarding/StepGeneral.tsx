import { OnboardingData, Einrichtungstyp } from '@/types/onboarding';
import StepCard from './StepCard';
import FormField from './FormField';
import TagInput from './TagInput';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import stepImage from '@/assets/step-welcome.jpg';

interface Props {
  data: OnboardingData;
  onChange: (data: Partial<OnboardingData>) => void;
}

const einrichtungstypen: Einrichtungstyp[] = ['Praxis', 'MVZ', 'Klinikum', 'Sonstige'];

const placeholderByType: Record<Einrichtungstyp, string> = {
  Praxis: 'z.B. Hausarztpraxis Dr. Müller',
  MVZ: 'z.B. MVZ Zentrum für Gesundheit',
  Klinikum: 'z.B. Städtisches Klinikum Musterstadt',
  Sonstige: 'z.B. Therapiezentrum Musterstadt',
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

      <FormField label="Name der Einrichtung">
        <Input
          value={data.einrichtungsName}
          onChange={(e) => onChange({ einrichtungsName: e.target.value })}
          placeholder={placeholderByType[data.einrichtungstyp]}
        />
      </FormField>

      <FormField label="Fachbereich / Leistungsspektrum">
        <Input
          value={data.fachbereich}
          onChange={(e) => onChange({ fachbereich: e.target.value })}
          placeholder="z.B. Allgemeinmedizin, Orthopädie, Zahnmedizin"
        />
      </FormField>

      <FormField label="Telefonnummer">
        <Input
          value={data.telefonnummer}
          onChange={(e) => onChange({ telefonnummer: e.target.value })}
          placeholder="z.B. 089 12345678"
        />
      </FormField>

      <FormField label="Sprachen">
        <TagInput
          tags={data.sprachen}
          onChange={(sprachen) => onChange({ sprachen })}
          placeholder="Sprache hinzufügen..."
        />
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

      <FormField label="Beispiel-Begrüßung" hint="Passen Sie die Begrüßung an Ihre Einrichtung an.">
        <Textarea
          value={data.begruessung}
          onChange={(e) => onChange({ begruessung: e.target.value })}
          placeholder='z.B. "Herzlich willkommen bei [Name]. Ich bin Lisa, die KI-Telefonassistentin. Wie kann ich Ihnen helfen?"'
          rows={4}
        />
      </FormField>
    </StepCard>
  );
};

export default StepGeneral;
