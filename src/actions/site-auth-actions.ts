"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE_NAME, computeAccessToken, isCorrectPassword } from "@/lib/site-auth";

export type LoginState = {
  error?: string;
};

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/");

  if (!isCorrectPassword(password)) {
    return { error: "Senha incorreta." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE_NAME, computeAccessToken(password), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(redirectTo.startsWith("/") ? redirectTo : "/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE_NAME);
  redirect("/login");
}
