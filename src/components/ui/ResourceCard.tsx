import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ResourceCardProps {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  href: string;
}

export default function ResourceCard({ icon, iconBg, title, description, href }: ResourceCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md hover:border-grimsby-light transition-all"
    >
      <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-grimsby transition-colors">
        {title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed mb-4">{description}</p>
      <span className="inline-flex items-center gap-1 text-grimsby text-sm font-medium group-hover:gap-2 transition-all">
        Learn more <ArrowRight size={14} />
      </span>
    </Link>
  );
}
