import Link from 'next/link';

interface HeroButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface HeroProps {
  title: string;
  description: string;
  buttons?: HeroButton[];
  showDecoration?: boolean;
}

export default function Hero({ title, description, buttons = [], showDecoration = true }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-r from-grimsby-dark via-grimsby to-teal text-white overflow-hidden">
      {showDecoration && (
        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-white/5" />
      )}
      {showDecoration && (
        <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-white/5" />
      )}
      <div className="relative max-w-[1350px] mx-auto px-4 py-16 md:py-24">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl">{title}</h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">{description}</p>
        {buttons.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {buttons.map((btn) => (
              <Link
                key={btn.label}
                href={btn.href}
                className={`px-6 py-3 font-semibold text-sm transition-all ${
                  btn.variant === 'secondary'
                    ? 'bg-white/20 hover:bg-white/30 text-white border border-white/40'
                    : 'bg-white text-grimsby-dark hover:bg-white/90 shadow-lg'
                }`}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
