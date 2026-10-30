import { cookies } from "next/headers";

import { API_URL } from "@/lib/api-client";

export const SESSION_COOKIE = "labos_token";

/**
 * Fetch del lado servidor con el JWT de la cookie httpOnly.
 * Devuelve `null` si no hay sesión, la API no responde o el recurso falla:
 * las páginas muestran datos de demostración en lugar de romperse.
 */
export async function serverApiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/api/v1${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
