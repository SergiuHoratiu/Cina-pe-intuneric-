import { MessageCircle } from 'lucide-react';
import { EVENT_INFO } from '../data/eventData';

interface MobileStickyBarProps {
  guestCount: number;
  onReserveClick: () => void;
}

export function MobileStickyBar({
  guestCount,
  onReserveClick,
}: MobileStickyBarProps) {
  const total = guestCount * EVENT_INFO.pricePerPerson;
  const quickWhatsappHref = `https://wa.me/${EVENT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Bună ziua! Doresc informații sau o rezervare la Cina pe întuneric din ${EVENT_INFO.dateShort}, ora ${EVENT_INFO.timeLabel}.`
  )}`;

  return (
    <div
      aria-label="Acțiuni rapide rezervare"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#93B8E8]/20 bg-[#070910]/95 px-4 py-2.5 backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-light tracking-[0.06em] uppercase text-[#9AA6BA] truncate">
            {guestCount} pers. estimat
          </p>
          <p className="text-sm font-medium text-[#F6F7FA] tabular-nums">
            {total} lei
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={quickWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Scrie pe WhatsApp organizatorului"
            className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs font-medium border border-[#E59A54]/60 text-[#F6F7FA] hover:bg-[#E59A54]/10 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 text-[#E59A54]" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#rezervare"
            onClick={(e) => {
              e.preventDefault();
              onReserveClick();
            }}
            className="inline-flex items-center justify-center min-h-[42px] px-4 py-2 text-xs font-medium tracking-[0.08em] uppercase bg-[#E59A54] text-[#070910] hover:bg-[#F0AE70] transition-colors whitespace-nowrap"
          >
            Rezervă
          </a>
        </div>
      </div>
    </div>
  );
}
