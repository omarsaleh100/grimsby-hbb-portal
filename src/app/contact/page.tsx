'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Phone,
  Mail,
  Clock,
  Users,
  Megaphone,
  ArrowRight,
  ClipboardList,
  BookOpen,
  FolderOpen,
  Send,
} from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Hero from '@/components/ui/Hero';

const quickLinks = [
  { label: 'Self-Assessment Tool', href: '/self-assessment', icon: <ClipboardList size={18} /> },
  { label: 'Register Your Business', href: '/register', icon: <Send size={18} /> },
  { label: 'Resources & Programs', href: '/resources', icon: <FolderOpen size={18} /> },
  { label: 'HBB Guide', href: '/guide', icon: <BookOpen size={18} /> },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <Breadcrumb items={[{ label: 'Contact' }]} />

      <Hero
        title="Contact Economic Development"
        description="Have questions about starting or growing a home-based business in Grimsby? We're here to help. Reach out to our Economic Development team, advisory committee, or volunteer ambassadors."
      />

      {/* Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Economic Development Office */}
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-grimsby-pale flex items-center justify-center mb-4">
                <Building2 size={24} className="text-grimsby" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-4">Economic Development Office</h3>
              <div className="space-y-3 text-sm text-text-muted">
                <p className="flex items-start gap-2">
                  <Building2 size={16} className="mt-0.5 text-navy shrink-0" />
                  160 Livingston Ave, Grimsby, ON L3M 0J5
                </p>
                <p className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5 text-navy shrink-0" />
                  905-945-9634
                </p>
                <p className="flex items-start gap-2">
                  <Mail size={16} className="mt-0.5 text-navy shrink-0" />
                  <a href="mailto:econdev@grimsby.ca" className="text-grimsby hover:underline">
                    econdev@grimsby.ca
                  </a>
                </p>
                <p className="flex items-start gap-2">
                  <Clock size={16} className="mt-0.5 text-navy shrink-0" />
                  Mon-Fri 8:30am - 4:30pm
                </p>
              </div>
            </div>

            {/* GEDAC */}
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center mb-4">
                <Users size={24} className="text-navy" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-4">
                Grimsby Economic Development Advisory Committee (GEDAC)
              </h3>
              <p className="text-sm text-text-muted mb-4">
                GEDAC is a volunteer advisory committee that advises Town Council on economic development
                policy and strategy. Members include local business owners, community leaders, and
                professionals with expertise in business, finance, and planning.
              </p>
              <p className="text-sm text-text-muted">
                Interested in getting involved? Contact the Economic Development Office to learn about
                upcoming vacancies and the application process.
              </p>
            </div>

            {/* Business Ambassador Program */}
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                <Megaphone size={24} className="text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-navy mb-4">Business Ambassador Program</h3>
              <p className="text-sm text-text-muted mb-4">
                Launched in January 2025, the Business Ambassador Program connects new and existing
                entrepreneurs with experienced volunteer guides who help navigate local resources,
                permits, and programs.
              </p>
              <p className="text-sm text-text-muted mb-4">
                With <span className="font-semibold text-navy">approximately 12 volunteer ambassadors</span>, the
                program offers one-on-one support tailored to your business stage and needs.
              </p>
              <p className="text-sm text-text-muted">
                Want to become an ambassador or get matched with one? Contact the Economic Development
                Office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-surface py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy mb-3">Send Us a Message</h2>
            <p className="text-text-muted">
              Fill out the form below and our team will get back to you within 2 business days.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-xl border border-grimsby p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-grimsby-pale flex items-center justify-center mx-auto mb-4">
                <Send size={28} className="text-grimsby" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">Message Sent!</h3>
              <p className="text-text-muted">
                Thank you for reaching out. This is a simulated form — in a live portal, your message
                would be forwarded to the Economic Development team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border shadow-sm p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-grimsby/30 focus:border-grimsby transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-grimsby/30 focus:border-grimsby transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-navy mb-1.5">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-grimsby/30 focus:border-grimsby transition-colors bg-white"
                >
                  <option value="" disabled>
                    Select a topic...
                  </option>
                  <option value="general">General Inquiry</option>
                  <option value="registration">Registration Help</option>
                  <option value="zoning">Zoning Question</option>
                  <option value="programs">Program Information</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="ambassador">Ambassador Program</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-grimsby/30 focus:border-grimsby transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-grimsby text-white font-medium rounded-lg hover:bg-grimsby-light transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy text-center mb-8">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-3 bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-grimsby-light transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-grimsby-pale flex items-center justify-center text-grimsby shrink-0">
                  {link.icon}
                </div>
                <span className="font-medium text-navy group-hover:text-grimsby transition-colors">
                  {link.label}
                </span>
                <ArrowRight size={16} className="ml-auto text-text-light group-hover:text-grimsby transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
