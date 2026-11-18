import { Check, Copy, ExternalLink, Minus, Plus, Send } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import { EVENT_INFO } from '../data/eventData';
import {
  buildReservationMessage,
  buildWhatsAppUrl,
  type ParticipationType,
} from '../types/reservation';

interface ReservationFormProps {
  participationType: ParticipationType;
  onParticipationTypeChange: (type: ParticipationType) => void;
  guestCount: number;
  onGuestCountChange: (count: number) => void;
  nameInputRef?: React.RefObject<HTMLInputElement | null>;
}

const MIN_GUESTS = 1;
const MAX_GUESTS = 50;

export function ReservationForm({
  participationType,
  onParticipationTypeChange,
  guestCount,
  onGuestCountChange,
  nameInputRef: externalNameRef,
}: ReservationFormProps) {
  const [fullName, setFullName] = useState('');
  const [notes, setNotes] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [preparedUrl, setPreparedUrl] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const internalNameRef = useRef<HTMLInputElement>(null);
  const nameInputRef = externalNameRef ?? internalNameRef;
  const nameId = useId();
  const nameErrorId = useId();
  const notesId = useId();

  const estimatedTotal = guestCount * EVENT_INFO.pricePerPerson;

  const handleSelectParticipation = (type: ParticipationType) => {
    onParticipationTypeChange(type);
    if (type === 'group' && guestCount < 3) {
      onGuestCountChange(3);
    } else if (type === 'individual_couple' && guestCount > 2) {
      onGuestCountChange(2);
    }
  };

  const handleDecrement = () => {
    if (guestCount > MIN_GUESTS) {
      const next = guestCount - 1;
      onGuestCountChange(next);
      if (next <= 2 && participationType === 'group') {
        onParticipationTypeChange('individual_couple');
      }
    }
  };

  const handleIncrement = () => {
    if (guestCount < MAX_GUESTS) {
      const next = guestCount + 1;
      onGuestCountChange(next);
      if (next >= 3 && participationType === 'individual_couple') {
        onParticipationTypeChange('group');
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = fullName.trim();

    if (trimmedName.length < 2) {
      setNameError('Vă rugăm să introduceți numele complet pentru rezervare.');
      nameInputRef.current?.focus();
      return;
    }

    setNameError(null);
    const message = buildReservationMessage(
      {
        participationType,
        guestCount,
        fullName: trimmedName,
        notes,
      },
      EVENT_INFO.pricePerPerson,
      EVENT_INFO.dateShort,
      EVENT_INFO.timeLabel
    );
    const url = buildWhatsAppUrl(EVENT_INFO.whatsappNumber, message);

    setPreparedMessage(message);
    setPreparedUrl(url);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCopyMessage = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 3000);
    } catch {
      setCopiedMessage(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-[#93B8E8]/20 bg-[#0D111C]/95 p-5 sm:p-7 shadow-2xl"
    >
      <div className="flex items-baseline justify-between gap-4 border-b border-[#93B8E8]/15 pb-4">
        <div>
          <p className="text-xs font-light tracking-[0.14em] uppercase text-[#E59A54]">
            Solicitare bilete & locuri
          </p>
          <h2 className="mt-1 font-display text-2xl sm:text-[1.75rem] font-medium text-[#F6F7FA]">
            Rezervă un loc prin WhatsApp
          </h2>
        </div>
        <span className="text-sm font-normal text-[#E5E7EB] tabular-nums shrink-0">
          {EVENT_INFO.pricePerPerson} lei / pers.
        </span>
      </div>

      {/* 1. Tip rezervare */}
      <fieldset className="mt-5">
        <legend className="text-xs font-light tracking-[0.14em] uppercase text-[#93B8E8]">
          1. Tip de participare
        </legend>
        <div className="mt-2.5 grid grid-cols-2 gap-2 border border-[#93B8E8]/15 bg-[#070910] p-1.5">
          <button
            type="button"
            onClick={() => handleSelectParticipation('individual_couple')}
            aria-pressed={participationType === 'individual_couple'}
            className={`min-h-[44px] px-3 py-2 text-xs sm:text-sm font-normal transition-colors duration-150 ${
              participationType === 'individual_couple'
                ? 'bg-[#F6F7FA] text-[#070910] font-medium'
                : 'text-[#D5DCE8] hover:text-white hover:bg-[#93B8E8]/10'
            }`}
          >
            Individual / Cuplu
          </button>
          <button
            type="button"
            onClick={() => handleSelectParticipation('group')}
            aria-pressed={participationType === 'group'}
            className={`min-h-[44px] px-3 py-2 text-xs sm:text-sm font-normal transition-colors duration-150 ${
              participationType === 'group'
                ? 'bg-[#F6F7FA] text-[#070910] font-medium'
                : 'text-[#D5DCE8] hover:text-white hover:bg-[#93B8E8]/10'
            }`}
          >
            Grup / Prieteni
          </button>
        </div>
      </fieldset>

      {/* 2. Numar persoane + calculator pret */}
      <div className="mt-5 border-t border-[#93B8E8]/15 pt-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="block text-xs font-light tracking-[0.14em] uppercase text-[#93B8E8]">
              2. Număr de persoane
            </span>
            <span className="mt-0.5 block text-xs font-light text-[#9AA6BA]">
              Capacitate sală: {EVENT_INFO.totalCapacity} locuri
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={guestCount <= MIN_GUESTS}
              aria-label="Scade numărul de persoane"
              className="inline-flex h-11 w-11 items-center justify-center border border-[#93B8E8]/25 bg-[#070910] text-white hover:border-[#E59A54] disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>

            <div
              aria-live="polite"
              className="min-w-[2.75rem] text-center text-xl font-normal text-white tabular-nums"
            >
              {guestCount}
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              disabled={guestCount >= MAX_GUESTS}
              aria-label="Crește numărul de persoane"
              className="inline-flex h-11 w-11 items-center justify-center border border-[#93B8E8]/25 bg-[#070910] text-white hover:border-[#E59A54] disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Real-time Estimated Total */}
        <div
          aria-live="polite"
          className="mt-4 flex items-baseline justify-between border border-[#93B8E8]/15 bg-[#070910] px-4 py-3"
        >
          <span className="text-xs sm:text-sm font-light text-[#D5DCE8]">
            Total estimat ({guestCount} × {EVENT_INFO.pricePerPerson} lei)
          </span>
          <span className="text-xl font-normal text-[#E59A54] tabular-nums">
            {estimatedTotal} lei
          </span>
        </div>
      </div>

      {/* 3. Nume pentru rezervare */}
      <div className="mt-5 border-t border-[#93B8E8]/15 pt-5">
        <label
          htmlFor={nameId}
          className="block text-xs font-light tracking-[0.14em] uppercase text-[#93B8E8]"
        >
          3. Numele pentru rezervare <span className="text-[#E59A54]">*</span>
        </label>
        <input
          ref={nameInputRef}
          id={nameId}
          type="text"
          required
          autoComplete="name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (nameError) setNameError(null);
          }}
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? nameErrorId : undefined}
          placeholder="Ex.: Andrei Popescu"
          className="mt-2 w-full min-h-[46px] border border-[#93B8E8]/25 bg-[#070910] px-3.5 py-2.5 text-sm sm:text-base font-light text-white placeholder:text-[#6B768A] focus:border-[#E59A54] focus:outline-none"
        />
        {nameError && (
          <p
            id={nameErrorId}
            role="alert"
            className="mt-1.5 text-xs font-normal text-[#F0AE70]"
          >
            {nameError}
          </p>
        )}
      </div>

      {/* 4. Observatii optionale */}
      <div className="mt-4">
        <label
          htmlFor={notesId}
          className="block text-xs font-light tracking-[0.14em] uppercase text-[#93B8E8]"
        >
          4. Observații opționale
        </label>
        <textarea
          id={notesId}
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Alergeni, preferințe alimentare, întrebări sau mențiunea mesei de grup"
          className="mt-2 w-full border border-[#93B8E8]/25 bg-[#070910] px-3.5 py-2.5 text-sm font-light text-white placeholder:text-[#6B768A] focus:border-[#E59A54] focus:outline-none"
        />
      </div>

      {/* Submit CTA */}
      <div className="mt-5">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2.5 min-h-[50px] px-5 py-3 text-xs sm:text-sm font-medium tracking-[0.12em] uppercase bg-[#E59A54] text-[#070910] hover:bg-[#F0AE70] transition-colors duration-150"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span>Trimite cererea pe WhatsApp</span>
        </button>

        <p className="mt-2.5 text-[11px] sm:text-xs font-light leading-relaxed text-[#9AA6BA]">
          Apăsarea butonului deschide WhatsApp și nu confirmă automat locurile. Rezervarea devine
          valabilă după confirmarea organizatorului.
        </p>
      </div>

      {/* Honest Request Summary / Fallback Copy */}
      {preparedMessage && preparedUrl && (
        <div
          role="status"
          aria-live="polite"
          className="mt-5 border border-[#93B8E8]/25 bg-[#070910] p-4"
        >
          <p className="text-xs font-medium tracking-[0.08em] uppercase text-[#E59A54]">
            Solicitare pregătită (în așteptarea confirmării)
          </p>
          <pre className="mt-2.5 whitespace-pre-wrap border border-[#93B8E8]/15 bg-[#0D111C] p-3 font-sans text-xs font-light leading-relaxed text-[#E5E7EB]">
            {preparedMessage}
          </pre>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <a
              href={preparedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-medium bg-[#F6F7FA] text-[#070910] hover:bg-white transition-colors"
            >
              <span>Deschide WhatsApp</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-normal border border-[#93B8E8]/25 text-white hover:bg-[#93B8E8]/10 transition-colors"
            >
              {copiedMessage ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#E59A54]" aria-hidden="true" />
                  <span>Mesaj copiat</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copiază mesajul</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
