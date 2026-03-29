import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Target,
  CheckCircle2,
  BookOpen,
  Handshake,
  ArrowRight,
  BadgeCheck,
} from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Hero from '@/components/ui/Hero';
import { workshops } from '@/data/workshops';
import { events } from '@/data/events';
import WorkshopRegistrationButton from './WorkshopRegistrationButton';

export async function generateStaticParams() {
  return workshops.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

interface WorkshopDetailPageProps {
  params: Promise<{ slug: string }>;
}

function getEventForWorkshop(slug: string) {
  return events.find((e) => e.slug === slug);
}

export default async function WorkshopDetailPage({ params }: WorkshopDetailPageProps) {
  const { slug } = await params;
  const workshop = workshops.find((w) => w.slug === slug);

  if (!workshop) {
    notFound();
  }

  const event = getEventForWorkshop(slug);
  const otherWorkshops = workshops.filter((w) => w.slug !== slug);

  function formatEventDate(dateStr: string) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Events & Workshops', href: '/events' },
          { label: workshop.title },
        ]}
      />

      <Hero title={workshop.title} description={workshop.subtitle} />

      {/* Overview Card */}
      <section className="bg-surface">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {event && (
                <>
                  <div className="flex items-start gap-3">
                    <CalendarDays size={20} className="text-grimsby flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-text-light uppercase tracking-wide">Date</p>
                      <p className="text-sm font-semibold text-navy">{formatEventDate(event.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-grimsby flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-text-light uppercase tracking-wide">Time</p>
                      <p className="text-sm font-semibold text-navy">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-grimsby flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-text-light uppercase tracking-wide">Location</p>
                      <p className="text-sm font-semibold text-navy">{event.location}</p>
                    </div>
                  </div>
                </>
              )}
              <div className="flex items-start gap-3">
                <BookOpen size={20} className="text-grimsby flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-text-light uppercase tracking-wide">Format</p>
                  <p className="text-sm font-semibold text-navy">{workshop.format}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign size={20} className="text-grimsby flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-text-light uppercase tracking-wide">Registration Fee</p>
                  <p className="text-sm font-semibold text-navy">$10</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Target size={20} className="text-grimsby flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-text-light uppercase tracking-wide">Who Should Attend</p>
                  <p className="text-sm font-semibold text-navy">{workshop.targetAudience}</p>
                </div>
              </div>
            </div>

            <WorkshopRegistrationButton title={workshop.title} />
          </div>
        </div>
      </section>

      {/* About This Workshop */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-navy mb-4">About This Workshop</h2>
          <p className="text-text-muted leading-relaxed max-w-3xl">{workshop.purpose}</p>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-surface">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-grimsby-pale rounded-lg flex items-center justify-center">
              <CheckCircle2 size={20} className="text-grimsby" />
            </div>
            <h2 className="text-2xl font-bold text-navy">What You&apos;ll Learn</h2>
          </div>
          <ol className="space-y-4">
            {workshop.learningObjectives.map((objective, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-grimsby text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-text-muted leading-relaxed pt-1">{objective}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-grimsby-pale rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-grimsby" />
            </div>
            <h2 className="text-2xl font-bold text-navy">Schedule</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-grimsby">
                  <th className="text-left py-3 px-4 font-semibold text-navy w-36">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy">Session</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy w-56">Format</th>
                </tr>
              </thead>
              <tbody>
                {workshop.modules.map((mod, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-surface' : 'bg-white'}>
                    <td className="py-3 px-4 text-text-muted font-medium whitespace-nowrap align-top">
                      {mod.time}
                    </td>
                    <td className="py-3 px-4 align-top">
                      {mod.description ? (
                        <details className="group">
                          <summary className="cursor-pointer font-medium text-navy hover:text-grimsby transition-colors list-none flex items-center gap-2">
                            <ArrowRight size={14} className="text-grimsby transition-transform group-open:rotate-90" />
                            {mod.title}
                          </summary>
                          <p className="mt-2 text-text-muted leading-relaxed pl-6">
                            {mod.description}
                          </p>
                        </details>
                      ) : (
                        <span className="font-medium text-navy">{mod.title}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-text-muted align-top">{mod.format}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who's Leading */}
      <section className="bg-surface">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-grimsby-pale rounded-lg flex items-center justify-center">
              <Handshake size={20} className="text-grimsby" />
            </div>
            <h2 className="text-2xl font-bold text-navy">Who&apos;s Leading This Workshop</h2>
          </div>
          <p className="text-text-muted leading-relaxed max-w-3xl">{workshop.facilitation}</p>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="bg-gradient-to-r from-grimsby-dark via-grimsby to-teal">
        <div className="max-w-5xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Register for This Workshop
          </h2>
          <p className="text-white/80 mb-6">
            $10 registration fee &middot; Limited to {workshop.participants} participants &middot; Refreshments included
          </p>
          <WorkshopRegistrationButton title={workshop.title} variant="light" />
        </div>
      </section>

      {/* Other Workshops */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-grimsby-pale rounded-lg flex items-center justify-center">
              <BadgeCheck size={20} className="text-grimsby" />
            </div>
            <h2 className="text-2xl font-bold text-navy">Other Workshops in This Series</h2>
          </div>
          <p className="text-text-muted text-sm mb-6">
            All three workshops are designed to be attended as a cohort — building skills and peer networks across sessions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherWorkshops.map((w) => {
              const otherEvent = getEventForWorkshop(w.slug);
              return (
                <Link
                  key={w.slug}
                  href={`/events/${w.slug}`}
                  className="block bg-surface rounded-xl border border-border p-6 hover:shadow-md hover:border-grimsby transition-all group"
                >
                  <h3 className="text-lg font-semibold text-navy group-hover:text-grimsby transition-colors mb-2">
                    {w.title}
                  </h3>
                  <p className="text-sm text-text-muted mb-3">{w.subtitle}</p>
                  {otherEvent && (
                    <div className="flex flex-wrap gap-3 text-xs text-text-light">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={12} />
                        {formatEventDate(otherEvent.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {otherEvent.location}
                      </span>
                    </div>
                  )}
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-grimsby mt-3">
                    View Details <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <p className="text-xs text-text-light text-center">
            This workshop is part of the Grimsby Home-Based Business Identification and Growth Framework pilot program.
          </p>
        </div>
      </section>
    </>
  );
}
