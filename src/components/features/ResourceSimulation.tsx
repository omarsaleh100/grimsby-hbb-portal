'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Calendar, User, MapPin, Clock, Star, ExternalLink, Upload, CheckCircle } from 'lucide-react';

interface ResourceSimulationProps {
  slug: string;
}

/* ------------------------------------------------------------------ */
/*  Shared UI helpers                                                  */
/* ------------------------------------------------------------------ */

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i < current
                ? 'bg-grimsby text-white'
                : i === current
                  ? 'bg-navy text-white'
                  : 'bg-gray-200 text-text-muted'
            }`}
          >
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          <span className={`text-sm hidden sm:inline ${i === current ? 'font-medium text-navy' : 'text-text-muted'}`}>
            {label}
          </span>
          {i < steps.length - 1 && <div className="w-8 h-px bg-gray-300" />}
        </div>
      ))}
    </div>
  );
}

function NavButtons({
  step,
  maxStep,
  onBack,
  onNext,
  nextLabel,
  disableNext,
}: {
  step: number;
  maxStep: number;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  disableNext?: boolean;
}) {
  return (
    <div className="flex justify-between mt-8">
      {step > 0 ? (
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-4 py-2 text-sm border border-border rounded-lg hover:bg-surface transition-colors"
        >
          <ChevronLeft size={16} /> Back
        </button>
      ) : (
        <div />
      )}
      {step < maxStep && (
        <button
          onClick={onNext}
          disabled={disableNext}
          className="flex items-center gap-1 px-5 py-2 text-sm bg-navy text-white rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {nextLabel || 'Next'} <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}

function ConfirmationCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-grimsby-pale border border-grimsby-light/30 rounded-xl p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-grimsby/10 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="text-grimsby" size={28} />
      </div>
      <h4 className="text-lg font-semibold text-navy mb-2">{title}</h4>
      {children}
    </div>
  );
}

const inputClass =
  'w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-grimsby/30 focus:border-grimsby';
const selectClass =
  'w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-grimsby/30 focus:border-grimsby';
const labelClass = 'block text-sm font-medium text-navy mb-1';

/* ------------------------------------------------------------------ */
/*  1. Starter Company Plus                                            */
/* ------------------------------------------------------------------ */

function StarterCompanyPlus() {
  const [step, setStep] = useState(0);
  const [eligible, setEligible] = useState<boolean | null>(null);
  const [form, setForm] = useState({ age: '', resident: '', businessType: '', fullTime: '' });
  const [app, setApp] = useState({ businessName: '', planSummary: '', amount: '5000', matchCommitment: false });

  const checkEligibility = () => {
    const isEligible =
      form.age === 'yes' && form.resident === 'yes' && form.fullTime === 'yes';
    setEligible(isEligible);
    setStep(1);
  };

  return (
    <>
      <StepIndicator steps={['Check Eligibility', 'Preview Application', 'Confirmation']} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Check Your Eligibility</h4>
          <div>
            <label className={labelClass}>Are you 18 years of age or older?</label>
            <select className={selectClass} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Are you a Canadian citizen or permanent resident in Ontario?</label>
            <select className={selectClass} value={form.resident} onChange={(e) => setForm({ ...form, resident: e.target.value })}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>What type of business are you starting?</label>
            <select className={selectClass} value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })}>
              <option value="">Select...</option>
              <option value="product">Product-based</option>
              <option value="service">Service-based</option>
              <option value="food">Food & Beverage</option>
              <option value="tech">Technology</option>
              <option value="creative">Creative / Arts</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Will you commit to operating the business full-time?</label>
            <select className={selectClass} value={form.fullTime} onChange={(e) => setForm({ ...form, fullTime: e.target.value })}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <NavButtons
            step={0}
            maxStep={2}
            onBack={() => {}}
            onNext={checkEligibility}
            nextLabel="Check Eligibility"
            disableNext={!form.age || !form.resident || !form.businessType || !form.fullTime}
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          {eligible ? (
            <>
              <div className="bg-grimsby-pale border border-grimsby-light/30 rounded-lg p-4 mb-4">
                <p className="text-grimsby font-medium">You appear to meet the basic eligibility requirements.</p>
              </div>
              <h4 className="font-semibold text-navy">Preview Application</h4>
              <div>
                <label className={labelClass}>Business Name</label>
                <input className={inputClass} value={app.businessName} onChange={(e) => setApp({ ...app, businessName: e.target.value })} placeholder="e.g. Grimsby Candles Co." />
              </div>
              <div>
                <label className={labelClass}>Business Plan Summary</label>
                <textarea className={`${inputClass} h-24`} value={app.planSummary} onChange={(e) => setApp({ ...app, planSummary: e.target.value })} placeholder="Briefly describe your business concept, target market, and goals..." />
              </div>
              <div>
                <label className={labelClass}>Requested Grant Amount (up to $5,000)</label>
                <input type="number" min="1000" max="5000" step="500" className={inputClass} value={app.amount} onChange={(e) => setApp({ ...app, amount: e.target.value })} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={app.matchCommitment} onChange={(e) => setApp({ ...app, matchCommitment: e.target.checked })} className="rounded" />
                I understand I must contribute a 25% personal financial match (${Math.round(Number(app.amount) * 0.25).toLocaleString()})
              </label>
            </>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-medium">Based on your answers, you may not meet all eligibility requirements.</p>
              <p className="text-red-600 text-sm mt-1">Contact the St. Catharines Enterprise Centre to discuss your specific situation.</p>
            </div>
          )}
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} />
        </div>
      )}

      {step === 2 && (
        <ConfirmationCard title="Pre-Application Complete">
          <p className="text-text-muted text-sm">
            Your pre-application would be submitted to the St. Catharines Enterprise Centre for review.
          </p>
          <p className="text-text-muted text-sm mt-2">Expected timeline: 2-4 weeks for initial response.</p>
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </ConfirmationCard>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Enterprise Centre                                               */
/* ------------------------------------------------------------------ */

function EnterpriseCentre() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  const services = [
    { id: 'plan', title: 'Business Plan Review', desc: 'Get expert feedback on your business plan and financial projections.', icon: '📋' },
    { id: 'marketing', title: 'Marketing Consultation', desc: 'Develop a marketing strategy to reach your target customers.', icon: '📣' },
    { id: 'financial', title: 'Financial Planning', desc: 'Review your financial structure, pricing, and cash flow.', icon: '💵' },
    { id: 'startup', title: 'Startup Guidance', desc: 'Get step-by-step guidance on launching your new business.', icon: '🚀' },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const times = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM'];
  const unavailable = new Set(['Mon-10:30 AM', 'Tue-9:00 AM', 'Wed-2:30 PM', 'Thu-1:00 PM', 'Fri-9:00 AM', 'Fri-10:30 AM']);

  return (
    <>
      <StepIndicator steps={['Choose a Service', 'Book Consultation', 'Confirmation']} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Choose a Service</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedService === s.id
                    ? 'border-grimsby bg-grimsby-pale shadow-sm'
                    : 'border-border hover:border-grimsby-light hover:shadow-sm'
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <h5 className="font-medium text-navy mt-2">{s.title}</h5>
                <p className="text-sm text-text-muted mt-1">{s.desc}</p>
              </button>
            ))}
          </div>
          <NavButtons step={0} maxStep={2} onBack={() => {}} onNext={() => setStep(1)} disableNext={!selectedService} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Book a Consultation</h4>
          <p className="text-sm text-text-muted">Select an available time slot for your free consultation.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left text-text-muted"></th>
                  {days.map((d) => (
                    <th key={d} className="p-2 text-center font-medium text-navy">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {times.map((t) => (
                  <tr key={t}>
                    <td className="p-2 text-text-muted whitespace-nowrap">{t}</td>
                    {days.map((d) => {
                      const key = `${d}-${t}`;
                      const isUnavail = unavailable.has(key);
                      const isSelected = selectedSlot === key;
                      return (
                        <td key={key} className="p-1 text-center">
                          <button
                            disabled={isUnavail}
                            onClick={() => setSelectedSlot(key)}
                            className={`w-full py-2 rounded-md text-xs transition-all ${
                              isUnavail
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-grimsby text-white'
                                  : 'bg-surface hover:bg-grimsby-pale text-navy'
                            }`}
                          >
                            {isUnavail ? 'Booked' : isSelected ? 'Selected' : 'Open'}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} disableNext={!selectedSlot} />
        </div>
      )}

      {step === 2 && (
        <ConfirmationCard title="Consultation Booked">
          <p className="text-text-muted text-sm">
            Your appointment would be confirmed at St. Catharines Enterprise Centre.
          </p>
          <p className="text-text-muted text-sm mt-2">
            <span className="font-medium">Service:</span> {services.find((s) => s.id === selectedService)?.title}
          </p>
          <p className="text-text-muted text-sm">
            <span className="font-medium">Time:</span> {selectedSlot.replace('-', ' at ')}
          </p>
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </ConfirmationCard>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Innovate Niagara                                                */
/* ------------------------------------------------------------------ */

function InnovateNiagara() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ businessName: '', sector: '', stage: '', challenge: '' });
  const [selectedDate, setSelectedDate] = useState('');

  const mentor = {
    name: 'Dr. Sarah Chen',
    expertise: 'Technology Commercialization & Growth Strategy',
    bio: 'Former CTO of a Niagara-based SaaS company with 15+ years helping startups scale. Specializes in product-market fit and go-to-market strategies.',
    match: '92%',
  };

  const meetingSlots = ['Monday, Apr 7 at 10:00 AM', 'Wednesday, Apr 9 at 2:00 PM', 'Thursday, Apr 10 at 11:00 AM', 'Friday, Apr 11 at 3:00 PM'];

  return (
    <>
      <StepIndicator steps={['About Your Business', 'Mentor Match', 'Schedule Meeting']} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Tell Us About Your Business</h4>
          <div>
            <label className={labelClass}>Business Name</label>
            <input className={inputClass} value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} placeholder="Your business name" />
          </div>
          <div>
            <label className={labelClass}>Sector / Industry</label>
            <select className={selectClass} value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })}>
              <option value="">Select...</option>
              <option value="tech">Technology / Software</option>
              <option value="food">Food & Beverage</option>
              <option value="health">Health & Wellness</option>
              <option value="creative">Creative Industries</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Professional Services</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Business Stage</label>
            <select className={selectClass} value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}>
              <option value="">Select...</option>
              <option value="idea">Idea / Concept</option>
              <option value="startup">Early Startup</option>
              <option value="growth">Growth Stage</option>
              <option value="scaling">Scaling</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Main Challenge</label>
            <textarea className={`${inputClass} h-20`} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} placeholder="Describe the main challenge you need help with..." />
          </div>
          <NavButtons step={0} maxStep={2} onBack={() => {}} onNext={() => setStep(1)} disableNext={!form.businessName || !form.sector || !form.stage} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Your Mentor Match</h4>
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                <User className="text-navy" size={28} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-navy text-lg">{mentor.name}</h5>
                  <span className="bg-grimsby-pale text-grimsby text-sm font-medium px-3 py-1 rounded-full">{mentor.match} Match</span>
                </div>
                <p className="text-grimsby text-sm font-medium mt-1">{mentor.expertise}</p>
                <p className="text-text-muted text-sm mt-2">{mentor.bio}</p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-surface text-text-muted text-xs px-2 py-1 rounded">Innovation Strategy</span>
                  <span className="bg-surface text-text-muted text-xs px-2 py-1 rounded">Market Analysis</span>
                  <span className="bg-surface text-text-muted text-xs px-2 py-1 rounded">Fundraising</span>
                </div>
              </div>
            </div>
          </div>
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} />
        </div>
      )}

      {step === 2 && !selectedDate && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Schedule Your First Meeting</h4>
          <p className="text-sm text-text-muted">Choose a time for your introductory meeting with {mentor.name}.</p>
          <div className="grid gap-3">
            {meetingSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedDate(slot)}
                className="flex items-center gap-3 p-4 border border-border rounded-lg hover:border-grimsby hover:bg-grimsby-pale transition-all text-left"
              >
                <Calendar size={18} className="text-grimsby" />
                <span className="text-sm font-medium text-navy">{slot}</span>
              </button>
            ))}
          </div>
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </div>
      )}

      {step === 2 && selectedDate && (
        <ConfirmationCard title="Meeting Scheduled">
          <p className="text-text-muted text-sm">Your introductory meeting with {mentor.name} would be confirmed.</p>
          <p className="text-text-muted text-sm mt-2"><span className="font-medium">Date:</span> {selectedDate}</p>
          <p className="text-text-muted text-sm"><span className="font-medium">Location:</span> Innovate Niagara, Brock University</p>
          <NavButtons step={2} maxStep={2} onBack={() => { setSelectedDate(''); setStep(1); }} onNext={() => {}} />
        </ConfirmationCard>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Venture Niagara                                                 */
/* ------------------------------------------------------------------ */

function VentureNiagara() {
  const [step, setStep] = useState(0);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [businessAge, setBusinessAge] = useState('');
  const [revenue, setRevenue] = useState('');
  const [purpose, setPurpose] = useState('');
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  const rate = loanAmount > 150000 ? 8.5 : loanAmount > 75000 ? 7.5 : 6.5;
  const termYears = loanAmount > 100000 ? 7 : 5;
  const monthlyPayment = Math.round((loanAmount * (rate / 100 / 12)) / (1 - Math.pow(1 + rate / 100 / 12, -termYears * 12)));

  const documents = [
    'Business plan with financial projections',
    'Last 2 years of financial statements',
    'Personal and business tax returns',
    'Bank statements (last 6 months)',
    'Proof of business registration',
    'Government-issued photo ID',
    'Accounts receivable / payable aging report',
  ];

  const toggleDoc = (doc: string) => {
    const next = new Set(checkedDocs);
    if (next.has(doc)) next.delete(doc);
    else next.add(doc);
    setCheckedDocs(next);
  };

  return (
    <>
      <StepIndicator steps={['Pre-Qualification', 'Your Estimate', 'Document Checklist']} current={step} />

      {step === 0 && (
        <div className="space-y-5">
          <h4 className="font-semibold text-navy">Loan Pre-Qualification</h4>
          <div>
            <label className={labelClass}>How much do you need?</label>
            <input
              type="range"
              min={5000}
              max={250000}
              step={5000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-grimsby"
            />
            <div className="flex justify-between text-sm text-text-muted mt-1">
              <span>$5,000</span>
              <span className="font-semibold text-navy text-base">${loanAmount.toLocaleString()}</span>
              <span>$250,000</span>
            </div>
          </div>
          <div>
            <label className={labelClass}>How long has your business been operating?</label>
            <select className={selectClass} value={businessAge} onChange={(e) => setBusinessAge(e.target.value)}>
              <option value="">Select...</option>
              <option value="pre">Pre-launch</option>
              <option value="0-1">Less than 1 year</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Estimated Annual Revenue</label>
            <select className={selectClass} value={revenue} onChange={(e) => setRevenue(e.target.value)}>
              <option value="">Select...</option>
              <option value="pre">Pre-revenue</option>
              <option value="0-50k">Under $50,000</option>
              <option value="50-100k">$50,000 - $100,000</option>
              <option value="100-250k">$100,000 - $250,000</option>
              <option value="250k+">Over $250,000</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Purpose of Loan</label>
            <select className={selectClass} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              <option value="">Select...</option>
              <option value="startup">Startup costs</option>
              <option value="equipment">Equipment purchase</option>
              <option value="expansion">Business expansion</option>
              <option value="inventory">Inventory</option>
              <option value="working">Working capital</option>
              <option value="other">Other</option>
            </select>
          </div>
          <NavButtons step={0} maxStep={2} onBack={() => {}} onNext={() => setStep(1)} disableNext={!businessAge || !revenue || !purpose} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Your Estimate</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Loan Amount', value: `$${loanAmount.toLocaleString()}` },
              { label: 'Rate Range', value: `${rate - 1}% - ${rate + 1}%` },
              { label: 'Term Length', value: `${termYears} years` },
              { label: 'Est. Monthly', value: `$${monthlyPayment.toLocaleString()}` },
            ].map((item) => (
              <div key={item.label} className="bg-surface rounded-xl p-4 text-center">
                <p className="text-xs text-text-muted mb-1">{item.label}</p>
                <p className="text-lg font-bold text-navy">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-muted">
            Estimates are for illustration only. Actual terms depend on full application review by the Venture Niagara investment committee.
          </p>
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Document Checklist</h4>
          <p className="text-sm text-text-muted">Prepare the following documents for your full application:</p>
          <div className="space-y-2">
            {documents.map((doc) => (
              <label key={doc} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-surface transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedDocs.has(doc)}
                  onChange={() => toggleDoc(doc)}
                  className="rounded accent-grimsby"
                />
                <span className={`text-sm ${checkedDocs.has(doc) ? 'text-navy font-medium line-through' : 'text-text'}`}>{doc}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-text-muted">
            {checkedDocs.size} of {documents.length} documents ready
          </p>
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Digital Main Street                                             */
/* ------------------------------------------------------------------ */

function DigitalMainStreet() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    { id: 'website', q: 'Do you have a business website?', options: ['Yes, professional', 'Yes, basic', 'No'] },
    { id: 'social', q: 'Do you use social media for your business?', options: ['Active on 2+ platforms', 'One platform', 'Not yet'] },
    { id: 'sales', q: 'Can customers buy from you online?', options: ['Yes, full e-commerce', 'Partial (email/phone orders)', 'No'] },
    { id: 'google', q: 'Do you have a Google Business listing?', options: ['Yes, optimized', 'Yes, basic', 'No'] },
    { id: 'email', q: 'Do you use email marketing?', options: ['Regular campaigns', 'Occasionally', 'Not yet'] },
  ];

  const getScore = (id: string) => {
    const val = answers[id];
    if (!val) return 0;
    const opts = questions.find((q) => q.id === id)?.options || [];
    const idx = opts.indexOf(val);
    return idx === 0 ? 3 : idx === 1 ? 2 : 1;
  };

  const totalScore = questions.reduce((sum, q) => sum + getScore(q.id), 0);
  const maxScore = 15;
  const pct = Math.round((totalScore / maxScore) * 100);

  const categories = questions.map((q) => ({
    label: q.id === 'website' ? 'Website' : q.id === 'social' ? 'Social Media' : q.id === 'sales' ? 'E-Commerce' : q.id === 'google' ? 'Google Listing' : 'Email Marketing',
    score: getScore(q.id),
    max: 3,
  }));

  return (
    <>
      <StepIndicator steps={['Digital Readiness Quiz', 'Your Digital Score', 'Apply for Grant']} current={step} />

      {step === 0 && (
        <div className="space-y-5">
          <h4 className="font-semibold text-navy">Digital Readiness Quiz</h4>
          {questions.map((q) => (
            <div key={q.id}>
              <label className={labelClass}>{q.q}</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      answers[q.id] === opt
                        ? 'border-grimsby bg-grimsby-pale text-grimsby font-medium'
                        : 'border-border hover:border-grimsby-light'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <NavButtons
            step={0}
            maxStep={2}
            onBack={() => {}}
            onNext={() => setStep(1)}
            disableNext={Object.keys(answers).length < questions.length}
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <h4 className="font-semibold text-navy">Your Digital Score</h4>
          <div className="bg-white border border-border rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-navy">{pct}%</div>
            <p className="text-sm text-text-muted mt-1">Digital Readiness Score</p>
            <p className="text-sm mt-2 font-medium" style={{ color: pct >= 70 ? '#2e7d32' : pct >= 40 ? '#f59e0b' : '#dc2626' }}>
              {pct >= 70 ? 'Strong digital presence' : pct >= 40 ? 'Room for improvement' : 'Significant opportunity for growth'}
            </p>
          </div>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text">{cat.label}</span>
                  <span className="text-text-muted">{cat.score}/{cat.max}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(cat.score / cat.max) * 100}%`,
                      backgroundColor: cat.score === 3 ? '#2e7d32' : cat.score === 2 ? '#f59e0b' : '#dc2626',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-surface rounded-xl p-4">
            <h5 className="font-medium text-navy text-sm mb-2">Improvement Recommendations</h5>
            <ul className="space-y-1 text-sm text-text-muted">
              {categories.filter((c) => c.score < 3).map((c) => (
                <li key={c.label}>Improve your <span className="font-medium text-navy">{c.label}</span> {c.score === 1 ? '(high priority)' : '(moderate priority)'}</li>
              ))}
              {categories.every((c) => c.score === 3) && <li>Your digital presence is already strong. The grant can help you optimize further.</li>}
            </ul>
          </div>
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Apply for the Digital Transformation Grant</h4>
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-navy">Grant Amount</h5>
              <span className="text-2xl font-bold text-grimsby">Up to $2,500</span>
            </div>
            <p className="text-sm text-text-muted mb-4">
              Based on your digital readiness score of {pct}%, the grant could fund improvements in:
            </p>
            <ul className="space-y-2">
              {categories.filter((c) => c.score < 3).map((c) => (
                <li key={c.label} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-grimsby" />
                  {c.label} enhancement
                </li>
              ))}
            </ul>
          </div>
          <ConfirmationCard title="Application Preview Ready">
            <p className="text-text-muted text-sm">
              Your Digital Transformation Grant application would be submitted to Digital Main Street for review.
            </p>
          </ConfirmationCard>
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  6. Made in Grimsby                                                 */
/* ------------------------------------------------------------------ */

function MadeInGrimsby() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ businessName: '', description: '', category: '', website: '' });

  return (
    <>
      <StepIndicator steps={['Create Listing', 'Preview Listing', 'Confirmation']} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Create Your Listing</h4>
          <div>
            <label className={labelClass}>Business Name</label>
            <input className={inputClass} value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} placeholder="Your business name" />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea className={`${inputClass} h-20`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your products or services..." />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select className={selectClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="">Select...</option>
              <option value="food">Food & Beverage</option>
              <option value="artisan">Artisan & Handmade</option>
              <option value="health">Health & Wellness</option>
              <option value="services">Professional Services</option>
              <option value="retail">Retail & Gifts</option>
              <option value="creative">Creative & Arts</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Photo</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-grimsby-light transition-colors cursor-pointer">
              <Upload size={24} className="mx-auto text-text-muted mb-2" />
              <p className="text-sm text-text-muted">Click to upload a product or storefront photo</p>
              <p className="text-xs text-text-light mt-1">JPG, PNG up to 5MB</p>
            </div>
          </div>
          <div>
            <label className={labelClass}>Website (optional)</label>
            <input className={inputClass} value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://..." />
          </div>
          <NavButtons step={0} maxStep={2} onBack={() => {}} onNext={() => setStep(1)} disableNext={!form.businessName || !form.description || !form.category} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Preview Your Listing</h4>
          <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="h-40 bg-gradient-to-br from-grimsby-pale to-surface flex items-center justify-center">
              <span className="text-4xl">🍑</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-grimsby-pale text-grimsby text-xs font-medium px-2 py-1 rounded-full capitalize">{form.category}</span>
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <MapPin size={12} /> Grimsby, ON
                </span>
              </div>
              <h5 className="text-lg font-semibold text-navy">{form.businessName || 'Your Business Name'}</h5>
              <p className="text-sm text-text-muted mt-2 leading-relaxed">{form.description || 'Your business description will appear here.'}</p>
              {form.website && (
                <p className="text-sm text-grimsby mt-3 flex items-center gap-1">
                  <ExternalLink size={14} /> {form.website}
                </p>
              )}
              <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className={i <= 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                ))}
                <span className="text-xs text-text-muted ml-1">New listing</span>
              </div>
            </div>
          </div>
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} />
        </div>
      )}

      {step === 2 && (
        <ConfirmationCard title="Listing Submitted">
          <p className="text-text-muted text-sm">
            Your listing would appear in the Made in Grimsby directory and tourism platforms.
          </p>
          <p className="text-text-muted text-sm mt-2">
            The Grimsby Welcome Centre reaches approximately 3.3 million visitors per year.
          </p>
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </ConfirmationCard>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  7. Futurpreneur                                                    */
/* ------------------------------------------------------------------ */

function Futurpreneur() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ age: '', citizen: '', stage: '' });
  const [eligible, setEligible] = useState<boolean | null>(null);

  const checkEligibility = () => {
    const ageNum = Number(form.age);
    setEligible(ageNum >= 18 && ageNum <= 39 && form.citizen === 'yes' && (form.stage === 'planning' || form.stage === 'under12'));
    setStep(1);
  };

  return (
    <>
      <StepIndicator steps={['Eligibility Check', 'Funding Calculator', 'Mentor Preview']} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Eligibility Check</h4>
          <div>
            <label className={labelClass}>Your Age</label>
            <input type="number" min={15} max={65} className={inputClass} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Enter your age" />
            {form.age && (Number(form.age) < 18 || Number(form.age) > 39) && (
              <p className="text-red-500 text-xs mt-1">Futurpreneur requires applicants aged 18-39.</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Are you a Canadian citizen or permanent resident?</label>
            <select className={selectClass} value={form.citizen} onChange={(e) => setForm({ ...form, citizen: e.target.value })}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Business Stage</label>
            <select className={selectClass} value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}>
              <option value="">Select...</option>
              <option value="planning">Planning / Not yet launched</option>
              <option value="under12">Operating less than 12 months</option>
              <option value="over12">Operating 12+ months</option>
            </select>
          </div>
          <NavButtons
            step={0}
            maxStep={2}
            onBack={() => {}}
            onNext={checkEligibility}
            nextLabel="Check Eligibility"
            disableNext={!form.age || !form.citizen || !form.stage}
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          {eligible ? (
            <div className="bg-grimsby-pale border border-grimsby-light/30 rounded-lg p-4 mb-2">
              <p className="text-grimsby font-medium">You appear eligible for Futurpreneur financing.</p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-2">
              <p className="text-red-700 font-medium">You may not meet all eligibility requirements. Contact Futurpreneur to discuss.</p>
            </div>
          )}
          <h4 className="font-semibold text-navy">Funding Calculator</h4>
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div>
                  <p className="text-sm text-text-muted">Futurpreneur Loan</p>
                  <p className="text-xl font-bold text-navy">$25,000</p>
                </div>
                <span className="text-2xl">+</span>
                <div>
                  <p className="text-sm text-text-muted">BDC Top-Up</p>
                  <p className="text-xl font-bold text-navy">$50,000</p>
                </div>
                <span className="text-2xl">=</span>
                <div>
                  <p className="text-sm text-text-muted">Total Available</p>
                  <p className="text-2xl font-bold text-grimsby">$75,000</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-surface rounded-lg p-3">
                  <p className="text-xs text-text-muted">Interest Rate</p>
                  <p className="font-semibold text-navy">Variable</p>
                </div>
                <div className="bg-surface rounded-lg p-3">
                  <p className="text-xs text-text-muted">Repayment Term</p>
                  <p className="font-semibold text-navy">Up to 5 years</p>
                </div>
                <div className="bg-surface rounded-lg p-3">
                  <p className="text-xs text-text-muted">Mentorship</p>
                  <p className="font-semibold text-navy">2 years</p>
                </div>
              </div>
            </div>
          </div>
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Mentor Preview</h4>
          <div className="bg-white border border-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center flex-shrink-0">
                <User className="text-lime-700" size={28} />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-navy text-lg">Michael Torres</h5>
                <p className="text-grimsby text-sm font-medium mt-1">Small Business Operations & Growth</p>
                <p className="text-text-muted text-sm mt-2">
                  20+ years of experience building and scaling small businesses. Former owner of a successful retail chain in Ontario. Specializes in financial management and operational efficiency.
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="bg-surface text-text-muted text-xs px-2 py-1 rounded">Financial Planning</span>
                  <span className="bg-surface text-text-muted text-xs px-2 py-1 rounded">Operations</span>
                  <span className="bg-surface text-text-muted text-xs px-2 py-1 rounded">Retail</span>
                  <span className="bg-surface text-text-muted text-xs px-2 py-1 rounded">E-Commerce</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-text-muted">
            Futurpreneur matches each entrepreneur with a mentor based on industry expertise and business needs. Mentorship lasts for two years with regular check-ins.
          </p>
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  8. Chamber of Commerce                                             */
/* ------------------------------------------------------------------ */

function ChamberOfCommerce() {
  const [step, setStep] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [rsvpForm, setRsvpForm] = useState({ name: '', email: '', guests: '1' });

  const events = [
    { id: '1', title: 'Networking Breakfast', date: 'April 10, 2026', time: '7:30 AM - 9:00 AM', location: 'Casablanca Winery Inn', spots: 12, desc: 'Start your day with connections. Meet fellow business owners over breakfast.' },
    { id: '2', title: 'Business After 5', date: 'April 17, 2026', time: '5:00 PM - 7:00 PM', location: 'Grimsby Public Art Gallery', spots: 25, desc: 'Casual evening networking with complimentary appetizers and refreshments.' },
    { id: '3', title: 'Lunch & Learn: Digital Marketing', date: 'April 24, 2026', time: '12:00 PM - 1:30 PM', location: 'Virtual (Zoom)', spots: 50, desc: 'Learn practical digital marketing strategies for small businesses.' },
    { id: '4', title: 'Annual Business Awards Gala', date: 'May 15, 2026', time: '6:00 PM - 10:00 PM', location: 'Bench Brewing', spots: 8, desc: 'Celebrate local business excellence at the premier annual event.' },
  ];

  const tiers = [
    { name: 'Basic', price: '$250/year', features: ['Directory listing', 'Event access', 'Newsletter'] },
    { name: 'Professional', price: '$450/year', features: ['All Basic benefits', 'Enhanced listing', 'Committee access', 'Referral program'] },
    { name: 'Premium', price: '$750/year', features: ['All Professional benefits', 'Event sponsorship', 'Board eligibility', 'Media exposure'] },
  ];

  return (
    <>
      <StepIndicator steps={['Browse Events', 'RSVP', 'Membership Info']} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Upcoming Chamber Events</h4>
          <div className="grid gap-4">
            {events.map((evt) => (
              <button
                key={evt.id}
                onClick={() => setSelectedEvent(evt.id)}
                className={`text-left p-4 border rounded-xl transition-all ${
                  selectedEvent === evt.id
                    ? 'border-grimsby bg-grimsby-pale shadow-sm'
                    : 'border-border hover:border-grimsby-light'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-medium text-navy">{evt.title}</h5>
                    <p className="text-sm text-text-muted mt-1">{evt.desc}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {evt.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {evt.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {evt.location}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-surface px-2 py-1 rounded text-text-muted whitespace-nowrap">{evt.spots} spots</span>
                </div>
              </button>
            ))}
          </div>
          <NavButtons step={0} maxStep={2} onBack={() => {}} onNext={() => setStep(1)} disableNext={!selectedEvent} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">RSVP to {events.find((e) => e.id === selectedEvent)?.title}</h4>
          <div>
            <label className={labelClass}>Full Name</label>
            <input className={inputClass} value={rsvpForm.name} onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })} placeholder="Your full name" />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input className={inputClass} type="email" value={rsvpForm.email} onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })} placeholder="you@example.com" />
          </div>
          <div>
            <label className={labelClass}>Number of Guests</label>
            <select className={selectClass} value={rsvpForm.guests} onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}>
              <option value="1">1 (just me)</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} disableNext={!rsvpForm.name || !rsvpForm.email} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <ConfirmationCard title="RSVP Confirmed">
            <p className="text-text-muted text-sm">You would be registered for {events.find((e) => e.id === selectedEvent)?.title}.</p>
          </ConfirmationCard>

          <h4 className="font-semibold text-navy">Membership Tiers</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div key={tier.name} className={`border rounded-xl p-5 ${tier.name === 'Professional' ? 'border-grimsby bg-grimsby-pale' : 'border-border'}`}>
                <h5 className="font-semibold text-navy">{tier.name}</h5>
                <p className="text-lg font-bold text-grimsby mt-1">{tier.price}</p>
                <ul className="mt-3 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text-muted">
                      <Check size={14} className="text-grimsby" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  9. Brock University                                                */
/* ------------------------------------------------------------------ */

function BrockUniversity() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [project, setProject] = useState({ description: '', timeline: '', budget: '', outcomes: '' });

  const services = [
    { id: 'vpmi', title: 'R&D / Prototyping (VPMI)', desc: '$6.1M facility for validation, prototyping, and manufacturing.', icon: '🔬' },
    { id: 'goodman', title: 'Business Consulting (Goodman MBA)', desc: 'MBA student teams tackle real business challenges at no cost.', icon: '📊' },
    { id: 'linc', title: 'IP Support (Brock LINC)', desc: 'Up to $10,000 in intellectual property analysis and strategy.', icon: '🔒' },
    { id: 'coop', title: 'Student Talent (Co-op)', desc: 'Hire skilled co-op students for project-based placements.', icon: '🎓' },
  ];

  const matchResults: Record<string, { program: string; fit: string; nextSteps: string[] }> = {
    vpmi: { program: 'Validation, Prototyping and Manufacturing Institute (VPMI)', fit: 'Best fit for bioproduct, bioagriculture, bioscience, and chemical manufacturing R&D.', nextSteps: ['Contact Dr. Paul Zelisko to discuss your project', 'Submit a research collaboration proposal', 'Tour the VPMI facility at Brock University'] },
    goodman: { program: 'Goodman School of Business - MBA Consulting', fit: 'Best fit for strategic, marketing, or operational challenges.', nextSteps: ['Submit a project brief to the MBA program coordinator', 'Get matched with an MBA student consulting team', 'Collaborate over a 4-month semester project'] },
    linc: { program: 'Brock LINC', fit: 'Best fit for IP protection, patent search, and commercialization.', nextSteps: ['Apply for IP Assist voucher (up to $10,000)', 'Get matched with an IP advisor', 'Receive a comprehensive IP strategy report'] },
    coop: { program: 'Brock University Co-op Program', fit: 'Best fit for businesses needing skilled student support.', nextSteps: ['Post a co-op position through Brock Career Services', 'Interview and select candidates', 'Host a co-op student for a 4 or 8-month work term'] },
  };

  return (
    <>
      <StepIndicator steps={['What Do You Need?', 'Project Brief', 'Matched Resources']} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">What Do You Need?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedService === s.id
                    ? 'border-grimsby bg-grimsby-pale shadow-sm'
                    : 'border-border hover:border-grimsby-light hover:shadow-sm'
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <h5 className="font-medium text-navy mt-2">{s.title}</h5>
                <p className="text-sm text-text-muted mt-1">{s.desc}</p>
              </button>
            ))}
          </div>
          <NavButtons step={0} maxStep={2} onBack={() => {}} onNext={() => setStep(1)} disableNext={!selectedService} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Project Brief</h4>
          <div>
            <label className={labelClass}>Project Description</label>
            <textarea className={`${inputClass} h-24`} value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} placeholder="Describe your project or challenge in detail..." />
          </div>
          <div>
            <label className={labelClass}>Timeline</label>
            <select className={selectClass} value={project.timeline} onChange={(e) => setProject({ ...project, timeline: e.target.value })}>
              <option value="">Select...</option>
              <option value="1-3">1-3 months</option>
              <option value="3-6">3-6 months</option>
              <option value="6-12">6-12 months</option>
              <option value="12+">12+ months</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Budget Range</label>
            <select className={selectClass} value={project.budget} onChange={(e) => setProject({ ...project, budget: e.target.value })}>
              <option value="">Select...</option>
              <option value="0">No budget (seeking free/subsidized)</option>
              <option value="0-5k">Under $5,000</option>
              <option value="5-15k">$5,000 - $15,000</option>
              <option value="15k+">Over $15,000</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Expected Outcomes</label>
            <textarea className={`${inputClass} h-20`} value={project.outcomes} onChange={(e) => setProject({ ...project, outcomes: e.target.value })} placeholder="What do you hope to achieve?" />
          </div>
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} disableNext={!project.description || !project.timeline} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Matched Resources</h4>
          {selectedService && matchResults[selectedService] && (
            <div className="bg-white border border-border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{services.find((s) => s.id === selectedService)?.icon}</span>
                <h5 className="font-semibold text-navy">{matchResults[selectedService].program}</h5>
              </div>
              <p className="text-sm text-grimsby font-medium mb-4">{matchResults[selectedService].fit}</p>
              <h6 className="text-sm font-medium text-navy mb-2">Next Steps:</h6>
              <ol className="space-y-2">
                {matchResults[selectedService].nextSteps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center text-xs flex-shrink-0">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  10. Niagara College                                                */
/* ------------------------------------------------------------------ */

function NiagaraCollege() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [project, setProject] = useState({ description: '', skills: '', duration: '' });

  const services = [
    { id: 'research', title: 'Applied Research', desc: 'Access NC Innovation for product development and testing.', icon: '🔬' },
    { id: 'placement', title: 'Student Placement', desc: 'Host a co-op or capstone student for hands-on project work.', icon: '👩‍🎓' },
    { id: 'bcic', title: 'BCIC Consultation', desc: 'Get help commercializing a product or process.', icon: '💡' },
    { id: 'starter', title: 'Starter Company Plus', desc: 'Connect to the Starter Company Plus program through Niagara College.', icon: '💰' },
  ];

  const timelines: Record<string, { steps: string[]; duration: string }> = {
    research: { steps: ['Initial consultation and project scoping', 'Proposal development and NSERC application', 'Research phase with faculty and student team', 'Final report and deliverables'], duration: '4-8 months' },
    placement: { steps: ['Post placement opportunity through the college', 'Review student candidates and interview', 'Student begins work term with onboarding', 'Project completion and final evaluation'], duration: '4 months (1 semester)' },
    bcic: { steps: ['Intake meeting with BCIC advisor', 'Business assessment and opportunity mapping', 'Product development or process improvement plan', 'Implementation support and follow-up'], duration: '2-4 months' },
    starter: { steps: ['Attend an information session at Niagara College', 'Complete the Starter Company Plus application', 'Business training and mentor assignment', 'Business plan presentation and grant decision'], duration: '3-6 months' },
  };

  return (
    <>
      <StepIndicator steps={['Choose a Service', 'Project Details', 'Next Steps']} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Choose a Service</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedService(s.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedService === s.id
                    ? 'border-grimsby bg-grimsby-pale shadow-sm'
                    : 'border-border hover:border-grimsby-light hover:shadow-sm'
                }`}
              >
                <span className="text-2xl">{s.icon}</span>
                <h5 className="font-medium text-navy mt-2">{s.title}</h5>
                <p className="text-sm text-text-muted mt-1">{s.desc}</p>
              </button>
            ))}
          </div>
          <NavButtons step={0} maxStep={2} onBack={() => {}} onNext={() => setStep(1)} disableNext={!selectedService} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">Project Details</h4>
          <div>
            <label className={labelClass}>What do you need help with?</label>
            <textarea className={`${inputClass} h-24`} value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} placeholder="Describe what help you need from Niagara College..." />
          </div>
          <div>
            <label className={labelClass}>Skills or Expertise Needed</label>
            <input className={inputClass} value={project.skills} onChange={(e) => setProject({ ...project, skills: e.target.value })} placeholder="e.g. product design, market research, coding..." />
          </div>
          <div>
            <label className={labelClass}>Preferred Duration</label>
            <select className={selectClass} value={project.duration} onChange={(e) => setProject({ ...project, duration: e.target.value })}>
              <option value="">Select...</option>
              <option value="1-3">1-3 months</option>
              <option value="3-6">3-6 months</option>
              <option value="6+">6+ months</option>
            </select>
          </div>
          <NavButtons step={1} maxStep={2} onBack={() => setStep(0)} onNext={() => setStep(2)} disableNext={!project.description} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-navy">How the Partnership Would Proceed</h4>
          {selectedService && timelines[selectedService] && (
            <>
              <div className="bg-surface rounded-xl p-4 mb-4">
                <p className="text-sm text-text-muted">
                  <span className="font-medium text-navy">Expected timeline:</span> {timelines[selectedService].duration}
                </p>
              </div>
              <ol className="space-y-4">
                {timelines[selectedService].steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm flex-shrink-0">{i + 1}</span>
                    <div className="pt-1">
                      <p className="text-sm text-text">{s}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}
          <NavButtons step={2} maxStep={2} onBack={() => setStep(1)} onNext={() => {}} />
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main switch component                                              */
/* ------------------------------------------------------------------ */

export default function ResourceSimulation({ slug }: ResourceSimulationProps) {
  switch (slug) {
    case 'starter-company-plus':
      return <StarterCompanyPlus />;
    case 'enterprise-centre':
      return <EnterpriseCentre />;
    case 'innovate-niagara':
      return <InnovateNiagara />;
    case 'venture-niagara':
      return <VentureNiagara />;
    case 'digital-main-street':
      return <DigitalMainStreet />;
    case 'made-in-grimsby':
      return <MadeInGrimsby />;
    case 'futurpreneur':
      return <Futurpreneur />;
    case 'chamber-of-commerce':
      return <ChamberOfCommerce />;
    case 'brock-university':
      return <BrockUniversity />;
    case 'niagara-college':
      return <NiagaraCollege />;
    default:
      return <p className="text-text-muted">No simulation available for this resource.</p>;
  }
}
