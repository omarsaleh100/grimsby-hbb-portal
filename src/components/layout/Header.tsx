'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

const navLinks = [
  { label: 'Living In', disabled: true },
  { label: 'Parks, Recreation and Culture', disabled: true },
  { href: '/', label: 'Build and Invest', active: true },
  { label: 'Town Hall', disabled: true },
] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-[1350px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/grimsby-logo.png"
              alt="Town of Grimsby"
              width={484}
              height={149}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = 'active' in link && link.active;
              if ('disabled' in link && link.disabled) {
                return (
                  <span
                    key={link.label}
                    className="px-4 py-2 text-[17px] text-text-light cursor-default"
                  >
                    {link.label}
                  </span>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={'href' in link ? link.href : '/'}
                  className={`px-4 py-2 text-[17px] transition-colors ${
                    isActive
                      ? 'text-grimsby font-semibold underline underline-offset-4 decoration-2 decoration-grimsby'
                      : 'text-text hover:text-teal'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {/* "I Want To" button matching grimsby.ca */}
            <span
              className="ml-2 px-5 py-2 bg-grimsby/50 text-white text-[15px] font-semibold rounded-none cursor-default"
            >
              I Want To
            </span>
            <span className="ml-2 p-2 text-text-light cursor-default" aria-label="Search">
              <Search size={20} />
            </span>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-border">
            {navLinks.map((link) => {
              const isActive = 'active' in link && link.active;
              if ('disabled' in link && link.disabled) {
                return (
                  <span
                    key={link.label}
                    className="block px-4 py-3 text-[17px] text-text-light cursor-default"
                  >
                    {link.label}
                  </span>
                );
              }
              return (
                <Link
                  key={link.label}
                  href={'href' in link ? link.href : '/'}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-[17px] ${
                    isActive ? 'text-grimsby font-semibold' : 'text-text hover:text-teal'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <span
              className="block mx-4 mt-2 px-5 py-2 bg-grimsby/50 text-white text-center font-semibold cursor-default"
            >
              I Want To
            </span>
          </nav>
        )}
      </div>
    </header>
  );
}
