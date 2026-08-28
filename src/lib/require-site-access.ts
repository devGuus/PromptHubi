import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE_NAME, isAccessGateEnabled, isValidAccessToken } from "@/lib/site-auth";

/**
 * Defense-in-depth check for Server Actions. Next.js docs warn that a proxy
 * matcher exclusion also skips Server Function calls on that path, so the
 * access gate must not rely on proxy.ts alone - each mutating action re-checks.
 */
export async function requireSiteAccess() {
  if (!isAccessGateEnabled()) return;

  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_COOKIE_NAME)?.value;

  if (!isValidAccessToken(token)) {
    redirect("/login");
  }
}
