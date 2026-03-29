'use client';

import Breadcrumb from '@/components/layout/Breadcrumb';
import Hero from '@/components/ui/Hero';
import CTABanner from '@/components/ui/CTABanner';
import DirectoryGrid from '@/components/features/DirectoryGrid';

export default function DirectoryPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Made in Grimsby Directory' }]} />
      <Hero
        title="Made in Grimsby"
        description="Discover local home-based businesses and support the Grimsby economy. From artisan goods to professional services, explore what our community has to offer residents and the 3.3 million visitors who pass through each year."
      />
      <DirectoryGrid />

      {/* Tourism note */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-surface rounded-xl border border-border p-6 text-sm text-text-muted">
          Grimsby welcomes 3.3 million visitors annually through the Grimsby Welcome Centre. Getting listed in the Made in Grimsby directory helps connect your business with both locals and tourists.
        </div>
      </div>

      <CTABanner
        title="Get Listed"
        description="Register your home-based business and join the Made in Grimsby directory to reach locals and tourists alike."
        buttonText="Register Your Business"
        buttonHref="/register"
      />
    </>
  );
}
