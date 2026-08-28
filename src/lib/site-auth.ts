import { createHmac, timingSafeEqual } from "crypto";

export const ACCESS_COOKIE_NAME = "prompthubi_access";
const TOKEN_PAYLOAD = "authenticated";

function getSitePassword(): string | undefined {
  return process.env.SITE_PASSWORD;
}

/** The access gate only applies when SITE_PASSWORD is configured (e.g. off during local dev unless set). */
export function isAccessGateEnabled(): boolean {
  return Boolean(getSitePassword());
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isCorrectPassword(candidate: string): boolean {
  const password = getSitePassword();
  if (!password) return false;
  return safeEqual(candidate, password);
}

export function computeAccessToken(password: string): string {
  return createHmac("sha256", password).update(TOKEN_PAYLOAD).digest("hex");
}

export function isValidAccessToken(token: string | undefined | null): boolean {
  const password = getSitePassword();
  if (!password || !token) return false;
  return safeEqual(token, computeAccessToken(password));
}
