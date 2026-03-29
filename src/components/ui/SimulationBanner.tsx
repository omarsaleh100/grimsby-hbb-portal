import { AlertTriangle } from 'lucide-react';

interface SimulationBannerProps {
  partnerName: string;
}

export default function SimulationBanner({ partnerName }: SimulationBannerProps) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
      <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
      <p className="text-sm text-amber-800 leading-relaxed">
        <span className="font-semibold">Demonstration Only:</span> This is a demonstration of the
        proposed integrated experience between the Town of Grimsby portal and {partnerName}. This
        integration would become available if {partnerName} participates in the HBB framework.
      </p>
    </div>
  );
}
