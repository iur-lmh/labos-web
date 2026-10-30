import type { Evaluacion } from "@/lib/types";

/**
 * Convierte series normalizadas (`tiempo_s` / `fuerza_n`) en puntos para el gráfico.
 * Devuelve `undefined` si la evaluación no trae una serie cruda utilizable.
 */
export function curveFromEvaluation(
  evaluation: Evaluacion | undefined,
): Array<{ t: number; fuerza: number }> | undefined {
  const series = evaluation?.datos_raw.series;
  const time = series?.tiempo_s?.valores;
  const force = series?.fuerza_n?.valores;
  if (!Array.isArray(time) || !Array.isArray(force)) return undefined;
  const length = Math.min(time.length, force.length);
  if (length < 2) return undefined;
  return Array.from({ length }, (_, index) => ({
    t: Math.round((time[index] ?? 0) * 1000),
    fuerza: force[index] ?? 0,
  }));
}
