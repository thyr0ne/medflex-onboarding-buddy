import { OnboardingData } from '@/types/onboarding';
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

const StepGeneral = ({ data, onChange }: Props) => {
  return (
    <StepCard
      title="Allgemeine Informationen"
      description="Grundlegende Angaben zur Praxis und zum KI-Telefonassistenten."
      image={stepImage}
    >
      <FormField label="Name der Praxis">
        <Input
          value={data.praxisName}
          onChange={(e) => onChange({ praxisName: e.target.value })}
          placeholder="z.B. Zahnarztpraxis Dr. Müller"
        />
      </FormField>

      <FormField label="Fachbereich / Leistungsspektrum">
        <Input
          value={data.fachbereich}
          onChange={(e) => onChange({ fachbereich: e.target.value })}
          placeholder="z.B. Zahnmedizin, Kieferorthopädie"
        />
      </FormField>

      <FormField label="Telefonnummer der Praxis">
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

      <FormField label="Beispiel-Begrüßung" hint="Passen Sie die Begrüßung an Ihre Praxis an.">
        <Textarea
          value={data.begruessung}
          onChange={(e) => onChange({ begruessung: e.target.value })}
          placeholder='z.B. "Herzlich willkommen in der Zahnarztpraxis Dr. Müller. Ich bin Lisa, die KI-Telefonassistentin. Wie kann ich Ihnen helfen?"'
          rows={4}
        />
      </FormField>
    </StepCard>
  );
};

export default StepGeneral;
