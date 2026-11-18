import { ArrowRight, Phone } from 'lucide-react';
import { useState } from 'react';
import { EVENT_IMAGES, EVENT_INFO } from '../data/eventData';
import type { ParticipationType } from '../types/reservation';
import { ReservationForm } from './ReservationForm';

interface HeroSectionProps {
  participationType: ParticipationType;
  onParticipationTypeChange: (type: ParticipationType) => void;
  guestCount: number;
  onGuestCountChange: (count: number) => void;
  onReserveClick: () => void;
  nameInputRef?: React.RefObject<HTMLInputElement | null>;
}

export function HeroSection({
  participationType,
  onParticipationTypeChange,
  guestCount,
  onGuestCountChange,
  onReserveClick,
  nameInputRef,
}: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#070910]"
    >
      {/* Background Atmospheric Midnight Glow + Silhouette Media */}
      <div className="absolute inset-0 -z-10">
        {!imgError ? (
          <img
            src={EVENT_IMAGES.heroBackdrop}
            alt="Siluete discrete la o masă în întuneric, conturate de lumină rece de margine"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center opacity-35 mix-blend-lighten"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full bg-[radial-gradient(ellipse_at_65%_40%,rgba(147,184,232,0.14),rgba(7,9,16,0.98)_65%)]"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_22%_28%,rgba(229,154,84,0.12),transparent_48%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#070910] via-[#070910]/90 to-[#070910]/75"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#070910] via-transparent to-[#070910]/65"
        />
      </div>

      {/* Ticket-First Above-the-Fold Grid */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Left Column: Distinctive Editorial Title, Motto & Key Facts */}
          <div className="lg:col-span-6 lg:pt-2">
            {/* Official ANR Mark + Organizer Attribution */}
            <div className="flex items-center gap-3.5">
              <img
                src={EVENT_IMAGES.anrMark}
                alt="Sigla Asociației Nevăzătorilor din România"
                referrerPolicy="no-referrer"
                className="h-9 w-auto shrink-0 object-contain"
              />
              <span className="text-xs font-light leading-snug text-[#D5DCE8]">
                {EVENT_INFO.organizerName}
              </span>
            </div>

            {/* Unboxed Event Date / Time / Location Metadata */}
            <div className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-light tracking-[0.14em] uppercase text-[#93B8E8]">
              <span>{EVENT_INFO.dateLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Ora {EVENT_INFO.timeLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{EVENT_INFO.venueName}, Satu Mare</span>
            </div>

            {/* Recognizable Editorial Display Title Composition */}
            <h1
              id="hero-title"
              className="mt-5 font-display text-[clamp(3.6rem,7.2vw,6.15rem)] font-medium leading-[0.9] tracking-[-0.015em] [text-wrap:balance]"
            >
              <span className="block tracking-[0.04em] bg-gradient-to-br from-white via-[#F6F7FA] to-[#A9C4E8] bg-clip-text text-transparent">
                CINĂ
              </span>
              <span className="mt-1 block italic font-normal pr-2 pb-1 bg-gradient-to-r from-[#E59A54] via-[#F7CE9E] to-[#DF8B44] bg-clip-text text-transparent">
                pe întuneric
              </span>
            </h1>

            {/* Framed Official Motto */}
            <div className="mt-6 border-t border-b border-[#93B8E8]/20 py-4">
              <p className="font-display text-2xl sm:text-[1.75rem] italic font-normal leading-snug text-[#F6F7FA] [text-wrap:balance]">
                „{EVENT_INFO.motto}”
              </p>
            </div>

            {/* Subheadline */}
            <p className="mt-5 max-w-xl text-sm sm:text-base font-light leading-relaxed text-[#D5DCE8]">
              {EVENT_INFO.subheadline}
            </p>

            {/* Quick Mobile Jump + Payment Anchor */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#rezervare"
                onClick={(e) => {
                  e.preventDefault();
                  onReserveClick();
                }}
                className="lg:hidden inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 text-xs font-medium tracking-[0.12em] uppercase bg-[#E59A54] text-[#070910] hover:bg-[#F0AE70] transition-colors whitespace-nowrap"
              >
                <span>Rezervă un loc</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#plata"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 text-xs font-normal tracking-[0.12em] uppercase border border-[#93B8E8]/35 text-[#F6F7FA] hover:border-[#E59A54]/70 hover:bg-[#93B8E8]/10 transition-colors whitespace-nowrap"
              >
                <span>Modalități de plată</span>
              </a>

              <a
                href="#finalizare"
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 text-xs font-light tracking-[0.12em] uppercase text-[#93B8E8] hover:text-white transition-colors whitespace-nowrap"
              >
                <span>Instrucțiuni finalizare</span>
              </a>
            </div>

            {/* Key Ticket Facts Strip */}
            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-5 border-t border-[#93B8E8]/15 pt-6 text-sm">
              <div>
                <dt className="text-xs font-light tracking-[0.08em] uppercase text-[#9AA6BA]">
                  Contribuție
                </dt>
                <dd className="mt-1 font-normal text-[#F6F7FA] tabular-nums">
                  {EVENT_INFO.pricePerPerson} lei / persoană
                </dd>
              </div>
              <div>
                <dt className="text-xs font-light tracking-[0.08em] uppercase text-[#9AA6BA]">
                  Meniu inclus
                </dt>
                <dd className="mt-1 font-light text-[#D5DCE8]">
                  Fel principal, desert, răcoritoare
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-xs font-light tracking-[0.08em] uppercase text-[#9AA6BA]">
                  Telefon / WhatsApp
                </dt>
                <dd className="mt-1">
                  <a
                    href={EVENT_INFO.phoneTelHref}
                    className="inline-flex items-center gap-1.5 font-normal text-[#F6F7FA] hover:text-[#E59A54] transition-colors tabular-nums"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#93B8E8]" aria-hidden="true" />
                    <span>{EVENT_INFO.phoneDisplay}</span>
                  </a>
                </dd>
              </div>
            </dl>

            {/* Concise Charitable Purpose Note */}
            <p className="mt-6 text-xs sm:text-sm font-light leading-relaxed text-[#9AA6BA]">
              {EVENT_INFO.charityStatement}
            </p>
          </div>

          {/* Right Column: Ticket Reservation Module Immediately Highlighted */}
          <div id="rezervare" className="lg:col-span-6 scroll-mt-24">
            <ReservationForm
              participationType={participationType}
              onParticipationTypeChange={onParticipationTypeChange}
              guestCount={guestCount}
              onGuestCountChange={onGuestCountChange}
              nameInputRef={nameInputRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
