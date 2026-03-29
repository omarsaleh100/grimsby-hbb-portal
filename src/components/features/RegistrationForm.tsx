'use client';

import { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { Check, CheckCircle } from 'lucide-react';
import FormStepper from '@/components/ui/FormStepper';
import { saveBusiness } from '@/lib/storage';
import type { Business, BusinessType, BusinessStage, BusinessNeed, TourismInterest } from '@/types';

/* ── Zod schemas per step ── */
const step1Schema = z.object({
  ownerName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
});

const step2Schema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  type: z.enum(['professional', 'creative', 'food', 'retail', 'trades', 'tech', 'other'] as const, {
    error: 'Please select a business type',
  }),
  description: z.string().max(200, 'Description must be 200 characters or fewer').optional(),
});

/* ── Constants ── */
const STEPS = ['Personal', 'Business', 'Stage', 'Operations', 'Needs', 'Tourism'];

const BUSINESS_TYPES: { value: BusinessType; label: string }[] = [
  { value: 'professional', label: 'Professional Services' },
  { value: 'creative', label: 'Creative & Artisan' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'trades', label: 'Trades & Construction' },
  { value: 'tech', label: 'Tech & Digital' },
  { value: 'other', label: 'Other' },
];

const STAGE_OPTIONS: { value: BusinessStage; title: string; desc: string }[] = [
  { value: 'emerging', title: 'Emerging', desc: 'Idea stage or early planning. You\'re exploring whether a home-based business is right for you.' },
  { value: 'stabilizing', title: 'Stabilizing', desc: 'Generating some income but still developing your customer base and processes.' },
  { value: 'growth', title: 'Growth-focused', desc: 'Established and looking to expand operations, revenue, or customer reach.' },
];

const NEEDS_OPTIONS: { value: BusinessNeed; label: string }[] = [
  { value: 'funding', label: 'Funding/Grants' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'workspace', label: 'Workspace/Expansion' },
  { value: 'marketing', label: 'Marketing Help' },
  { value: 'networking', label: 'Networking' },
  { value: 'zoning', label: 'Zoning Guidance' },
  { value: 'digital', label: 'Digital/Online Presence' },
  { value: 'training', label: 'Business Training' },
];

const TOURISM_OPTIONS: { value: TourismInterest; label: string }[] = [
  { value: 'farmers-market', label: 'Farmers Market' },
  { value: 'directory', label: 'Made in Grimsby Directory' },
  { value: 'events', label: 'Community Events' },
  { value: 'shop-local', label: 'Shop Local Campaign' },
];

const YEARS_OPTIONS = [
  { value: 0, label: 'Less than 1' },
  { value: 1, label: '1-2' },
  { value: 3, label: '3-5' },
  { value: 5, label: '5+' },
];

const INPUT_CLASS = 'border border-border rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-grimsby focus:border-grimsby outline-none transition-colors';

export default function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [registryId, setRegistryId] = useState('');

  /* ── Form state ── */
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState<BusinessType | ''>('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState<BusinessStage | ''>('');
  const [fullTime, setFullTime] = useState<boolean | null>(null);
  const [yearsOperating, setYearsOperating] = useState<number | null>(null);
  const [needs, setNeeds] = useState<BusinessNeed[]>([]);
  const [tourismInterest, setTourismInterest] = useState<TourismInterest[]>([]);
  const [notInterestedTourism, setNotInterestedTourism] = useState(false);

  /* ── Validation ── */
  function validateStep(): boolean {
    setErrors({});

    if (step === 0) {
      const result = step1Schema.safeParse({ ownerName, email, phone, address });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const key = String(issue.path[0]);
          if (!fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return false;
      }
    }

    if (step === 1) {
      const result = step2Schema.safeParse({
        businessName,
        type: businessType || undefined,
        description,
      });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const key = String(issue.path[0]);
          if (!fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return false;
      }
    }

    if (step === 2 && !stage) {
      setErrors({ stage: 'Please select your stage of operation' });
      return false;
    }

    if (step === 3) {
      if (fullTime === null) {
        setErrors({ fullTime: 'Please select full-time or part-time' });
        return false;
      }
      if (yearsOperating === null) {
        setErrors({ yearsOperating: 'Please select years in operation' });
        return false;
      }
    }

    return true;
  }

  function handleNext() {
    if (!validateStep()) return;

    if (step === STEPS.length - 1) {
      handleSubmit();
      return;
    }
    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function handleSubmit() {
    const id = `GHB-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setRegistryId(id);

    const business: Business = {
      id,
      ownerName,
      email,
      phone,
      address,
      businessName,
      type: businessType as BusinessType,
      description,
      stage: stage as BusinessStage,
      fullTime: fullTime!,
      yearsOperating: yearsOperating!,
      needs,
      tourismInterest: notInterestedTourism ? [] : tourismInterest,
      registeredAt: new Date().toISOString(),
    };

    saveBusiness(business);
    setSubmitted(true);
  }

  /* ── Toggle helpers ── */
  function toggleNeed(n: BusinessNeed) {
    setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  }

  function toggleTourism(t: TourismInterest) {
    setNotInterestedTourism(false);
    setTourismInterest((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  function handleNotInterestedTourism() {
    setNotInterestedTourism(true);
    setTourismInterest([]);
  }

  /* ── Confirmation screen ── */
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-grimsby-pale flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-grimsby" />
        </div>
        <h1 className="text-3xl font-bold text-navy mb-2">You&apos;re Registered!</h1>
        <p className="text-text-muted mb-6">Welcome to the Grimsby Home-Based Business Registry.</p>
        <div className="bg-surface rounded-xl border border-border p-6 mb-8 text-left">
          <p className="text-sm text-text-muted mb-1">Your Registry ID</p>
          <p className="text-2xl font-bold text-grimsby mb-4">{registryId}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-muted">Name</p>
              <p className="font-medium">{ownerName}</p>
            </div>
            <div>
              <p className="text-text-muted">Business</p>
              <p className="font-medium">{businessName}</p>
            </div>
            <div>
              <p className="text-text-muted">Type</p>
              <p className="font-medium capitalize">{businessType}</p>
            </div>
            <div>
              <p className="text-text-muted">Stage</p>
              <p className="font-medium capitalize">{stage}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="px-6 py-3 bg-grimsby text-white rounded-lg font-medium hover:bg-grimsby-light transition-colors">
            Go to Your Dashboard
          </Link>
          <Link href="/resources" className="px-6 py-3 border border-border rounded-lg font-medium text-navy hover:bg-surface transition-colors">
            Explore Resources
          </Link>
        </div>
      </div>
    );
  }

  /* ── Step content ── */
  function renderStep() {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-navy mb-1">Personal Information</h2>
            <p className="text-text-muted text-sm mb-4">Tell us about yourself so we can personalize your experience.</p>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name <span className="text-red-500">*</span></label>
              <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className={INPUT_CLASS} placeholder="Jane Smith" />
              {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASS} placeholder="jane@example.com" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={INPUT_CLASS} placeholder="(905) 555-0123" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address <span className="text-red-500">*</span></label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className={INPUT_CLASS} placeholder="123 Main St, Grimsby, ON" />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-navy mb-1">Business Details</h2>
            <p className="text-text-muted text-sm mb-4">Tell us about your home-based business.</p>
            <div>
              <label className="block text-sm font-medium mb-1">Business Name <span className="text-red-500">*</span></label>
              <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className={INPUT_CLASS} placeholder="My Business" />
              {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Business Type <span className="text-red-500">*</span></label>
              <select value={businessType} onChange={(e) => setBusinessType(e.target.value as BusinessType)} className={INPUT_CLASS}>
                <option value="">Select a type...</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brief Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={200} rows={3} className={INPUT_CLASS} placeholder="What does your business do?" />
              <p className="text-xs text-text-light mt-1">{description.length}/200 characters</p>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-navy mb-1">Stage of Operation</h2>
            <p className="text-text-muted text-sm mb-4">Where is your business right now?</p>
            <div className="grid gap-4">
              {STAGE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStage(opt.value)}
                  className={`text-left p-5 rounded-xl border-2 transition-all ${
                    stage === opt.value
                      ? 'border-grimsby bg-grimsby-pale'
                      : 'border-border hover:border-grimsby/40'
                  }`}
                >
                  <p className="font-semibold text-navy mb-1">{opt.title}</p>
                  <p className="text-sm text-text-muted">{opt.desc}</p>
                </button>
              ))}
            </div>
            {errors.stage && <p className="text-red-500 text-xs mt-1">{errors.stage}</p>}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-navy mb-1">Operation Details</h2>
            <p className="text-text-muted text-sm mb-4">Help us understand your business operations.</p>
            <div>
              <label className="block text-sm font-medium mb-3">Full-time or Part-time? <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: true, label: 'Full-time' },
                  { val: false, label: 'Part-time' },
                ].map((opt) => (
                  <button
                    key={String(opt.val)}
                    type="button"
                    onClick={() => setFullTime(opt.val)}
                    className={`p-4 rounded-xl border-2 font-medium transition-all ${
                      fullTime === opt.val
                        ? 'border-grimsby bg-grimsby-pale text-navy'
                        : 'border-border hover:border-grimsby/40 text-text-muted'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.fullTime && <p className="text-red-500 text-xs mt-1">{errors.fullTime}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Years in Operation <span className="text-red-500">*</span></label>
              <select value={yearsOperating ?? ''} onChange={(e) => setYearsOperating(Number(e.target.value))} className={INPUT_CLASS}>
                <option value="">Select...</option>
                {YEARS_OPTIONS.map((y) => (
                  <option key={y.value} value={y.value}>{y.label}</option>
                ))}
              </select>
              {errors.yearsOperating && <p className="text-red-500 text-xs mt-1">{errors.yearsOperating}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-navy mb-1">Your Needs</h2>
            <p className="text-text-muted text-sm mb-4">Select all the areas where you could use support.</p>
            <div className="grid grid-cols-2 gap-3">
              {NEEDS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleNeed(opt.value)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    needs.includes(opt.value)
                      ? 'border-grimsby bg-grimsby-pale text-navy'
                      : 'border-border hover:border-grimsby/40 text-text-muted'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {needs.includes(opt.value) && <Check size={16} className="text-grimsby" />}
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-navy mb-1">Tourism Interest</h2>
            <p className="text-text-muted text-sm mb-4">Grimsby welcomes 3.3 million visitors annually. Select tourism opportunities you are interested in.</p>
            <div className="grid grid-cols-2 gap-3">
              {TOURISM_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleTourism(opt.value)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                    tourismInterest.includes(opt.value)
                      ? 'border-grimsby bg-grimsby-pale text-navy'
                      : 'border-border hover:border-grimsby/40 text-text-muted'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tourismInterest.includes(opt.value) && <Check size={16} className="text-grimsby" />}
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNotInterestedTourism}
              className={`w-full p-4 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                notInterestedTourism
                  ? 'border-grimsby bg-grimsby-pale text-navy'
                  : 'border-border hover:border-grimsby/40 text-text-muted'
              }`}
            >
              <span className="flex items-center gap-2">
                {notInterestedTourism && <Check size={16} className="text-grimsby" />}
                I&apos;m not interested in tourism opportunities right now
              </span>
            </button>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <FormStepper
        steps={STEPS}
        currentStep={step}
        onNext={step < STEPS.length - 1 ? handleNext : undefined}
        onBack={handleBack}
      />
      <div className="mt-8">{renderStep()}</div>
      {step === STEPS.length - 1 && (
        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-grimsby text-white rounded-lg font-medium hover:bg-grimsby-light transition-colors"
          >
            Submit Registration
          </button>
        </div>
      )}
    </div>
  );
}
