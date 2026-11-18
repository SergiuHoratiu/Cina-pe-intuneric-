import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  onReserveClick: () => void;
}

const NAV_LINKS = [
  { href: '#rezervare', label: 'Rezervare' },
  { href: '#plata', label: 'Plată' },
  { href: '#finalizare', label: 'Finalizare' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar({ onReserveClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#93B8E8]/15 bg-[#070910]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        {/* Zone 1: Single-line Brand Wordmark in Editorial Serif */}
        <a
          href="#top"
          className="font-display text-xl sm:text-2xl font-medium tracking-[0.04em] text-[#F6F7FA] whitespace-nowrap shrink-0 transition-opacity duration-150 hover:opacity-85"
        >
          Cină <span className="italic text-[#E59A54]">pe întuneric</span>
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav
          aria-label="Navigare principală"
          className="hidden md:flex items-center gap-7 text-sm font-light text-[#D5DCE8]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#E59A54]/60 hover:text-white transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#rezervare"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onReserveClick();
            }}
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-5 py-2 text-xs font-medium tracking-[0.08em] uppercase bg-[#E59A54] text-[#070910] hover:bg-[#F0AE70] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Rezervă un loc
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Închide meniul' : 'Deschide meniul'}
            className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] border border-[#93B8E8]/25 text-white hover:bg-[#93B8E8]/10 transition-colors duration-150"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Navigare mobilă"
          className="md:hidden border-t border-[#93B8E8]/15 bg-[#0D111C] px-4 py-4"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center min-h-[44px] px-2 text-sm font-light text-[#E5E7EB] hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-[#93B8E8]/15">
              <a
                href="#rezervare"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  onReserveClick();
                }}
                className="flex w-full items-center justify-center min-h-[46px] px-5 py-2.5 text-xs font-medium tracking-[0.1em] uppercase bg-[#E59A54] text-[#070910] hover:bg-[#F0AE70] transition-colors"
              >
                Rezervă un loc
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
