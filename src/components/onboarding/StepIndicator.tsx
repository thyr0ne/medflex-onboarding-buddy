import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto mb-8">
      {steps.map((step, index) => {
        const isComplete = currentStep > step.id;
        const isActive = currentStep === step.id;
        
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isComplete
                    ? 'bg-step-complete text-primary-foreground'
                    : isActive
                    ? 'bg-step-active text-accent-foreground shadow-elevated'
                    : 'bg-step-inactive text-muted-foreground'
                }`}
              >
                {isComplete ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center max-w-[80px] leading-tight ${
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-[-1.5rem] transition-all duration-300 ${
                  currentStep > step.id ? 'bg-step-complete' : 'bg-step-inactive'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
