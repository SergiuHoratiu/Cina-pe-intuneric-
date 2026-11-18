import { MessageCircle, Phone } from 'lucide-react';
import { EVENT_IMAGES, EVENT_INFO } from '../data/eventData';

export function Footer() {
  const whatsappHref = `https://wa.me/${EVENT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Bună ziua! Doresc informații sau confirmarea locurilor pentru Cină pe întuneric din 3 decembrie 2026.'
  )}`;

  return (
    <footer
      id="contact"
      className="border-t border-[#93B8E8]/20 bg-[#090C14] pt-12 pb-24 md:pb-12 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={EVENT_IMAGES.anrMark}
              alt="Sigla Asociației Nevăzătorilor din România"
              referrerPolicy="no-referrer"
              className="h-9 w-auto shrink-0 object-contain"
            />
            <div>
              <p className="font-display text-xl font-medium text-[#F6F7FA]">
                Cină <span className="italic text-[#E59A54]">pe întuneric</span>
              </p>
              <p className="text-xs font-light text-[#9AA6BA]">
                {EVENT_INFO.organizerName}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 text-xs sm:text-sm font-medium tracking-[0.1em] uppercase bg-[#E59A54] text-[#070910] hover:bg-[#F0AE70] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Scrie pe WhatsApp</span>
            </a>

            <a
              href={EVENT_INFO.phoneTelHref}
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 text-xs sm:text-sm font-normal tracking-[0.1em] uppercase border border-[#93B8E8]/35 text-[#F6F7FA] hover:border-[#E59A54] hover:bg-[#93B8E8]/10 transition-colors whitespace-nowrap tabular-nums"
            >
              <Phone className="h-4 w-4 text-[#93B8E8]" aria-hidden="true" />
              <span>{EVENT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
