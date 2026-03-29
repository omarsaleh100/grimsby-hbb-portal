import Link from 'next/link';
import { ClipboardList, BookOpen, Handshake, Globe, Users, Home, DollarSign, MapPin, Calendar, ArrowRight, GraduationCap } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Hero from '@/components/ui/Hero';
import StepCard from '@/components/ui/StepCard';
import ResourceCard from '@/components/ui/ResourceCard';
import CTABanner from '@/components/ui/CTABanner';
import { resources } from '@/data/resources';
import { events } from '@/data/events';

export default function HomePage() {
  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Home-Based Business Hub' }]} />

      {/* Hero */}
      <Hero
        title="Home-Based Business Hub"
        description="Starting or running a business from home in Grimsby? This is your one-stop resource for registration, local rules, funding programs, and support services — all in one place."
        buttons={[
          { label: 'Register Your Business', href: '/register', variant: 'primary' },
          { label: 'Am I Eligible? — Self-Assessment', href: '/self-assessment', variant: 'secondary' },
        ]}
      />

      {/* How It Works */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">How It Works</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Four simple steps to get your home-based business registered and connected to local support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard
              number={1}
              icon={<ClipboardList size={24} className="text-grimsby" />}
              title="Register"
              description="Sign up through our voluntary HBB registry. Tell us your business type, stage, and goals. It takes under 5 minutes."
              color="grimsby"
            />
            <StepCard
              number={2}
              icon={<BookOpen size={24} className="text-navy" />}
              title="Understand the Rules"
              description="Use our plain-language guide and self-assessment checklist to see what's allowed and which departments to contact."
              color="navy"
            />
            <StepCard
              number={3}
              icon={<Handshake size={24} className="text-grimsby" />}
              title="Get Matched"
              description="Based on your stage and needs, we'll connect you to the right programs — grants, mentorship, workshops, and more."
              color="grimsby"
            />
            <StepCard
              number={4}
              icon={<Globe size={24} className="text-navy" />}
              title="Grow & Connect"
              description="Access regional and provincial support. Get featured in 'Made in Grimsby' directories and local tourism initiatives."
              color="navy"
            />
          </div>
        </div>
      </section>

      {/* Resources & Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">Resources & Programs</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Grants, mentorship, training, and local support — curated for Grimsby home-based businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.slice(0, 6).map((r) => (
              <ResourceCard
                key={r.slug}
                icon={r.icon}
                iconBg={r.iconBg}
                title={r.name}
                description={r.shortDescription}
                href={`/resources/${r.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">Workshops</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Hands-on, half-day sessions designed to build real skills — part of the HBB Framework pilot program.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.filter(e => e.isReal).map((ws) => {
              const date = new Date(ws.date + 'T00:00:00');
              const month = date.toLocaleDateString('en-US', { month: 'short' });
              const day = date.getDate();
              return (
                <Link
                  key={ws.id}
                  href={`/events/${ws.slug}`}
                  className="group bg-white border border-border hover:border-grimsby hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="bg-grimsby-dark px-5 py-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">Featured Workshop</span>
                    <span className="text-xs text-white/70">$10 registration</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-grimsby-pale text-grimsby text-center px-3 py-2 shrink-0">
                        <div className="text-xs font-semibold uppercase">{month}</div>
                        <div className="text-2xl font-bold leading-tight">{day}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-navy group-hover:text-grimsby transition-colors leading-snug">
                          {ws.title}
                        </h3>
                        <p className="text-xs text-text-muted mt-1">{ws.time} · {ws.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed mb-4">{ws.description}</p>
                    <span className="inline-flex items-center gap-1 text-grimsby text-sm font-semibold group-hover:gap-2 transition-all">
                      View Full Schedule <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-grimsby text-white font-semibold hover:bg-grimsby-dark transition-colors"
            >
              <Calendar size={18} />
              View All Events & Workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats Banner */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Grimsby by the Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Users size={24} className="text-grimsby-light" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">2,235</p>
              <p className="text-white/70 text-sm">self-employed workers in Grimsby</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Home size={24} className="text-grimsby-light" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">28.3%</p>
              <p className="text-white/70 text-sm">of workforce works from home</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <DollarSign size={24} className="text-grimsby-light" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">$104,000</p>
              <p className="text-white/70 text-sm">median household income</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin size={24} className="text-grimsby-light" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">3.3M+</p>
              <p className="text-white/70 text-sm">annual visitors to Grimsby</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to get started?"
        description="Register your home-based business today — it's free, voluntary, and takes under 5 minutes."
        buttonText="Register Now"
        buttonHref="/register"
      />
    </>
  );
}
