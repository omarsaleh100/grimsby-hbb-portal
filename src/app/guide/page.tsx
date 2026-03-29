import { Ruler, UserMinus, SignpostBig, EyeOff, Car, Ban, Building2, HardHat, HeartPulse, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Hero from '@/components/ui/Hero';
import CTABanner from '@/components/ui/CTABanner';
import { homeOccupationRules, departmentContacts, comparisonData, faqs } from '@/data/zoning';

const ruleIcons = [
  <Ruler key="ruler" size={24} className="text-grimsby" />,
  <UserMinus key="userminus" size={24} className="text-grimsby" />,
  <SignpostBig key="signpost" size={24} className="text-grimsby" />,
  <EyeOff key="eyeoff" size={24} className="text-grimsby" />,
  <Car key="car" size={24} className="text-grimsby" />,
  <Ban key="ban" size={24} className="text-grimsby" />,
];

const deptIcons = [
  <Building2 key="building" size={24} className="text-navy" />,
  <HardHat key="hardhat" size={24} className="text-navy" />,
  <HeartPulse key="health" size={24} className="text-navy" />,
];

export default function GuidePage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'HBB Guide' }]} />

      <Hero
        title="Your Guide to Home-Based Business in Grimsby"
        description="A plain-language breakdown of the zoning rules, department contacts, and municipal comparisons you need to run a home-based business with confidence."
        buttons={[
          { label: 'Take the Self-Assessment', href: '/self-assessment', variant: 'primary' },
        ]}
      />

      {/* What's Allowed */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">What&apos;s Allowed</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Under By-law 14-45, home-based businesses in Grimsby must follow these rules.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeOccupationRules.map((rule, i) => (
              <div
                key={rule.title}
                className="bg-white rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-grimsby-pale flex items-center justify-center mb-4">
                  {ruleIcons[i]}
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">{rule.title}</h3>
                <p className="text-text-muted text-sm mb-4">{rule.description}</p>
                <ul className="space-y-2">
                  {rule.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-grimsby shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Which Department to Contact */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">Which Department to Contact</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Depending on your business type, you may need to reach out to one or more departments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departmentContacts.map((dept, i) => (
              <div
                key={dept.name}
                className="bg-white rounded-xl shadow-sm border border-border p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center mb-4">
                  {deptIcons[i]}
                </div>
                <h3 className="text-lg font-semibold text-navy mb-1">{dept.name}</h3>
                <p className="text-text-muted text-sm mb-4">{dept.role}</p>

                <div className="space-y-2 mb-4 text-sm">
                  <p className="text-text-muted">
                    <span className="font-medium text-navy">Phone:</span> {dept.phone}
                  </p>
                  <p className="text-text-muted">
                    <span className="font-medium text-navy">Email:</span>{' '}
                    <a href={`mailto:${dept.email}`} className="text-grimsby hover:underline">
                      {dept.email}
                    </a>
                  </p>
                </div>

                <h4 className="text-sm font-semibold text-navy mb-2">Contact them when:</h4>
                <ul className="space-y-1.5">
                  {dept.when.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-navy shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Grimsby Compares */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">How Grimsby Compares</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              See how Grimsby&apos;s home occupation rules stack up against other Ontario municipalities.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-4 py-3 font-semibold">Criterion</th>
                  <th className="text-left px-4 py-3 font-semibold bg-grimsby">Grimsby</th>
                  <th className="text-left px-4 py-3 font-semibold">Pickering</th>
                  <th className="text-left px-4 py-3 font-semibold">Mississauga</th>
                  <th className="text-left px-4 py-3 font-semibold">Toronto</th>
                  <th className="text-left px-4 py-3 font-semibold">Prince Edward County</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr
                    key={row.criterion}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-surface'}
                  >
                    <td className="px-4 py-3 font-medium text-navy">{row.criterion}</td>
                    <td className="px-4 py-3 text-grimsby font-medium bg-grimsby-pale/50">{row.grimsby}</td>
                    <td className="px-4 py-3 text-text-muted">{row.pickering}</td>
                    <td className="px-4 py-3 text-text-muted">{row.mississauga}</td>
                    <td className="px-4 py-3 text-text-muted">{row.toronto}</td>
                    <td className="px-4 py-3 text-text-muted">{row.princeEdward}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-3">Frequently Asked Questions</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Common questions about running a home-based business in Grimsby.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-border shadow-sm overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-navy font-medium hover:bg-surface transition-colors list-none">
                  <span>{faq.question}</span>
                  <span className="ml-4 text-grimsby transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-4 text-text-muted text-sm leading-relaxed border-t border-border pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">Not sure if your business qualifies?</h2>
          <p className="text-text-muted max-w-xl mx-auto mb-8">
            Our self-assessment tool walks you through the zoning requirements step by step and tells you what to do next.
          </p>
          <Link
            href="/self-assessment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-grimsby text-white font-medium rounded-lg hover:bg-grimsby-light transition-colors"
          >
            Take the Self-Assessment <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
