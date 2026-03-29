'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Phone,
  Mail,
  RotateCcw,
} from 'lucide-react';
import FormStepper from '@/components/ui/FormStepper';
import TrafficLight from '@/components/ui/TrafficLight';
import {
  assessmentQuestions,
  calculateAssessment,
  type AssessmentQuestion,
} from '@/data/assessment';
import { departmentContacts } from '@/data/zoning';
import type { AssessmentAnswer, AssessmentResult, EligibilityResult } from '@/types';

const stepLabels = assessmentQuestions.map((_, i) => `Q${i + 1}`);

const initialAnswers: AssessmentAnswer = {
  businessType: '',
  operatingSpace: '',
  floorArea: '',
  employees: '',
  clientVisits: '',
  signage: undefined as unknown as boolean,
  parkingImpact: undefined as unknown as boolean,
  noiseOdor: undefined as unknown as boolean,
};

const trafficLightContent: Record<
  EligibilityResult,
  { title: string; description: string }
> = {
  green: {
    title: 'Likely Compliant',
    description:
      'Based on your answers, your home-based business appears to align with Grimsby\'s zoning rules. You are in a great position to move forward.',
  },
  yellow: {
    title: 'May Need Permits or Adjustments',
    description:
      'Your business may be possible as a home occupation, but some aspects need attention. A few adjustments or permits could get you on track.',
  },
  red: {
    title: 'Let\'s Find the Right Path',
    description:
      'Your business as described may not fit the home occupation rules, but there are good alternatives. Let\'s explore options that work for you.',
  },
};

export default function SelfAssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer>({ ...initialAnswers });
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const question = assessmentQuestions[currentStep] as AssessmentQuestion | undefined;

  const currentValue = question ? answers[question.id] : undefined;

  const canProceed =
    question?.type === 'boolean'
      ? currentValue === true || currentValue === false
      : typeof currentValue === 'string' && currentValue !== '';

  const handleSelectOption = useCallback(
    (value: string) => {
      if (!question) return;
      setAnswers((prev) => ({ ...prev, [question.id]: value }));
    },
    [question],
  );

  const handleBooleanOption = useCallback(
    (value: boolean) => {
      if (!question) return;
      setAnswers((prev) => ({ ...prev, [question.id]: value }));
    },
    [question],
  );

  const handleNext = useCallback(() => {
    if (currentStep < assessmentQuestions.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      const assessed = calculateAssessment(answers);
      setResult(assessed);
      setShowResults(true);
    }
  }, [currentStep, answers]);

  const handleBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep, showResults]);

  const handleRestart = useCallback(() => {
    setCurrentStep(0);
    setAnswers({ ...initialAnswers });
    setResult(null);
    setShowResults(false);
  }, []);

  // Results view
  if (showResults && result) {
    const tl = trafficLightContent[result.eligibility];
    const relevantDepartments = departmentContacts.filter((d) =>
      result.departmentsToContact.includes(d.name),
    );

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8 space-y-8">
          {/* Traffic light */}
          <TrafficLight
            result={result.eligibility}
            title={tl.title}
            description={tl.description}
          />

          {/* Score summary */}
          <div className="text-center">
            <p className="text-sm text-text-muted">
              Assessment score: {result.score} flag{result.score !== 1 ? 's' : ''} raised
            </p>
          </div>

          {/* Flags */}
          {result.flags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-navy mb-3 flex items-center gap-2">
                <AlertCircle size={20} className="text-amber-500" />
                Items to Address
              </h3>
              <ul className="space-y-2">
                {result.flags.map((flag, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 bg-surface rounded-lg p-3 text-sm text-text"
                  >
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">&#8226;</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Departments */}
          {relevantDepartments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-navy mb-3">
                Departments to Contact
              </h3>
              <div className="space-y-3">
                {relevantDepartments.map((dept) => (
                  <div
                    key={dept.name}
                    className="border border-border rounded-lg p-4"
                  >
                    <p className="font-medium text-navy">{dept.name}</p>
                    <p className="text-sm text-text-muted mb-2">{dept.role}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1 text-text-muted">
                        <Phone size={14} /> {dept.phone}
                      </span>
                      <span className="flex items-center gap-1 text-text-muted">
                        <Mail size={14} /> {dept.email}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-navy mb-3">
                Recommended Next Steps
              </h3>
              <ol className="space-y-2 list-decimal list-inside">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-text leading-relaxed">
                    {rec}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-border">
            {result.eligibility === 'green' && (
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="px-6 py-3 bg-grimsby text-white rounded-lg font-medium text-sm hover:bg-grimsby-light transition-colors"
                >
                  Register Your Business
                </Link>
                <Link
                  href="/guide"
                  className="px-6 py-3 border border-border rounded-lg font-medium text-sm text-navy hover:bg-surface transition-colors"
                >
                  View HBB Guide
                </Link>
              </div>
            )}
            {result.eligibility === 'yellow' && (
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/guide"
                  className="px-6 py-3 bg-navy text-white rounded-lg font-medium text-sm hover:bg-navy-light transition-colors"
                >
                  Contact Planning Department
                </Link>
                <Link
                  href="/guide"
                  className="px-6 py-3 border border-border rounded-lg font-medium text-sm text-navy hover:bg-surface transition-colors"
                >
                  View HBB Guide
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 border border-border rounded-lg font-medium text-sm text-text-muted hover:bg-surface transition-colors"
                >
                  Register Anyway
                </Link>
              </div>
            )}
            {result.eligibility === 'red' && (
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/resources"
                  className="px-6 py-3 bg-navy text-white rounded-lg font-medium text-sm hover:bg-navy-light transition-colors"
                >
                  Learn About Alternatives
                </Link>
                <Link
                  href="/resources"
                  className="px-6 py-3 border border-border rounded-lg font-medium text-sm text-navy hover:bg-surface transition-colors"
                >
                  Contact Economic Development
                </Link>
                <Link
                  href="/resources"
                  className="px-6 py-3 border border-border rounded-lg font-medium text-sm text-text-muted hover:bg-surface transition-colors"
                >
                  View Resources
                </Link>
              </div>
            )}
          </div>

          {/* Restart */}
          <div className="text-center">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-navy transition-colors"
            >
              <RotateCcw size={14} />
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question view
  if (!question) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Stepper progress */}
      <div className="mb-8">
        <FormStepper steps={stepLabels} currentStep={currentStep} />
      </div>

      {/* Progress bar */}
      <div className="w-full bg-border rounded-full h-2 mb-10">
        <div
          className="bg-grimsby h-2 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${((currentStep + 1) / assessmentQuestions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-lg border border-border p-8 transition-all duration-300">
        <p className="text-xs font-medium text-grimsby uppercase tracking-wide mb-2">
          Question {currentStep + 1} of {assessmentQuestions.length}
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-navy mb-2">
          {question.label}
        </h2>
        <p className="text-sm text-text-muted mb-8">{question.description}</p>

        {/* Options */}
        <div className="space-y-3">
          {question.type === 'select' &&
            question.options?.map((option) => {
              const isSelected = currentValue === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelectOption(option.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-grimsby bg-grimsby/5'
                      : 'border-border hover:border-navy-light'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'border-grimsby bg-grimsby'
                          : 'border-text-light'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? 'text-navy' : 'text-text'
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}

          {question.type === 'boolean' && (
            <>
              {[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ].map((option) => {
                const isSelected = currentValue === option.value;
                return (
                  <button
                    key={String(option.value)}
                    onClick={() => handleBooleanOption(option.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-grimsby bg-grimsby/5'
                        : 'border-border hover:border-navy-light'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? 'border-grimsby bg-grimsby'
                            : 'border-text-light'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? 'text-navy' : 'text-text'
                        }`}
                      >
                        {option.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-sm font-medium text-text-muted hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="inline-flex items-center gap-2 px-6 py-3 bg-grimsby text-white rounded-lg text-sm font-medium hover:bg-grimsby-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {currentStep === assessmentQuestions.length - 1 ? 'See Results' : 'Next'}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
