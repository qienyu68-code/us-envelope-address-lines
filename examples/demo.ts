import {
  formatUsEnvelopeLines,
  type UsEnvelopeAddress,
} from '../src/us-envelope-lines.ts';

// Fictional, unverified examples only. Never use these for real delivery.
const street: UsEnvelopeAddress = {
  recipient: 'Avery Example',
  kind: 'street',
  street: '123 Example Lane',
  city: 'Sample City',
  state: 'NY',
  zip: '00501',
};

const apartment: UsEnvelopeAddress = {
  recipient: 'Taylor Example',
  kind: 'street',
  street: '456 Demo Street',
  unit: 'APT 4-B',
  city: 'Example City',
  state: 'MA',
  zip: '02108-1234',
};

const poBox: UsEnvelopeAddress = {
  recipient: 'Morgan Example',
  kind: 'po-box',
  boxNumber: '789',
  city: 'Demo City',
  state: 'CA',
  zip: '90001',
};

console.log('Fictional, unverified US-style examples; not for real delivery.');
for (const [label, address] of [
  ['Street', street],
  ['Apartment', apartment],
  ['PO Box', poBox],
] as const) {
  console.log(`\n${label}\n${formatUsEnvelopeLines(address).join('\n')}`);
}

console.log('\nApartment unit on a separate line');
console.log(formatUsEnvelopeLines(apartment, {
  unitPlacement: 'above-delivery-line',
  uppercase: false,
}).join('\n'));
