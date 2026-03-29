import { ReactNode } from 'react';

interface StepCardProps {
  number: number;
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
}

export default function StepCard({ number, icon, title, description, color = 'grimsby' }: StepCardProps) {
  const colorMap: Record<string, { border: string; badge: string }> = {
    grimsby: { border: 'border-t-grimsby', badge: 'bg-grimsby' },
    navy: { border: 'border-t-navy', badge: 'bg-navy' },
    blue: { border: 'border-t-navy-light', badge: 'bg-navy-light' },
  };
  const colors = colorMap[color] || colorMap.grimsby;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-border p-6 border-t-4 ${colors.border}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`w-8 h-8 rounded-full ${colors.badge} text-white text-sm font-bold flex items-center justify-center`}>
          {number}
        </span>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-navy mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}
