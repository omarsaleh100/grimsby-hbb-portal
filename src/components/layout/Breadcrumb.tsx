import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Build & Invest', href: '/' },
    ...items,
  ];

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-1 text-sm text-text-muted">
          {allItems.map((item, index) => (
            <span key={index} className="flex items-center gap-1">
              {index > 0 && <ChevronRight size={14} className="text-text-light" />}
              {item.href && index < allItems.length - 1 ? (
                <Link href={item.href} className="hover:text-navy transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={index === allItems.length - 1 ? 'text-navy font-medium' : ''}>
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
