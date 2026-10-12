# US envelope address lines

A small, standalone TypeScript function that turns structured US-style address fields into plain-text lines. It supports street addresses, an optional apartment/unit line, and PO Box numbers. It preserves ZIP strings such as `00501` and `02108-1234`.

This is an independent educational demo of typed inputs and predictable text output. It contains only this utility and fictional examples, rather than the source of the Envelope Address Guide website.

The function runs locally, performs no network requests, and does not save inputs. It is intended for US-style envelopes. It does not verify address existence, city–ZIP matches, state codes, or deliverability, and it does not generate PDFs, print envelopes, calculate postage, or support international addressing rules.

## Run the fictional examples

Use Node.js 22.6 or newer. No package installation is needed to run the examples:

```sh
npm run demo
```

Node 22 may display its normal experimental type-stripping warning. For optional TypeScript checking, install the development dependency and run:

```sh
npm install
npm run check
```

## Use the function

```ts
import { formatUsEnvelopeLines } from './src/us-envelope-lines.ts';

const lines = formatUsEnvelopeLines({
  recipient: 'Avery Example',
  kind: 'street',
  street: '123 Example Lane',
  unit: 'APT 4-B',
  city: 'Sample City',
  state: 'NY',
  zip: '00501',
});

console.log(lines.join('\n'));
```

Output:

```text
AVERY EXAMPLE
123 EXAMPLE LANE APT 4-B
SAMPLE CITY NY 00501
```

Every address in this repository is fictional and unverified. Do not use the examples for real delivery.

For a PO Box, use `kind: 'po-box'` and `boxNumber: '789'` instead of `street` and `unit`. Supply the box number without a `PO BOX` prefix. Supply a unit separately from the street to avoid repeating it. The function does not infer street abbreviations or fix missing fields.

The default output is uppercase. Pass `{ uppercase: false }` to preserve letter case, or `{ unitPlacement: 'above-delivery-line' }` to put the supplied unit above the street. Whitespace within each field becomes single spaces. Render these returned strings as text (`textContent`), not as HTML.

## Website demo

[Envelope Address Guide](https://envelopeaddress.com/) has US envelope examples and a browser-local preview/copy tool. This repository contains only the standalone formatting utility and fictional examples.

## License

No reuse license has been selected yet (`UNLICENSED`). The maintainer should choose and add a license before presenting this repository as open source or granting reuse rights. Making a repository public alone does not grant those rights. No repository ownership or named copyright holder is claimed here.
