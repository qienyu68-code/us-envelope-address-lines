/** Plain-text formatting only. This module does not validate mailing addresses. */
export type UsAddressBase = Readonly<{
  recipient?: string;
  city: string;
  /** Supply the intended two-letter state code; it is not inferred or checked. */
  state: string;
  /** A string preserves leading zeros and ZIP+4 punctuation. */
  zip: string;
}>;

export type UsStreetAddress = UsAddressBase & Readonly<{
  kind: 'street';
  /** Supply the street without the optional unit, which has its own field. */
  street: string;
  /** Include the unit designator, for example "APT 4-B" or "STE 12". */
  unit?: string;
}>;

export type UsPoBoxAddress = UsAddressBase & Readonly<{
  kind: 'po-box';
  /** Supply only the box number, without a "PO BOX" prefix. */
  boxNumber: string;
}>;

export type UsEnvelopeAddress = UsStreetAddress | UsPoBoxAddress;

export type FormatOptions = Readonly<{
  uppercase?: boolean;
  unitPlacement?: 'delivery-line' | 'above-delivery-line';
}>;

function clean(value: string): string {
  // Treat whitespace within a field as spaces, including Unicode NEL.
  return value.replace(/[\s\u0085]+/gu, ' ').trim();
}

/**
 * Return address lines without modifying the input, performing I/O, or storing it.
 * Empty fields are omitted; their omission is not proof of a complete address.
 * Render the result as text, such as with textContent, rather than as HTML.
 */
export function formatUsEnvelopeLines(
  address: UsEnvelopeAddress,
  options: FormatOptions = {},
): string[] {
  if (typeof address.zip !== 'string') {
    throw new TypeError('ZIP must be a string so leading zeros can be preserved.');
  }

  const lines: string[] = [];
  const recipient = clean(address.recipient ?? '');
  if (recipient) lines.push(recipient);

  if (address.kind === 'po-box') {
    const number = clean(address.boxNumber);
    if (number) lines.push(`PO BOX ${number}`);
  } else {
    const street = clean(address.street);
    const unit = clean(address.unit ?? '');
    if (unit && options.unitPlacement === 'above-delivery-line') {
      lines.push(unit);
      if (street) lines.push(street);
    } else {
      const delivery = [street, unit].filter(Boolean).join(' ');
      if (delivery) lines.push(delivery);
    }
  }

  const lastLine = [address.city, address.state, address.zip]
    .map(clean)
    .filter(Boolean)
    .join(' ');
  if (lastLine) lines.push(lastLine);

  return options.uppercase === false
    ? lines
    : lines.map((line) => line.toUpperCase());
}
