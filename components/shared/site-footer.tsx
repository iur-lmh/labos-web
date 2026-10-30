import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import { Logo } from "@/components/shared/logo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-clinical-950 text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm space-y-5">
          <Logo inverted />
          <p className="text-sm leading-6 text-white/60">
            Infraestructura abierta para la gestión biomecánica y la investigación del
            Laboratorio de Movimiento Humano del IUR — UCASAL.
          </p>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Plataforma en desarrollo · Fase 0
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Plataforma
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              <Link href="/publicaciones" className="hover:text-white">
                Hub de investigación
              </Link>
            </li>
            <li>
              <Link href="/equipo" className="hover:text-white">
                Equipo y líneas
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                Acceso profesionales
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                Portal de pacientes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Contacto
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" />
              Salta, Argentina
              <br />
              Instituto Universitario de Rehabilitación
            </li>
            <li>
              <a
                href="mailto:laboratoriodemovimientoucasal@ucasal.edu.ar"
                className="flex items-center gap-2.5 hover:text-white"
              >
                <Mail className="size-4 text-white/40" />
                laboratoriodemovimiento...
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} IUR · Laboratorio de Movimiento Humano. Código
            bajo licencia MIT.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">
            Open source · Datos con privacidad
          </p>
        </div>
      </div>
    </footer>
  );
}
