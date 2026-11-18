import { useRef, useState } from 'react';
import { CompletionStepsSection } from './components/CompletionStepsSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Navbar } from './components/Navbar';
import { PaymentSection } from './components/PaymentSection';
import type { ParticipationType } from './types/reservation';

export default function App() {
  const [participationType, setParticipationType] =
    useState<ParticipationType>('individual_couple');
  const [guestCount, setGuestCount] = useState<number>(2);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const scrollToReservation = () => {
    const el = document.getElementById('rezervare');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#070910] text-[#F6F7FA]">
      {/* Skip to Main Content for Keyboard & Screen Readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2.5 focus:text-xs focus:font-medium focus:text-[#070910]"
      >
        Sari la conținutul principal
      </a>

      <Navbar onReserveClick={scrollToReservation} />

      <main id="main-content">
        {/* 1. Primul ecran: Titlu distinctiv, informații esențiale & modul de rezervare */}
        <HeroSection
          participationType={participationType}
          onParticipationTypeChange={setParticipationType}
          guestCount={guestCount}
          onGuestCountChange={setGuestCount}
          onReserveClick={scrollToReservation}
          nameInputRef={nameInputRef}
        />

        {/* 2. Modalități de plată & IBAN */}
        <PaymentSection guestCount={guestCount} />

        {/* 3. Instrucțiuni de finalizare */}
        <CompletionStepsSection guestCount={guestCount} />
      </main>

      {/* 4. Contact final: Scrie pe WhatsApp și număr de telefon */}
      <Footer />

      <MobileStickyBar
        guestCount={guestCount}
        onReserveClick={scrollToReservation}
      />
    </div>
  );
}
