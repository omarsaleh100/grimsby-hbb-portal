'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarDays, MapPin, Clock, Users, ArrowRight, Star, DollarSign } from 'lucide-react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Hero from '@/components/ui/Hero';
import { events } from '@/data/events';
import type { EventCategory } from '@/types';

const categories: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Workshops', value: 'workshop' },
  { label: 'Networking', value: 'networking' },
  { label: 'Info Sessions', value: 'info-session' },
  { label: 'Markets', value: 'market' },
  { label: 'Webinars', value: 'webinar' },
];

const categoryColors: Record<string, string> = {
  workshop: 'bg-grimsby-pale text-grimsby',
  networking: 'bg-blue-100 text-navy-light',
  'info-session': 'bg-amber-100 text-amber-800',
  market: 'bg-orange-100 text-orange-800',
  webinar: 'bg-purple-100 text-purple-800',
};

const categoryLabels: Record<string, string> = {
  workshop: 'Workshop',
  networking: 'Networking',
  'info-session': 'Info Session',
  market: 'Market',
  webinar: 'Webinar',
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00');
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  return { month, day, weekday };
}

function formatFullDate(dateStr: string) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const featuredEvents = events.filter((e) => e.isReal);
  const simulatedEvents = events.filter((e) => !e.isReal);

  const filteredSimulatedEvents =
    activeFilter === 'all'
      ? simulatedEvents
      : simulatedEvents.filter((e) => e.category === activeFilter);

  function handleRegister(title: string) {
    alert(
      `Registration is simulated \u2014 in a live portal, this would reserve your spot for "${title}".`
    );
  }

  return (
    <>
      <Breadcrumb items={[{ label: 'Events & Workshops' }]} />

      <Hero
        title="Events & Workshops"
        description="Discover upcoming workshops, networking events, info sessions, and webinars designed to help Grimsby home-based business owners learn, connect, and grow."
      />

      {/* Featured Workshops Section */}
      <section className="bg-surface py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Star size={24} className="text-grimsby" />
            <h2 className="text-2xl font-bold text-navy">Featured Workshops</h2>
          </div>
          <p className="text-text-muted text-sm mb-8">
            Part of the HBB Framework Pilot Program &mdash; real, research-backed workshops designed for Grimsby home-based businesses.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => {
              const { month, day, weekday } = formatDate(event.date);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col border-l-4 border-l-grimsby"
                >
                  {/* Badge */}
                  <div className="bg-grimsby-pale px-6 py-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-grimsby-dark uppercase tracking-wide flex items-center gap-1.5">
                      <Star size={12} className="fill-grimsby text-grimsby" />
                      Featured Workshop
                    </span>
                    <span className="text-xs font-medium text-grimsby-dark bg-white px-2 py-0.5 rounded-full">
                      HBB Framework Pilot
                    </span>
                  </div>

                  {/* Date header */}
                  <div className="flex items-center gap-4 px-6 pt-5 pb-3">
                    <div className="bg-grimsby text-white rounded-lg w-14 h-14 flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-medium uppercase leading-none">{month}</span>
                      <span className="text-xl font-bold leading-none mt-0.5">{day}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy leading-tight">{event.title}</h3>
                      <p className="text-text-light text-sm">{weekday}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 pb-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-3 mb-3 text-sm text-text-muted">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {event.location}
                      </span>
                    </div>

                    <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1 bg-surface px-2 py-1 rounded">
                        <DollarSign size={12} /> $10 fee
                      </span>
                      <span className="flex items-center gap-1 bg-surface px-2 py-1 rounded">
                        <Users size={12} /> 20-30 participants
                      </span>
                    </div>

                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-grimsby text-white text-sm font-medium rounded-lg hover:bg-grimsby-light transition-colors"
                    >
                      View Full Schedule <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-6 py-2 text-center">
              <span className="text-lg font-semibold text-navy">More Events & Workshops</span>
              <br />
              <span className="text-xs text-text-light italic">
                (The events below are simulated examples of programming that could be offered through the portal)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === cat.value
                    ? 'bg-navy text-white'
                    : 'bg-white text-text-muted border border-border hover:border-navy hover:text-navy'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Simulated Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {filteredSimulatedEvents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-muted text-lg">No events found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSimulatedEvents.map((event) => {
                const { month, day, weekday } = formatDate(event.date);
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Date header */}
                    <div className="flex items-center gap-4 px-6 pt-6 pb-3">
                      <div className="bg-navy text-white rounded-lg w-14 h-14 flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs font-medium uppercase leading-none">{month}</span>
                        <span className="text-xl font-bold leading-none mt-0.5">{day}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy leading-tight">{event.title}</h3>
                        <p className="text-text-light text-sm">{weekday}</p>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="px-6 pb-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-3 mb-3 text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {event.location}
                        </span>
                      </div>

                      <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              categoryColors[event.category] || 'bg-surface text-text-muted'
                            }`}
                          >
                            {categoryLabels[event.category] || event.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-text-light">
                            <Users size={12} />
                            {event.spotsLeft} spots left
                          </span>
                        </div>
                        <button
                          onClick={() => handleRegister(event.title)}
                          className="px-4 py-2 bg-grimsby text-white text-sm font-medium rounded-lg hover:bg-grimsby-light transition-colors"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
