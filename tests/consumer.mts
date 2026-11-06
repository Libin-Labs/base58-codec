import { encode, decode } from '@lp-labs/base58-codec';
const bytes = new Uint8Array([104, 101, 108, 108, 111]);
if (decode(encode(bytes))[0] !== bytes[0]) throw new Error('Codec');
// @ts-expect-error invalid argument must be rejected by declarations
encode([1]);
