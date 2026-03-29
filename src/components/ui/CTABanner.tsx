import Link from 'next/link';

interface CTABannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export default function CTABanner({ title, description, buttonText, buttonHref }: CTABannerProps) {
  return (
    <section className="bg-gradient-to-r from-grimsby-dark to-grimsby text-white">
      <div className="max-w-[1350px] mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-white/80 max-w-xl">{description}</p>
        </div>
        <Link
          href={buttonHref}
          className="px-6 py-3 bg-white text-grimsby-dark font-semibold hover:bg-white/90 transition-colors whitespace-nowrap shadow-lg"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
