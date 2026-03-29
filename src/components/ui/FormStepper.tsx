'use client';

import { Check } from 'lucide-react';

interface FormStepperProps {
  steps: string[];
  currentStep: number;
  onNext?: () => void;
  onBack?: () => void;
}

export default function FormStepper({ steps, currentStep, onNext, onBack }: FormStepperProps) {
  return (
    <div className="w-full">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((label, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={index} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isComplete
                      ? 'bg-grimsby text-white'
                      : isCurrent
                        ? 'bg-navy text-white'
                        : 'bg-surface border-2 border-border text-text-muted'
                  }`}
                >
                  {isComplete ? <Check size={18} /> : index + 1}
                </div>
                <span
                  className={`mt-2 text-xs text-center font-medium ${
                    isCurrent ? 'text-navy' : isComplete ? 'text-grimsby' : 'text-text-light'
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 mb-6 ${
                    isComplete ? 'bg-grimsby' : 'bg-border'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          disabled={currentStep === 0}
          className="px-6 py-2 border border-border rounded-lg text-sm font-medium text-text-muted hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={currentStep === steps.length - 1}
          className="px-6 py-2 bg-grimsby text-white rounded-lg text-sm font-medium hover:bg-grimsby-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {currentStep === steps.length - 2 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
