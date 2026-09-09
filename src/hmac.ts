const te = new TextEncoder();

export async function hmacHex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", te.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, te.encode(data));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function timingSafeEqualHex(a: string, b: string): Promise<boolean> {
  if (!a || !b) return false;
  const left = a.toLowerCase().trim();
  const right = b.toLowerCase().trim();
  if (left.length !== right.length) return false;
  const kb = await crypto.subtle.importKey("raw", te.encode("compare"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sa = await crypto.subtle.sign("HMAC", kb, te.encode(left));
  const sb = await crypto.subtle.sign("HMAC", kb, te.encode(right));
  const xa = new Uint8Array(sa);
  const xb = new Uint8Array(sb);
  let diff = 0;
  for (let i = 0; i < xa.length; i++) diff |= xa[i] ^ xb[i];
  return diff === 0;
}

export function importSecret(env: { IMPORT_HMAC?: string; STUDIO_IMPORT_HMAC?: string }): string {
  return env.IMPORT_HMAC || env.STUDIO_IMPORT_HMAC || "";
}

export async function verifyStudioSignature(
  env: { IMPORT_HMAC?: string; STUDIO_IMPORT_HMAC?: string },
  rawBody: string,
  headerValue: string | null
): Promise<{ ok: boolean; reason?: string }> {
  const secret = importSecret(env);
  if (!secret) return { ok: true, reason: "unsigned_dev" };
  if (!headerValue) return { ok: false, reason: "missing_signature" };
  const expected = await hmacHex(secret, rawBody);
  const match = await timingSafeEqualHex(expected, headerValue);
  return match ? { ok: true } : { ok: false, reason: "bad_signature" };
}
