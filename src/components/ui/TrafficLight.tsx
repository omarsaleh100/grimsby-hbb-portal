import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { EligibilityResult } from '@/types';

interface TrafficLightProps {
  result: EligibilityResult;
  title: string;
  description: string;
}

const config: Record<EligibilityResult, {
  icon: typeof CheckCircle;
  bg: string;
  ring: string;
  iconColor: string;
  textColor: string;
}> = {
  green: {
    icon: CheckCircle,
    bg: 'bg-green-50',
    ring: 'ring-green-200',
    iconColor: 'text-green-600',
    textColor: 'text-green-800',
  },
  yellow: {
    icon: AlertTriangle,
    bg: 'bg-amber-50',
    ring: 'ring-amber-200',
    iconColor: 'text-amber-600',
    textColor: 'text-amber-800',
  },
  red: {
    icon: XCircle,
    bg: 'bg-red-50',
    ring: 'ring-red-200',
    iconColor: 'text-red-600',
    textColor: 'text-red-800',
  },
};

export default function TrafficLight({ result, title, description }: TrafficLightProps) {
  const { icon: Icon, bg, ring, iconColor, textColor } = config[result];

  return (
    <div className={`${bg} ring-1 ${ring} rounded-xl p-6 flex items-start gap-4`}>
      <div className={`${iconColor} flex-shrink-0 mt-0.5`}>
        <Icon size={32} />
      </div>
      <div>
        <h3 className={`text-lg font-semibold ${textColor} mb-1`}>{title}</h3>
        <p className={`text-sm ${textColor}/80 leading-relaxed`}>{description}</p>
      </div>
    </div>
  );
}
