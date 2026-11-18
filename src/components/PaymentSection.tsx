import { Check, Copy, Landmark, MapPin, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { EVENT_INFO } from '../data/eventData';

interface PaymentSectionProps {
  guestCount: number;
}

export function PaymentSection({ guestCount }: PaymentSectionProps) {
  const [copiedIban, setCopiedIban] = useState(false);
  const calculatedTotal = guestCount * EVENT_INFO.pricePerPerson;

  const handleCopyIban = async () => {
    try {
      await navigator.clipboard.writeText(EVENT_INFO.iban);
      setCopiedIban(true);
      setTimeout(() => setCopiedIban(false), 3000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = EVENT_INFO.iban;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedIban(true);
      setTimeout(() => setCopiedIban(false), 3000);
    }
  };

  const confirmBankDetailsUrl = `https://wa.me/${EVENT_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Bună ziua! Doresc să confirm disponibilitatea locurilor (${guestCount} pers. / ${calculatedTotal} lei) și titularul exact al contului bancar înainte de a efectua viramentul.`
  )}`;

  return (
    <section
      id="plata"
      aria-labelledby="payment-heading"
      className="border-t border-[#93B8E8]/15 bg-[#090C14] py-16 sm:py-24 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-light tracking-[0.16em] uppercase text-[#E59A54]">
              Achiziție & contribuție
            </p>
            <h2
              id="payment-heading"
              className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[#F6F7FA] [text-wrap:balance]"
            >
              Modalități de plată
            </h2>
            <p className="mt-3.5 text-sm sm:text-base font-light leading-relaxed text-[#D5DCE8]">
              După ce trimiteți solicitarea și primiți confirmarea locurilor de la organizator (
              <a
                href={EVENT_INFO.phoneTelHref}
                className="text-white underline decoration-[#93B8E8]/40 underline-offset-4 hover:decoration-[#E59A54] tabular-nums"
              >
                {EVENT_INFO.phoneDisplay}
              </a>
              ), puteți achita contribuția prin una dintre următoarele două modalități:
            </p>
          </div>

          <div className="border border-[#93B8E8]/20 bg-[#0D111C] px-5 py-4 shrink-0">
            <p className="text-xs font-light tracking-[0.1em] uppercase text-[#9AA6BA]">
              Sumă calculată ({guestCount} {guestCount === 1 ? 'persoană' : 'persoane'})
            </p>
            <p className="mt-1 text-2xl font-normal text-[#E59A54] tabular-nums">
              {calculatedTotal} lei
            </p>
          </div>
        </div>

        {/* Two Payment Methods */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* A. Virament bancar */}
          <div className="flex flex-col justify-between border border-[#93B8E8]/20 bg-[#0D111C] p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3">
                <Landmark className="h-5 w-5 text-[#93B8E8]" aria-hidden="true" />
                <h3 className="font-display text-2xl font-medium text-white">
                  A. Virament bancar
                </h3>
              </div>

              <p className="mt-4 text-sm font-light leading-relaxed text-[#D5DCE8]">
                Transfer bancar pentru contribuția de participare:
              </p>

              <div className="mt-4 border border-[#93B8E8]/15 bg-[#070910] p-4">
                <span className="block text-xs font-light tracking-[0.1em] uppercase text-[#9AA6BA]">
                  Cod IBAN
                </span>
                <p className="mt-1.5 font-mono text-sm sm:text-base font-medium tracking-wider text-white break-all select-all tabular-nums">
                  {EVENT_INFO.iban}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyIban}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-xs font-medium tracking-[0.1em] uppercase bg-[#F6F7FA] text-[#070910] hover:bg-white transition-colors"
                  >
                    {copiedIban ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        <span>IBAN copiat</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        <span>Copiază IBAN</span>
                      </>
                    )}
                  </button>

                  <span
                    aria-live="polite"
                    className="text-xs font-light text-[#E59A54]"
                  >
                    {copiedIban ? 'Codul IBAN a fost copiat în clipboard.' : ''}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm font-light leading-relaxed text-[#D5DCE8]">
                <strong className="font-medium text-white">Important:</strong>{' '}
                {EVENT_INFO.ibanHolderNote}
              </p>
            </div>

            <div className="mt-6 border-t border-[#93B8E8]/15 pt-5">
              <a
                href={confirmBankDetailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] text-xs font-medium tracking-[0.1em] uppercase text-[#E59A54] hover:text-[#F0AE70] transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Confirmă datele bancare pe WhatsApp</span>
              </a>
            </div>
          </div>

          {/* B. Plata la sediul asociatiei */}
          <div className="flex flex-col justify-between border border-[#93B8E8]/20 bg-[#0D111C] p-6 sm:p-8">
            <div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#93B8E8]" aria-hidden="true" />
                <h3 className="font-display text-2xl font-medium text-white">
                  B. Plată la sediul asociației
                </h3>
              </div>

              <p className="mt-4 text-sm font-light leading-relaxed text-[#D5DCE8]">
                Contribuția poate fi achitată și direct la sediul organizatorului, în timpul
                programului de lucru:
              </p>

              <dl className="mt-5 space-y-4 border border-[#93B8E8]/15 bg-[#070910] p-4 text-sm">
                <div>
                  <dt className="text-xs font-light tracking-[0.1em] uppercase text-[#9AA6BA]">
                    Organizație
                  </dt>
                  <dd className="mt-1 font-normal text-white">
                    {EVENT_INFO.organizerName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-light tracking-[0.1em] uppercase text-[#9AA6BA]">
                    Adresă sediu
                  </dt>
                  <dd className="mt-1 font-normal text-white">
                    {EVENT_INFO.officeAddress}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-light tracking-[0.1em] uppercase text-[#9AA6BA]">
                    Program
                  </dt>
                  <dd className="mt-1 font-normal text-white tabular-nums">
                    {EVENT_INFO.officeSchedule}
                  </dd>
                </div>
              </dl>
            </div>

            <p className="mt-6 border-t border-[#93B8E8]/15 pt-5 text-xs font-light leading-relaxed text-[#9AA6BA]">
              Vă recomandăm să anunțați vizita în prealabil la {EVENT_INFO.phoneDisplay} pentru
              confirmarea disponibilității locurilor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
