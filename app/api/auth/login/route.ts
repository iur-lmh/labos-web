import { NextResponse, type NextRequest } from "next/server";

const API_URL =
  process.env.LABOS_API_INTERNAL_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

interface LoginBody {
  email?: string;
  password?: string;
}

export async function POST(request: NextRequest) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ detail: "Cuerpo inválido" }, { status: 400 });
  }

  const email = body.email?.trim();
  const password = body.password;
  if (!email || !password) {
    return NextResponse.json({ detail: "Ingresá email y contraseña" }, { status: 400 });
  }

  try {
    const apiResponse = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: email, password }),
      cache: "no-store",
    });

    if (!apiResponse.ok) {
      const data = (await apiResponse.json().catch(() => null)) as {
        detail?: string;
      } | null;
      return NextResponse.json(
        { detail: data?.detail ?? "Credenciales inválidas" },
        { status: apiResponse.status },
      );
    }

    const data = (await apiResponse.json()) as {
      access_token: string;
      expires_in: number;
    };

    const response = NextResponse.json({ ok: true });
    const secure =
      request.nextUrl.protocol === "https:" ||
      request.headers.get("x-forwarded-proto") === "https";
    response.cookies.set({
      name: "labos_token",
      value: data.access_token,
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in,
    });
    return response;
  } catch {
    return NextResponse.json(
      { detail: "La API no está disponible. Intentá nuevamente." },
      { status: 502 },
    );
  }
}
