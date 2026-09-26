const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Odd and not a multiple of 31, so it is coprime with 62^n: multiplying by it permutes the keyspace.
// Sequential IDs therefore map to scattered, collision-free codes.
const SCATTER = 1_580_030_173n;

export function base62(value: bigint, length: number) {
  let out = "";
  while (value > 0n) {
    out = ALPHABET[Number(value % 62n)] + out;
    value /= 62n;
  }
  return out.padStart(length, "0");
}

export function scatter(id: number, length: number) {
  return (BigInt(id) * SCATTER) % 62n ** BigInt(length);
}

export function encode(id: number, length: number) {
  return base62(scatter(id, length), length);
}

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const SITE_CODE_LENGTH = 4;
const FIRST_ID = 100_000;

const entries = [
  { alias: "work", target: "/#work", title: "Selected systems" },
  { alias: "design", target: "/#design", title: "System design study" },
  { alias: "ideas", target: "/#ideas", title: "Ideas & collaborations" },
  { alias: "path", target: "/#path", title: "Career path" },
  { alias: "hello", target: "/#contact", title: "Contact" },
];

export const links = entries.map((entry, index) => ({
  ...entry,
  id: FIRST_ID + index,
  code: encode(FIRST_ID + index, SITE_CODE_LENGTH),
}));

export function findLink(key: string) {
  return links.find((link) => link.code === key || link.alias === key);
}
