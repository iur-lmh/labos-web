import { NextResponse, type NextRequest } from "next/server";

const API_URL =
  process.env.LABOS_API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

const SESSION_COOKIE = "labos_token";
const FORWARDED_METHODS = ["GET", "POST", "PATCH", "PUT", "DELETE"] as const;

interface RouteContext {
  params: Promise<{ path: string[] }>;
}

async function proxy(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ detail: "Sesión no iniciada" }, { status: 401 });
  }
  if (!FORWARDED_METHODS.includes(request.method as (typeof FORWARDED_METHODS)[number])) {
    return NextResponse.json({ detail: "Método no permitido" }, { status: 405 });
  }

  const target = new URL(`${API_URL}/api/v1/${path.join("/")}`);
  target.search = request.nextUrl.search;

  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);
  const accept = request.headers.get("accept");
  if (accept) headers.set("Accept", accept);

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
  };
  if (request.method !== "GET" && request.method !== "DELETE") {
    init.body = await request.text();
  }

  try {
    const response = await fetch(target, init);
    const responseHeaders = new Headers();
    const responseType = response.headers.get("content-type");
    if (responseType) responseHeaders.set("Content-Type", responseType);
    const disposition = response.headers.get("content-disposition");
    if (disposition) responseHeaders.set("Content-Disposition", disposition);

    const body = response.status === 204 ? null : await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json({ detail: "La API no está disponible" }, { status: 502 });
  }
}

export { proxy as GET, proxy as POST, proxy as PATCH, proxy as PUT, proxy as DELETE };
