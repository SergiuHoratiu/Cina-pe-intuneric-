export const EVENT_INFO = {
  title: 'CINĂ PE ÎNTUNERIC',
  motto: 'Haina și vederea rămân la garderobă.',
  subheadline:
    'O cină diferită. O seară în care gustul, vocile și conversațiile devin protagoniste.',
  dateLabel: '3 decembrie 2026',
  dateShort: '3 decembrie',
  timeLabel: '18:00',
  venueName: 'Restaurant Select',
  cityCountry: 'Satu Mare, România',
  venueFull: 'Restaurant Select, Satu Mare, România',
  organizerName: 'Asociația Nevăzătorilor din România – Filiala Satu Mare',
  organizerShort: 'ANR – Filiala Satu Mare',
  pricePerPerson: 150,
  currency: 'lei',
  totalCapacity: 100,
  phoneDisplay: '0745 275 920',
  phoneTelHref: 'tel:+40745275920',
  whatsappNumber: '40745275920',
  iban: 'RO83RNCB0221043051950002',
  ibanHolderNote:
    'Titularul exact al contului bancar se confirmă cu organizatorul înainte de efectuarea viramentului.',
  officeAddress: 'Str. Nicolae Golescu nr. 39, Satu Mare',
  officeSchedule: 'Luni–vineri, 08:00–16:00',
  charityStatement:
    'Banii strânși merg către comunitatea persoanelor nevăzătoare din Satu Mare: acum, înainte de Crăciun, pentru pachete, și pentru alte nevoi ale asociației.',
  menuSummary:
    'Fel principal, desert și răcoritoare incluse. Informațiile despre alergeni și opțiuni alimentare se solicită organizatorului.',
  musicGuests: 'Ionel Man și Robert Filip',
  musicNote:
    'Muzică și atmosferă live cu Ionel Man și Robert Filip (sub rezerva confirmării dreptului de publicare a numelor).',
} as const;

export const EVENT_IMAGES = {
  // Materiale oficiale ale campaniei & sigla ANR
  campaignCover: '/assets/aistudio/Cina_pe_intuneric_01_Coperta_b13bcc02.jpg',
  campaignPlate: '/assets/aistudio/Cina_pe_intuneric_03_Ce_ai_in_farfurie_67dab9fc.jpg',
  campaignGroup: '/assets/aistudio/Cina_pe_intuneric_04_Cu_cine_ai_veni_971c4ab9.jpg',
  campaignDetails: '/assets/aistudio/Cina_pe_intuneric_05_Detalii_eveniment_a97b5318.jpg',
  anrMark: '/assets/aistudio/lv_0_20260903095051_c179d87e.png',
  anrSeal: '/assets/aistudio/lv_0_20260903112545_a04c2d6a.jpg',
  // Imagine atmosferică de fundal pentru hero (fără text suprapus)
  heroBackdrop: '/src/assets/images/hero_cina_intuneric_1794975785060.jpg',
  soundAtmosphere: '/src/assets/images/experienta_sunet_intuneric_1794975784373.jpg',
} as const;

export interface SensoryPillar {
  id: string;
  index: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  imageAlt: string;
  isOfficialPoster?: boolean;
}

export const SENSORY_PILLARS: SensoryPillar[] = [
  {
    id: 'gustul',
    index: '01',
    title: 'Gustul',
    description:
      'Fără repere vizuale, fiecare aromă, textură și temperatură capătă o claritate neașteptată.',
    detail:
      'Descoperi felul principal și desertul prin parfum, consistență și ritm propriu, fără graba privirii.',
    image: EVENT_IMAGES.campaignPlate,
    imageAlt:
      'Material oficial Cină pe întuneric: Încerci să ghicești ce ai în farfurie – farfurie neagră aburindă în întuneric',
    isOfficialPoster: true,
  },
  {
    id: 'sunetele',
    index: '02',
    title: 'Sunetele',
    description:
      'Vocile din sală, clinchetul discret al paharelor și muzica acustică trasează conturul serii.',
    detail:
      'Auzul devine busola serii, într-o atmosferă calmă, acompaniată de momente muzicale dedicate.',
    image: EVENT_IMAGES.soundAtmosphere,
    imageAlt: 'Chitară acustică în penumbră, conturată de lumină rece și tonuri calde discrete',
    isOfficialPoster: false,
  },
  {
    id: 'conversatiile',
    index: '03',
    title: 'Conversațiile',
    description:
      'Fără ecrane și fără aparențe, atenția se mută firesc către persoana de lângă tine.',
    detail:
      'Ascultarea devine autentică, iar dialogul de la masă capătă profunzime și căldură umană.',
    image: EVENT_IMAGES.campaignCover,
    imageAlt:
      'Material oficial Cină pe întuneric: Ai recunoaște pe cineva doar după voce? – două siluete ciocnind pahare în întuneric',
    isOfficialPoster: true,
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'ce-este',
    question: 'Ce este Cina pe întuneric?',
    answer:
      'Este un eveniment caritabil organizat de Asociația Nevăzătorilor din România – Filiala Satu Mare, în care participanții iau cina în întuneric, bazându-se pe gust, auz și conversație. Această experiență temporară este un exercițiu de empatie și nu reproduce viața de zi cu zi a persoanelor nevăzătoare.',
  },
  {
    id: 'prieteni',
    question: 'Pot participa împreună cu prietenii?',
    answer:
      'Da. Puteți participa individual, în cuplu sau în grup, alături de prieteni, familie sau colegi. În modulul de rezervare selectați opțiunea „Grup” și numărul total de persoane, iar organizatorul vă va confirma așezarea în funcție de locurile disponibile (capacitatea totală a sălii este de 100 de locuri).',
  },
  {
    id: 'rezervare',
    question: 'Cum fac o rezervare?',
    answer:
      'Completați formularul simplu din partea de sus a paginii cu tipul de participare, numărul de persoane și numele dumneavoastră, apoi apăsați butonul „Trimite cererea pe WhatsApp”. Solicitarea este trimisă direct organizatorului, care va confirma disponibilitatea locurilor și pașii de plată. Trimiterea mesajului nu confirmă automat locul.',
  },
  {
    id: 'contributie',
    question: 'Ce include contribuția de 150 lei?',
    answer:
      'Contribuția de 150 lei / persoană include participarea la cina în întuneric și meniul comunicat: fel principal, desert și răcoritoare. Banii strânși merg către comunitatea persoanelor nevăzătoare din Satu Mare: acum, înainte de Crăciun, pentru pachete, și pentru alte nevoi ale asociației.',
  },
  {
    id: 'transfer-bancar',
    question: 'Pot plăti prin transfer bancar?',
    answer:
      'Da, contribuția poate fi achitată prin virament bancar în contul RO83RNCB0221043051950002 sau direct la sediul asociației (Str. Nicolae Golescu nr. 39, Satu Mare, luni–vineri, 08:00–16:00). Înainte de a efectua transferul, vă rugăm să confirmați pe WhatsApp disponibilitatea locurilor și titularul exact al contului.',
  },
  {
    id: 'locatie',
    question: 'Unde are loc evenimentul?',
    answer:
      'Evenimentul are loc pe 3 decembrie 2026, începând cu ora 18:00, la Restaurant Select din Satu Mare, România. Pentru detalii logistice sau accesibilitate la sosire, contactați organizatorul la 0745 275 920.',
  },
  {
    id: 'alergii',
    question: 'Pot anunța alergii sau preferințe alimentare?',
    answer:
      'Da. Informațiile despre alergeni și opțiuni alimentare se solicită și se stabilesc direct cu organizatorul. Puteți menționa aceste detalii în câmpul „Observații opționale” al formularului sau direct în conversația pe WhatsApp.',
  },
  {
    id: 'confirmare-plata',
    question: 'Cum confirm că plata mea a fost înregistrată?',
    answer:
      'Site-ul nu procesează plăți și nu încarcă documente. După confirmarea locurilor cu organizatorul și efectuarea plății (prin virament sau la sediul asociației), confirmarea înregistrării se face direct prin dialog cu organizatorul la telefon sau pe WhatsApp (0745 275 920).',
  },
];
