import Link from 'next/link';

export default function TopBar() {
  return (
    <div className="bg-grimsby-dark text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">Town of Grimsby</span>
          <span className="text-white/50">|</span>
          <Link href="https://grimsby.ca" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
            grimsby.ca
          </Link>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white/80">
          <Link href="https://www.grimsby.ca/accessibility/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Accessibility</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          <Link href="https://www.grimsby.ca/sitemap/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sitemap</Link>
        </div>
      </div>
    </div>
  );
}
