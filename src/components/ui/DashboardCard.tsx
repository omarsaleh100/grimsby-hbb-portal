import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export default function DashboardCard({ title, children, icon }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-surface-card">
        {icon && <span className="text-grimsby">{icon}</span>}
        <h3 className="text-sm font-semibold text-navy">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
