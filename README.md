# LabOS Web — portal clínico y hub de investigación

Frontend del Laboratorio de Movimiento Humano (IUR — UCASAL). Next.js App Router,
TypeScript, Tailwind CSS, componentes shadcn/ui y gráficos Recharts.

- **Hub público**: `/`
- **Publicaciones**: `/publicaciones`
- **Equipo**: `/equipo`
- **Login**: `/login`
- **Mesa de profesionales**: `/profesionales`
- **Pacientes**: `/profesionales/pacientes`
- **Mesa de I+D**: `/profesionales/investigacion`
- **Portal de pacientes**: `/pacientes`

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

La app queda en `http://localhost:3000`. Para datos reales, levantá la API:

```bash
# desde la raíz del monorepo
docker compose up --build
```

Sin API o sin sesión, las vistas internas muestran **datos sintéticos** y un aviso de
demostración; el diseño no se rompe.

## Autenticación

1. El formulario de login envía las credenciales al Route Handler
   `/api/auth/login`.
2. El handler llama a `labos-core` (OAuth2 password flow) y guarda el JWT en una cookie
   **httpOnly** (`labos_token`), `SameSite=Lax`, `Secure` en producción.
3. El navegador nunca lee el token. Las llamadas a la API pasan por el proxy
   `/api/labos/*`, que adjunta el `Authorization: Bearer`.
4. `middleware.ts` protege `/profesionales` y `/pacientes`; la validación criptográfica
   la hace la API en cada request.

Variables clave: `NEXT_PUBLIC_API_URL`, `LABOS_API_INTERNAL_URL`. En Docker, la URL
interna es `http://api:8000`.

## Estructura

```text
app/
├── (public)/            # landing, publicaciones, equipo
├── (auth)/login/        # login split-screen
├── (dashboard)/         # profesionales, pacientes
├── api/auth/            # login/logout con cookie httpOnly
├── api/labos/[...path]/ # proxy autenticado
├── layout.tsx
└── globals.css
components/
├── ui/                  # shadcn/ui (button, card, table, input…)
├── shared/              # header, footer, shell, métricas, formularios
└── biomechanics/        # curvas fuerza-tiempo, badges, distribución
lib/
├── api-client.ts        # fetch SSR + cliente del proxy
├── types.ts             # contratos de la API
├── demo-data.ts         # datos sintéticos (no reales)
└── utils.ts
```

> Next.js no admite dos rutas que resuelvan a `/`. El landing vive en
> `app/(public)/page.tsx`; no debe agregarse `app/page.tsx`.

## Scripts

| Comando                | Descripción                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Servidor de desarrollo           |
| `npm run build`        | Build de producción (standalone) |
| `npm run start`        | Servir el build                  |
| `npm run lint`         | ESLint (Next)                    |
| `npm run format`       | Prettier + plugin Tailwind       |
| `npm run format:check` | Verificación de formato          |
| `npm run typecheck`    | `tsc --noEmit`                   |
| `npm run test`         | Vitest + Testing Library         |

## Datos y privacidad

- Los datos de `lib/demo-data.ts` son **sintéticos**.
- No se almacenan datos clínicos en el frontend.
- Las descargas de datasets usan el proxy autenticado y la API entrega información
  seudonimizada.
- Nunca agregar tokens a `localStorage` ni a URLs.

## Docker

```bash
docker build -t labos-web .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  -e LABOS_API_INTERNAL_URL=http://host.docker.internal:8000 \
  labos-web
```

En el compose raíz, el perfil `web` construye la imagen y usa `http://api:8000` como URL
interna.

## Licencia

MIT.
