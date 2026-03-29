import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Hero from '@/components/ui/Hero';
import SimulationBanner from '@/components/ui/SimulationBanner';
import ResourceSimulation from '@/components/features/ResourceSimulation';
import { resources } from '@/data/resources';

export async function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

interface ResourceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { slug } = await params;
  const resource = resources.find((r) => r.slug === slug);

  if (!resource) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Resources', href: '/resources' },
          { label: resource.name },
        ]}
      />

      <Hero title={resource.name} description={resource.shortDescription} />

      {/* Info Section */}
      <section className="bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-border p-8 space-y-8">
            {/* Full Description */}
            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">About This Program</h2>
              <p className="text-text-muted leading-relaxed">{resource.fullDescription}</p>
            </div>

            {/* Key Benefits */}
            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">Key Benefits</h2>
              <ul className="space-y-2">
                {resource.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <CheckCircle size={16} className="text-grimsby flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">Eligibility</h2>
              <ul className="space-y-2">
                {resource.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* How It Works */}
            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">How It Works</h2>
              <ol className="space-y-3">
                {resource.howItWorks.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center text-xs flex-shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* External Link */}
            {resource.website && (
              <div className="pt-2">
                <Link
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-navy text-white rounded-lg font-medium text-sm hover:bg-navy-light transition-colors"
                >
                  Visit {resource.name} Website
                  <ExternalLink size={16} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Simulated Integration Section */}
      <section className="bg-surface pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-50 rounded-xl border border-border p-8 space-y-6">
            <SimulationBanner partnerName={resource.name} />

            <div>
              <h2 className="text-xl font-semibold text-navy mb-1">
                {resource.simulatedFeature.title}
              </h2>
              <p className="text-text-muted text-sm">
                {resource.simulatedFeature.description}
              </p>
            </div>

            <ResourceSimulation slug={resource.slug} />
          </div>
        </div>
      </section>
    </>
  );
}
