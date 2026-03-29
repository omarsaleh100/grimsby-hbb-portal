'use client';

import { useState, useMemo } from 'react';
import { Search, ExternalLink, Star, ImageIcon } from 'lucide-react';
import { directoryListings } from '@/data/directory';
import type { BusinessType } from '@/types';

const CATEGORY_LABELS: Record<BusinessType, string> = {
  professional: 'Professional',
  creative: 'Creative',
  food: 'Food',
  retail: 'Retail',
  trades: 'Trades',
  tech: 'Tech',
  other: 'Other',
};

const CATEGORY_COLORS: Record<BusinessType, string> = {
  professional: 'bg-blue-100 text-blue-800',
  creative: 'bg-purple-100 text-purple-800',
  food: 'bg-orange-100 text-orange-800',
  retail: 'bg-pink-100 text-pink-800',
  trades: 'bg-amber-100 text-amber-800',
  tech: 'bg-cyan-100 text-cyan-800',
  other: 'bg-gray-100 text-gray-800',
};

export default function DirectoryGrid() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<BusinessType | 'all'>('all');
  const [featuredFirst, setFeaturedFirst] = useState(true);

  const filtered = useMemo(() => {
    let results = [...directoryListings];

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (l) =>
          l.businessName.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }

    if (category !== 'all') {
      results = results.filter((l) => l.category === category);
    }

    if (featuredFirst) {
      results.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
    }

    return results;
  }, [search, category, featuredFirst]);

  return (
    <div>
      {/* Search & Filter bar */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search businesses..."
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm focus:ring-2 focus:ring-grimsby focus:border-grimsby outline-none"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as BusinessType | 'all')}
            className="border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-grimsby focus:border-grimsby outline-none"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-text-muted whitespace-nowrap cursor-pointer">
            <input
              type="checkbox"
              checked={featuredFirst}
              onChange={(e) => setFeaturedFirst(e.target.checked)}
              className="accent-grimsby w-4 h-4"
            />
            Featured First
          </label>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <p className="text-sm text-text-muted">
          Showing {filtered.length} of {directoryListings.length} businesses
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filtered.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image placeholder */}
              <div className="h-40 bg-surface flex items-center justify-center">
                <ImageIcon size={32} className="text-text-light" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-navy">{listing.businessName}</h3>
                  {listing.featured && (
                    <span className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Star size={12} /> Featured
                    </span>
                  )}
                </div>
                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${CATEGORY_COLORS[listing.category]}`}>
                  {CATEGORY_LABELS[listing.category]}
                </span>
                <p className="text-sm text-text-muted mb-3 line-clamp-3">{listing.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {listing.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-surface text-text-muted px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {listing.website && (
                  <a
                    href={listing.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-grimsby hover:text-grimsby-light transition-colors"
                  >
                    Visit Website <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted">No businesses match your search. Try different keywords or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
