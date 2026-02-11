import { useState, useCallback, useRef } from 'react';
import { OnboardingData, defaultOnboardingData, MlfxFile, MLFX_VERSION } from '@/types/onboarding';
import StepIndicator from '@/components/onboarding/StepIndicator';
import StepGeneral from '@/components/onboarding/StepGeneral';
import StepCallers from '@/components/onboarding/StepCallers';
import StepEmergency from '@/components/onboarding/StepEmergency';
import StepRequests from '@/components/onboarding/StepRequests';
import StepKnowledge from '@/components/onboarding/StepKnowledge';
import StepSummary from '@/components/onboarding/StepSummary';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Phone, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

const STEPS = [
  { id: 1, title: 'Allgemein' },
  { id: 2, title: 'Anrufer' },
  { id: 3, title: 'Notfälle' },
  { id: 4, title: 'Anfragen' },
  { id: 5, title: 'Wissen' },
  { id: 6, title: 'Übersicht' },
];

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback((partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const nextStep = () => {
    if (currentStep < STEPS.length) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  // ── .mlfx Export ──
  const exportMlfx = useCallback(() => {
    const mlfx: MlfxFile = {
      version: MLFX_VERSION,
      exportedAt: new Date().toISOString(),
      data,
    };
    const blob = new Blob([JSON.stringify(mlfx, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(data.einrichtungsName || 'Konfiguration').replace(/\s+/g, '_')}.mlfx`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Konfiguration exportiert (.mlfx)');
  }, [data]);

  // ── .mlfx Import ──
  const importMlfx = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed: MlfxFile = JSON.parse(ev.target?.result as string);
        if (!parsed.data || !parsed.version) {
          toast.error('Ungültige .mlfx-Datei');
          return;
        }
        setData({ ...defaultOnboardingData, ...parsed.data });
        setCurrentStep(1);
        toast.success('Konfiguration erfolgreich geladen!');
      } catch {
        toast.error('Datei konnte nicht gelesen werden');
      }
    };
    reader.readAsText(file);
    // reset so same file can be re-imported
    e.target.value = '';
  }, []);

  // ── PDF Export ──
  const exportPdf = useCallback(async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let y = 20;

    const addHeader = () => {
      doc.setFillColor(26, 58, 92);
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Konzept KI-Telefonassistent', margin, 18);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(data.einrichtungsName || 'Einrichtung', margin, 28);
      doc.setFontSize(8);
      doc.text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, margin, 35);
      y = 50;
    };

    const checkPage = (needed: number) => {
      if (y + needed > 280) { doc.addPage(); y = 20; }
    };

    const addSection = (title: string) => {
      checkPage(20);
      doc.setFillColor(240, 245, 250);
      doc.rect(margin, y - 4, contentWidth, 10, 'F');
      doc.setTextColor(26, 58, 92);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin + 3, y + 3);
      y += 12;
    };

    const addRow = (label: string, value: string) => {
      checkPage(10);
      doc.setTextColor(100, 110, 120);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(label, margin + 3, y);
      doc.setTextColor(30, 40, 50);
      doc.setFont('helvetica', 'bold');
      const lines = doc.splitTextToSize(value || '–', contentWidth - 65);
      doc.text(lines, margin + 60, y);
      y += Math.max(lines.length * 5, 7);
    };

    addHeader();

    addSection('Allgemeine Informationen');
    addRow('Typ', data.einrichtungstyp);
    addRow('Name', data.einrichtungsName);
    addRow('Fachbereich', data.fachbereich);
    addRow('Telefon', data.telefonnummer);
    addRow('Sprachen', data.sprachen.join(', '));
    addRow('Stimme', data.stimme);

    addSection('Datenschutz & Begrüßung');
    addRow('Datenschutz Website', data.datenschutzWebsite ? 'Ja' : 'Nein');
    addRow('Datenschutz Ansage', data.datenschutzAnsage ? 'Ja' : 'Nein');
    addRow('Hinweis 112', data.hinweis112 ? 'Ja' : 'Nein');
    if (data.begruessung) addRow('Begrüßung', data.begruessung);

    addSection('Anrufer-Typen');
    addRow('Neupatienten', data.neupatientenAufnahme ? 'Ja' : 'Nein');
    addRow('Versicherungen', data.versicherungsarten.join(', '));
    addRow('Zuweiser durchstellen', data.zuweiserDurchstellen ? 'Ja' : 'Nein');
    if (data.zuweiserTelefon) addRow('Zuweiser-Telefon', data.zuweiserTelefon);

    addSection('Notfallbearbeitung');
    addRow('Intern bearbeitet', data.notfaelleIntern ? 'Ja' : 'Nein');
    addRow('Schlüsselwörter', data.notfallSchlagwoerter.join(', '));
    if (data.notfallTelefon) addRow('Notfallnummer', data.notfallTelefon);

    addSection('Anfragetypen');
    addRow('Terminarten', data.terminarten.join(', '));
    addRow('Termin-Datenerfassung', data.terminDatenerfassung.join(', '));
    if (data.terminRegeln) addRow('Terminregeln', data.terminRegeln);
    addRow('Rezept für', data.rezeptVerfuegbar.join(', '));
    if (data.rezeptRegeln) addRow('Rezeptregeln', data.rezeptRegeln);
    addRow('Befund für', data.befundVerfuegbar.join(', '));
    addRow('Sonstiges', data.sonstigesAnliegen ? 'Ja' : 'Nein');

    addSection('Knowledge Base');
    addRow('Adresse', data.adresse);
    addRow('Öffnungszeiten', data.oeffnungszeiten);
    addRow('Parkhinweise', data.parkhinweise);
    addRow('Behandler', data.behandlerListe);
    addRow('Leistungen', data.leistungen);
    addRow('Besonderheiten', data.besonderheiten);

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(26, 58, 92);
      doc.rect(0, 287, pageWidth, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.text('medflex KI-Telefonassistent – Onboarding-Konzept', margin, 293);
      doc.text(`Seite ${i} / ${pageCount}`, pageWidth - margin - 20, 293);
    }

    const filename = `Konzept_KI_Telefonassistent_${(data.einrichtungsName || 'Einrichtung').replace(/\s+/g, '_')}.pdf`;
    doc.save(filename);
    toast.success('PDF wurde erfolgreich erstellt!');
  }, [data]);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepGeneral data={data} onChange={handleChange} />;
      case 2: return <StepCallers data={data} onChange={handleChange} />;
      case 3: return <StepEmergency data={data} onChange={handleChange} />;
      case 4: return <StepRequests data={data} onChange={handleChange} />;
      case 5: return <StepKnowledge data={data} onChange={handleChange} />;
      case 6: return <StepSummary data={data} onExportPdf={exportPdf} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold">medflex KI-Telefonassistent</h1>
              <p className="text-sm text-primary-foreground/70">Onboarding & Konfiguration</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 gap-1.5"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Laden</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportMlfx}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Speichern</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".mlfx"
              onChange={importMlfx}
              className="hidden"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        <div className="mt-6">{renderStep()}</div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pb-12">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </Button>
          {currentStep < STEPS.length && (
            <Button onClick={nextStep} className="gap-2 gradient-primary text-primary-foreground">
              Weiter
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
