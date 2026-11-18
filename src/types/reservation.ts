export type ParticipationType = 'individual_couple' | 'group';

export interface ReservationDraft {
  participationType: ParticipationType;
  guestCount: number;
  fullName: string;
  notes: string;
}

/**
 * Arhitectură pregătită pentru un viitor panou privat al organizatorului
 * (va fi conectat ulterior la un backend securizat cu autentificare și bază de date).
 * NOTĂ: Nu se generează și nu se afișează date demonstrative sau locuri rămase fictive în interfața publică.
 */
export type OrganizerReservationStatus =
  | 'new'
  | 'pending_confirmation'
  | 'confirmed'
  | 'cancelled';

export type PaymentMethodType = 'bank_transfer' | 'association_office';

export type PaymentVerificationStatus = 'unpaid' | 'pending_verification' | 'confirmed';

export interface OrganizerReservationRecord {
  id: string;
  createdAtIso: string;
  participationType: ParticipationType;
  guestCount: number;
  contactName: string;
  phoneNumber: string;
  notes?: string;
  estimatedAmountRon: number;
  status: OrganizerReservationStatus;
  paymentMethod?: PaymentMethodType;
  paymentStatus: PaymentVerificationStatus;
  verifiedByOrganizerId?: string;
}

export interface OrganizerCapacitySnapshot {
  totalCapacity: number;
  confirmedSeats: number;
  pendingSeats: number;
  availableSeats: number;
  lastUpdatedIso: string;
}

export function buildReservationMessage(
  draft: ReservationDraft,
  pricePerPerson: number,
  eventDateShort: string,
  eventTime: string
): string {
  const total = draft.guestCount * pricePerPerson;
  const typeLabel =
    draft.participationType === 'group' ? 'Grup' : 'Individuală / Cuplu';
  const cleanName = draft.fullName.trim();
  const cleanNotes = draft.notes.trim() || 'Fără observații';

  return [
    `Bună ziua! Doresc să solicit o rezervare la Cina pe întuneric din ${eventDateShort}, ora ${eventTime}.`,
    `Tip rezervare: ${typeLabel}`,
    `Nume: ${cleanName}`,
    `Persoane: ${draft.guestCount}`,
    `Total estimat: ${total} lei`,
    `Observații: ${cleanNotes}`,
    'Vă rog să-mi confirmați disponibilitatea locurilor și modalitatea de plată. Mulțumesc!',
  ].join('\n');
}

export function buildWhatsAppUrl(phoneE164NoPlus: string, message: string): string {
  return `https://wa.me/${phoneE164NoPlus}?text=${encodeURIComponent(message)}`;
}
