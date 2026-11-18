import { EVENT_INFO } from '../data/eventData';

interface CompletionStepsSectionProps {
  guestCount: number;
}

export function CompletionStepsSection({
  guestCount,
}: CompletionStepsSectionProps) {
  const calculatedTotal = guestCount * EVENT_INFO.pricePerPerson;

  const steps = [
    {
      number: '01',
      title: 'Așteptați confirmarea disponibilității',
      subtitle: 'Răspuns direct pe WhatsApp',
      description:
        'După ce trimiteți mesajul precompletat pe WhatsApp, organizatorul verifică locurile disponibile în evidența reală a evenimentului (capacitate totală: 100 de locuri) și vă confirmă dacă solicitarea poate fi preluată.',
    },
    {
      number: '02',
      title: 'Achitați contribuția după confirmare',
      subtitle: 'Virament bancar sau la sediu',
      description: `Numai după ce organizatorul vă confirmă locurile și titularul exact al contului bancar, efectuați plata (${calculatedTotal} lei pentru ${guestCount} ${
        guestCount === 1 ? 'persoană' : 'persoane'
      }) prin transfer în IBAN-ul ${EVENT_INFO.iban} sau la sediul asociației (${EVENT_INFO.officeAddress}, ${EVENT_INFO.officeSchedule.toLowerCase()}).`,
    },
    {
      number: '03',
      title: 'Primiți confirmarea finală a locului',
      subtitle: 'Fără încărcare de documente pe site',
      description:
        'Confirmarea înregistrării plății și alocarea finală a locurilor se fac direct în conversația cu organizatorul pe WhatsApp sau telefonic la 0745 275 920. Tot atunci puteți confirma eventualele alergii alimentare sau detalii de sosire.',
    },
  ];

  return (
    <section
      id="finalizare"
      aria-labelledby="completion-heading"
      className="border-t border-[#93B8E8]/15 bg-[#070910] py-16 sm:py-24 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-light tracking-[0.16em] uppercase text-[#93B8E8]">
            După trimiterea mesajului
          </p>
          <h2
            id="completion-heading"
            className="mt-2.5 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[#F6F7FA] [text-wrap:balance]"
          >
            Instrucțiuni de finalizare
          </h2>
          <p className="mt-3.5 text-sm sm:text-base font-light leading-relaxed text-[#D5DCE8]">
            Trimiterea cererii pe WhatsApp este primul pas. Iată cum ajungeți de la solicitare la
            confirmarea finală a participării pentru seara de {EVENT_INFO.dateLabel}:
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col justify-between border border-[#93B8E8]/20 bg-[#0D111C] p-6 sm:p-7"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 border-b border-[#93B8E8]/15 pb-4">
                  <span className="font-display text-2xl font-medium text-[#E59A54] tabular-nums">
                    {step.number}
                  </span>
                  <span className="text-xs font-light tracking-[0.08em] uppercase text-[#9AA6BA]">
                    {step.subtitle}
                  </span>
                </div>
                <h3 className="mt-5 text-lg sm:text-xl font-normal leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#D5DCE8]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 border border-[#93B8E8]/15 bg-[#090C14] px-5 py-4 text-xs sm:text-sm font-light leading-relaxed text-[#D5DCE8]">
          <strong className="font-normal text-white">Rețineți:</strong> Nicio rezervare nu este
          considerată confirmată automat la completarea formularului.
        </p>
      </div>
    </section>
  );
}
