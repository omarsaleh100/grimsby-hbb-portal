'use client';

interface WorkshopRegistrationButtonProps {
  title: string;
  variant?: 'default' | 'light';
}

export default function WorkshopRegistrationButton({
  title,
  variant = 'default',
}: WorkshopRegistrationButtonProps) {
  function handleRegister() {
    alert(
      `Registration is simulated \u2014 in a live portal, this would reserve your spot for "${title}" ($10 fee).`
    );
  }

  if (variant === 'light') {
    return (
      <button
        onClick={handleRegister}
        className="px-8 py-3 bg-white text-grimsby-dark font-semibold rounded-lg hover:bg-white/90 transition-colors shadow-lg text-sm"
      >
        Register Now \u2014 $10
      </button>
    );
  }

  return (
    <button
      onClick={handleRegister}
      className="w-full md:w-auto px-8 py-3 bg-grimsby text-white font-semibold rounded-lg hover:bg-grimsby-light transition-colors text-sm"
    >
      Register Now
    </button>
  );
}
