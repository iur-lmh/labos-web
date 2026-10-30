export const API_URL =
  process.env.LABOS_API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

export const SESSION_COOKIE = "labos_token";

/** Fetch del navegador contra el proxy autenticado de Next. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/labos${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as {
      detail?: string;
    } | null;
    throw new Error(data?.detail ?? "No se pudo completar la operación");
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
