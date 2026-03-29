'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  User,
  ClipboardList,
  Sparkles,
  Calendar,
  BarChart3,
  Check,
  Pencil,
  X,
} from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import DashboardCard from '@/components/ui/DashboardCard';
import CTABanner from '@/components/ui/CTABanner';
import ProgramMatcher from '@/components/features/ProgramMatcher';
import { getBusiness, saveBusiness } from '@/lib/storage';
import { events } from '@/data/events';
import type { Business, BusinessNeed } from '@/types';

/* ── Checklist generation ── */
function generateChecklist(business: Business): { id: string; label: string }[] {
  const items: { id: string; label: string }[] = [
    { id: 'review-guide', label: 'Review the HBB Guide for zoning requirements' },
    { id: 'self-assessment', label: 'Complete the Self-Assessment Tool' },
    { id: 'contact-planning', label: 'Contact Planning Department about permits' },
  ];

  const needItems: Partial<Record<BusinessNeed, { id: string; label: string }>> = {
    funding: { id: 'apply-starter', label: 'Apply to Starter Company Plus' },
    mentorship: { id: 'book-consult', label: 'Book a consultation at Enterprise Centre' },
    marketing: { id: 'marketing-plan', label: 'Create a basic marketing plan' },
    digital: { id: 'digital-assess', label: 'Complete a Digital Main Street assessment' },
    networking: { id: 'chamber-event', label: 'Attend a Chamber of Commerce networking event' },
    zoning: { id: 'bylaw-review', label: 'Review By-law 14-45 home occupation rules' },
    workspace: { id: 'workspace-research', label: 'Research commercial space options in Grimsby' },
    training: { id: 'workshop-attend', label: 'Register for an upcoming business workshop' },
  };

  for (const need of business.needs) {
    const item = needItems[need];
    if (item) items.push(item);
  }

  if (business.stage === 'emerging') {
    items.push({ id: 'biz-plan', label: 'Draft a business plan' });
  }
  if (business.stage === 'growth') {
    items.push({ id: 'scaling-workshop', label: 'Attend the Scaling Your HBB workshop' });
  }

  return items;
}

const CHECKLIST_STORAGE_KEY = 'grimsby-hbb-checklist';

export default function DashboardPage() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ businessName: '', description: '' });
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const biz = getBusiness();
    setBusiness(biz);
    setLoading(false);

    // Load checklist state
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) setCheckedItems(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const toggleChecked = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  function startEdit() {
    if (!business) return;
    setEditForm({ businessName: business.businessName, description: business.description });
    setEditing(true);
  }

  function saveEdit() {
    if (!business) return;
    const updated = { ...business, businessName: editForm.businessName, description: editForm.description };
    saveBusiness(updated);
    setBusiness(updated);
    setEditing(false);
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  if (!business) {
    return (
      <>
        <Breadcrumb items={[{ label: 'Dashboard' }]} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Welcome to the Dashboard</h1>
          <p className="text-text-muted mb-6">You haven&apos;t registered yet. Register your home-based business to access your personalized dashboard.</p>
          <Link href="/register" className="px-6 py-3 bg-grimsby text-white rounded-lg font-medium hover:bg-grimsby-light transition-colors">
            Register Now
          </Link>
        </div>
      </>
    );
  }

  const checklist = generateChecklist(business);
  const upcomingEvents = events.slice(0, 3);

  const STAGE_LABELS: Record<string, string> = {
    emerging: 'Emerging',
    stabilizing: 'Stabilizing',
    growth: 'Growth-focused',
  };

  const TYPE_LABELS: Record<string, string> = {
    professional: 'Professional Services',
    creative: 'Creative & Artisan',
    food: 'Food & Beverage',
    retail: 'Retail & E-commerce',
    trades: 'Trades & Construction',
    tech: 'Tech & Digital',
    other: 'Other',
  };

  return (
    <>
      <Breadcrumb items={[{ label: 'Dashboard' }]} />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-navy">
            Welcome back, {business.ownerName.split(' ')[0]}
          </h1>
          <span className="inline-flex items-center gap-1 text-xs font-mono bg-grimsby-pale text-grimsby px-3 py-1 rounded-full">
            {business.id}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Business Profile */}
            <DashboardCard title="Your Business Profile" icon={<User size={18} />}>
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Business Name</label>
                    <input
                      type="text"
                      value={editForm.businessName}
                      onChange={(e) => setEditForm((f) => ({ ...f, businessName: e.target.value }))}
                      className="border border-border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-grimsby focus:border-grimsby outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                      rows={3}
                      maxLength={200}
                      className="border border-border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-grimsby focus:border-grimsby outline-none text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="px-4 py-2 bg-grimsby text-white rounded-lg text-sm font-medium hover:bg-grimsby-light transition-colors">
                      Save
                    </button>
                    <button onClick={() => setEditing(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-text-muted hover:bg-surface transition-colors">
                      <X size={14} className="inline mr-1" />Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-text-light text-xs">Business Name</p>
                      <p className="font-medium">{business.businessName}</p>
                    </div>
                    <div>
                      <p className="text-text-light text-xs">Type</p>
                      <p className="font-medium">{TYPE_LABELS[business.type] || business.type}</p>
                    </div>
                    <div>
                      <p className="text-text-light text-xs">Stage</p>
                      <p className="font-medium">{STAGE_LABELS[business.stage] || business.stage}</p>
                    </div>
                    <div>
                      <p className="text-text-light text-xs">Operation</p>
                      <p className="font-medium">{business.fullTime ? 'Full-time' : 'Part-time'} &middot; {business.yearsOperating < 1 ? '<1' : business.yearsOperating}+ yrs</p>
                    </div>
                  </div>
                  {business.description && (
                    <p className="text-sm text-text-muted mb-4">{business.description}</p>
                  )}
                  <button onClick={startEdit} className="text-sm font-medium text-grimsby hover:text-grimsby-light transition-colors flex items-center gap-1">
                    <Pencil size={14} /> Edit Profile
                  </button>
                </div>
              )}
            </DashboardCard>

            {/* Checklist */}
            <DashboardCard title="Your Checklist" icon={<ClipboardList size={18} />}>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={!!checkedItems[item.id]}
                      onChange={() => toggleChecked(item.id)}
                      className="accent-grimsby w-4 h-4 mt-0.5 flex-shrink-0"
                    />
                    <span className={`text-sm ${checkedItems[item.id] ? 'line-through text-text-light' : 'text-text'}`}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-text-light mt-4">
                {Object.values(checkedItems).filter(Boolean).length} of {checklist.length} completed
              </p>
            </DashboardCard>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Matched Programs */}
            <DashboardCard title="Matched Programs" icon={<Sparkles size={18} />}>
              <ProgramMatcher business={business} />
            </DashboardCard>

            {/* Upcoming Events */}
            <DashboardCard title="Upcoming Events" icon={<Calendar size={18} />}>
              <div className="space-y-3">
                {upcomingEvents.map((event) => {
                  const d = new Date(event.date + 'T00:00:00');
                  const month = d.toLocaleDateString('en-US', { month: 'short' });
                  const day = d.getDate();
                  return (
                    <div key={event.id} className="flex items-start gap-3 p-2">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-navy text-white flex flex-col items-center justify-center text-xs">
                        <span className="font-bold text-sm leading-none">{day}</span>
                        <span className="uppercase text-[10px]">{month}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-navy">{event.title}</p>
                        <p className="text-xs text-text-muted">{event.location} &middot; {event.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/events" className="inline-block mt-4 text-sm font-medium text-grimsby hover:text-grimsby-light transition-colors">
                View All Events &rarr;
              </Link>
            </DashboardCard>

            {/* Community Stats */}
            <DashboardCard title="Community Stats" icon={<BarChart3 size={18} />}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '127', label: 'Businesses Registered' },
                  { num: '89', label: 'Programs Accessed' },
                  { num: '34', label: 'Events This Quarter' },
                  { num: '12', label: 'Transitioned to Commercial' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 bg-surface rounded-lg">
                    <p className="text-2xl font-bold text-navy">{stat.num}</p>
                    <p className="text-xs text-text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-light mt-4 italic">
                Statistics are simulated for demonstration purposes
              </p>
            </DashboardCard>
          </div>
        </div>
      </div>

      <CTABanner
        title="Explore All Resources"
        description="Discover programs, funding, mentorship, and more to support your home-based business journey."
        buttonText="View Resources"
        buttonHref="/resources"
      />
    </>
  );
}
