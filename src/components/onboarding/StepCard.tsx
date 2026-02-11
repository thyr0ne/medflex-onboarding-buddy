import { ReactNode } from 'react';

interface StepCardProps {
  title: string;
  description: string;
  image?: string;
  children: ReactNode;
}

const StepCard = ({ title, description, image, children }: StepCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
      {image && (
        <div className="w-full h-48 overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
};

export default StepCard;
