'use client';

import Link from 'next/link';
import { matchPrograms } from '@/lib/matching';
import type { Business } from '@/types';

interface ProgramMatcherProps {
  business: Business;
}

export default function ProgramMatcher({ business }: ProgramMatcherProps) {
  const matches = matchPrograms(business).slice(0, 5);

  if (matches.length === 0) {
    return <p className="text-text-muted text-sm">No matched programs found. Try updating your profile.</p>;
  }

  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <Link
          key={match.resource.slug}
          href={`/resources/${match.resource.slug}`}
          className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-grimsby/40 transition-colors group"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-grimsby-pale flex items-center justify-center">
            <span className="text-sm font-bold text-grimsby">{match.matchPercentage}%</span>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-navy text-sm group-hover:text-grimsby transition-colors">{match.resource.name}</p>
            <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{match.reasons[0]}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
