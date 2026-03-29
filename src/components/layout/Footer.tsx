import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-grimsby-dark text-white mt-auto">
      <div className="max-w-[1350px] mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 text-sm">
          <div>
            <p className="font-semibold text-base mb-2">Town of Grimsby</p>
            <p className="text-white/80">160 Livingston Ave, Grimsby, ON L3M 0J5</p>
            <p className="text-white/80">905-945-9634</p>
          </div>
          <div className="flex flex-col gap-2 text-white/80">
            <Link href="https://www.grimsby.ca/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/guide" className="hover:text-white transition-colors">Zoning By-law 14-45</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Economic Development</Link>
          </div>
          <div className="flex flex-col gap-2 text-white/80">
            <Link href="/resources" className="hover:text-white transition-colors">Resources & Programs</Link>
            <Link href="/register" className="hover:text-white transition-colors">Register Your Business</Link>
            <Link href="/directory" className="hover:text-white transition-colors">Made in Grimsby</Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/20 text-white/60 text-sm flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Town of Grimsby | Economic Development Office</span>
          <span className="text-white/40">This site is a proof of concept demo by Omar Saleh &amp; Kavisha Jain</span>
        </div>
      </div>
    </footer>
  );
}
