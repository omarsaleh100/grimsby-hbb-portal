'use client';

import { useState } from 'react';
import { Search, Compass, Handshake, HeartHandshake } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Hero from '@/components/ui/Hero';
import ResourceCard from '@/components/ui/ResourceCard';
import CTABanner from '@/components/ui/CTABanner';
import { resources } from '@/data/resources';

type FilterTab = 'all' | 'grimsby' | 'funding' | 'mentorship' | 'innovation' | 'tourism';

const tabs: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All Programs' },
  { id: 'grimsby', label: 'Grimsby-Specific' },
  { id: 'funding', label: 'Funding & Grants' },
  { id: 'mentorship', label: 'Mentorship & Training' },
  { id: 'innovation', label: 'Innovation & Growth' },
  { id: 'tourism', label: 'Tourism & Visibility' },
];

const fundingSlugs = new Set(['starter-company-plus', 'venture-niagara', 'digital-main-street', 'futurpreneur']);
const mentorshipSlugs = new Set(['enterprise-centre', 'innovate-niagara', 'futurpreneur', 'starter-company-plus']);
const innovationSlugs = new Set(['innovate-niagara', 'brock-university', 'niagara-college', 'digital-main-street']);
const tourismSlugs = new Set(['made-in-grimsby', 'chamber-of-commerce']);

function filterResources(tab: FilterTab) {
  switch (tab) {
    case 'grimsby':
      return resources.filter((r) => r.isGrimsbySpecific);
    case 'funding':
      return resources.filter((r) => fundingSlugs.has(r.slug));
    case 'mentorship':
      return resources.filter((r) => mentorshipSlugs.has(r.slug));
    case 'innovation':
      return resources.filter((r) => innovationSlugs.has(r.slug));
    case 'tourism':
      return resources.filter((r) => tourismSlugs.has(r.slug));
    default:
      return resources;
  }
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const filtered = filterResources(activeTab);

  return (
    <>
      <Breadcrumb items={[{ label: 'Resources & Programs' }]} />

      <Hero
        title="Resources & Programs"
        description="Discover grants, mentorship, training, and support services available to Grimsby home-based businesses. We connect you to the right programs based on your needs and stage of growth."
      />

      {/* Filter Tabs */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-surface text-text-muted hover:bg-gray-200 hover:text-navy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Grid */}
      <section className="bg-surface">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-sm text-text-muted mb-6">
            Showing {filtered.length} program{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => (
              <ResourceCard
                key={resource.slug}
                icon={resource.icon}
                iconBg={resource.iconBg}
                title={resource.name}
                description={resource.shortDescription}
                href={`/resources/${resource.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-navy text-center mb-2">How We Help</h2>
          <p className="text-text-muted text-center mb-10 max-w-2xl mx-auto">
            The Town of Grimsby acts as a coordinator, connecting you with the right programs and partners for your stage of business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-grimsby-pale flex items-center justify-center mx-auto mb-4">
                <Search className="text-grimsby" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">We Identify</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                We help you find the right programs based on your business type, stage, and needs. No more searching through dozens of websites.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-grimsby-pale flex items-center justify-center mx-auto mb-4">
                <Compass className="text-grimsby" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">We Connect</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                We introduce you to partners, mentors, and funding sources across the Niagara region. Our relationships open doors.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-grimsby-pale flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="text-grimsby" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2">We Support</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                We guide you through the application process, from paperwork to follow-up. You are never on your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Not sure which program is right for you?"
        description="Take our Self-Assessment or Register to get matched with the best programs for your business."
        buttonText="Take Self-Assessment"
        buttonHref="/self-assessment"
      />
    </>
  );
}
