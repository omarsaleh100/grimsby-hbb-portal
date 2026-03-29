'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Hero from '@/components/ui/Hero';
import SelfAssessmentForm from '@/components/features/SelfAssessmentForm';

export default function SelfAssessmentPage() {
  const [started, setStarted] = useState(false);

  return (
    <>
      <Breadcrumb items={[{ label: 'Self-Assessment' }]} />

      {!started ? (
        <>
          <Hero
            title="Am I Eligible?"
            description="Answer a few questions to check if your home-based business activity aligns with Grimsby's zoning rules. This takes about 2 minutes."
          />
          <div className="max-w-3xl mx-auto px-4 py-12 text-center">
            <button
              onClick={() => setStarted(true)}
              className="px-8 py-4 bg-grimsby text-white rounded-lg font-medium text-base hover:bg-grimsby-light transition-colors shadow-lg"
            >
              Start Assessment
            </button>
            <p className="mt-4 text-sm text-text-muted">
              No personal information is collected. Your answers are not saved.
            </p>
          </div>
        </>
      ) : (
        <SelfAssessmentForm />
      )}
    </>
  );
}
