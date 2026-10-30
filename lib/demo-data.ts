import type {
  ArchivoAdjunto,
  Evaluacion,
  Paciente,
  ResumenInvestigacion,
} from "@/lib/types";

/**
 * Datos sintéticos para la primera ejecución sin API.
 * No corresponden a personas reales. Reemplazar por datos de la API en producción.
 */

export const demoPacientes: Paciente[] = [
  {
    id: "demo-pac-001",
    nombre: "Ana",
    apellido: "Gómez",
    fecha_nacimiento: "1994-03-12",
    dni_anonimizado: "lmh-7f3a92c1",
    metadata: { deporte: "running", categoria: "amateur", consentimiento: "vigente" },
    created_at: "2026-08-14T10:00:00Z",
    updated_at: "2026-10-21T14:30:00Z",
  },
  {
    id: "demo-pac-002",
    nombre: "Bruno",
    apellido: "Ledesma",
    fecha_nacimiento: "1988-11-02",
    dni_anonimizado: "lmh-2b81de44",
    metadata: { deporte: "fútbol", categoria: "competitivo", consentimiento: "vigente" },
    created_at: "2026-07-02T09:15:00Z",
    updated_at: "2026-10-18T11:10:00Z",
  },
  {
    id: "demo-pac-003",
    nombre: "Carla",
    apellido: "Ruiz",
    fecha_nacimiento: "2001-06-25",
    dni_anonimizado: "lmh-91ac0f77",
    metadata: {
      deporte: "vóley",
      categoria: "universitario",
      consentimiento: "pendiente",
    },
    created_at: "2026-09-19T15:40:00Z",
    updated_at: "2026-10-12T16:20:00Z",
  },
  {
    id: "demo-pac-004",
    nombre: "Diego",
    apellido: "Paz",
    fecha_nacimiento: "1976-01-30",
    dni_anonimizado: "lmh-5e0c118a",
    metadata: { motivo: "rehabilitación de rodilla", consentimiento: "vigente" },
    created_at: "2026-06-11T08:30:00Z",
    updated_at: "2026-10-03T10:05:00Z",
  },
];

export const demoEvaluaciones: Evaluacion[] = [
  {
    id: "demo-eval-001",
    paciente_id: "demo-pac-001",
    tipo_protocolo: "salto_vertical",
    fecha: "2026-10-24T14:30:00Z",
    dispositivo_origen: "Biobit",
    datos_raw: {
      schema_version: "1.0",
      metricas: {
        altura_salto_cm: 34.2,
        tiempo_vuelo_ms: 512,
        pico_fuerza_n: 1820,
        asimetria_pct: 4.1,
      },
    },
    created_at: "2026-10-24T14:35:00Z",
  },
  {
    id: "demo-eval-002",
    paciente_id: "demo-pac-002",
    tipo_protocolo: "marcha",
    fecha: "2026-10-21T09:10:00Z",
    dispositivo_origen: "mDurance",
    datos_raw: {
      schema_version: "1.0",
      metricas: { cadencia_pasos_min: 112, longitud_paso_m: 1.28, velocidad_m_s: 1.41 },
    },
    created_at: "2026-10-21T09:20:00Z",
  },
  {
    id: "demo-eval-003",
    paciente_id: "demo-pac-003",
    tipo_protocolo: "fuerza",
    fecha: "2026-10-18T16:00:00Z",
    dispositivo_origen: "Biobit",
    datos_raw: {
      schema_version: "1.0",
      metricas: { pico_fuerza_n: 1240, tiempo_hasta_pico_ms: 380, rfd_n_s: 3260 },
    },
    created_at: "2026-10-18T16:10:00Z",
  },
  {
    id: "demo-eval-004",
    paciente_id: "demo-pac-001",
    tipo_protocolo: "emg",
    fecha: "2026-10-12T11:45:00Z",
    dispositivo_origen: "mDurance",
    datos_raw: {
      schema_version: "1.0",
      metricas: { rms_vastolateral_mv: 0.42, rms_vastomedial_mv: 0.38 },
    },
    created_at: "2026-10-12T11:50:00Z",
  },
  {
    id: "demo-eval-005",
    paciente_id: "demo-pac-004",
    tipo_protocolo: "movilidad",
    fecha: "2026-10-03T08:30:00Z",
    dispositivo_origen: "Manual",
    datos_raw: {
      schema_version: "1.0",
      metricas: { flexion_rodilla_deg: 128, extension_rodilla_deg: -4 },
    },
    created_at: "2026-10-03T08:40:00Z",
  },
];

export const demoArchivos: ArchivoAdjunto[] = [
  {
    id: "demo-file-001",
    evaluacion_id: "demo-eval-001",
    url_storage: "s3://labos-archivos/evaluaciones/demo/salto.c3d",
    tipo_archivo: "c3d",
    hash_sha256: "9f2c1d4e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    nombre_original: "salto_cmj_001.c3d",
    tamano_bytes: 2_845_100,
    created_at: "2026-10-24T14:36:00Z",
  },
  {
    id: "demo-file-002",
    evaluacion_id: "demo-eval-001",
    url_storage: "s3://labos-archivos/evaluaciones/demo/informe.pdf",
    tipo_archivo: "pdf",
    hash_sha256: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    nombre_original: "informe_salto.pdf",
    tamano_bytes: 684_200,
    created_at: "2026-10-24T14:40:00Z",
  },
];

export const demoResumen: ResumenInvestigacion = {
  generated_at: "2026-10-30T12:00:00Z",
  totales: {
    pacientes: 48,
    evaluaciones: 213,
    archivos: 176,
    bytes_almacenados: 3_420_000_000,
  },
  ultima_evaluacion: "2026-10-24T14:30:00Z",
  por_protocolo: [
    { protocolo: "salto_vertical", total: 84 },
    { protocolo: "marcha", total: 52 },
    { protocolo: "fuerza", total: 38 },
    { protocolo: "emg", total: 24 },
    { protocolo: "movilidad", total: 15 },
  ],
  por_dispositivo: [
    { dispositivo: "Biobit", total: 121 },
    { dispositivo: "mDurance", total: 64 },
    { dispositivo: "Manual", total: 18 },
    { dispositivo: "C3D", total: 10 },
  ],
};

/** Curva fuerza-tiempo sintética con forma de salto con contramovimiento. */
export function buildForceCurve(): Array<{ t: number; fuerza: number }> {
  return Array.from({ length: 90 }, (_, index) => {
    const t = index * 5;
    const faseInicial = 300 * Math.exp(-((t - 60) ** 2) / 900);
    const descarga = -420 * Math.exp(-((t - 165) ** 2) / 600);
    const impulso = 1050 * Math.exp(-((t - 245) ** 2) / 1400);
    const aterrizaje = 380 * Math.exp(-((t - 355) ** 2) / 700);
    const base = 620;
    return {
      t,
      fuerza: Math.max(
        0,
        Math.round(base + faseInicial + descarga + impulso + aterrizaje),
      ),
    };
  });
}

export const forceCurveDemo = buildForceCurve();

export const demoPublicaciones = [
  {
    tipo: "Pre-print",
    estado: "En revisión",
    titulo: "Asimetrías de fuerza en salto vertical en deportistas universitarios",
    resumen:
      "Análisis exploratorio de 84 sesiones de salto con plataforma de fuerza y su relación con carga de entrenamiento.",
    autores: "Equipo LMH · Línea de rendimiento",
    year: 2026,
  },
  {
    tipo: "Artículo",
    estado: "Borrador",
    titulo: "Protocolo de captura y curaduría de datos biomecánicos multicéntrico",
    resumen:
      "Propuesta de un modelo de datos común para integrar exportaciones de Biobit, mDurance y C3D en un data lake clínico.",
    autores: "Equipo LMH · Línea de ingeniería de datos",
    year: 2026,
  },
  {
    tipo: "Dataset",
    estado: "Preparación",
    titulo: "Dataset seudonimizado de marcha y equilibrio en rehabilitación",
    resumen:
      "Conjunto de series temporales y métricas derivadas, con diccionario de datos y manifiesto de reproducibilidad.",
    autores: "Equipo LMH · Línea de rehabilitación",
    year: 2026,
  },
  {
    tipo: "Comunicación",
    estado: "Presentado",
    titulo: "Del papel al dato: transformación digital de un laboratorio universitario",
    resumen:
      "Experiencia de diseño e implementación de una plataforma abierta de bajo costo para investigación biomecánica.",
    autores: "Equipo LMH",
    year: 2025,
  },
];

export const demoEquipo = [
  {
    rol: "Dirección científica",
    area: "Rehabilitación y movimiento humano",
    descripcion:
      "Define las prioridades clínicas, los protocolos de medición y la articulación con el IUR y UCASAL.",
    icono: "stethoscope",
  },
  {
    rol: "Coordinación de laboratorio",
    area: "Operaciones y calidad de datos",
    descripcion:
      "Supervisa la captura, la trazabilidad de equipos y la capacitación del equipo de evaluación.",
    icono: "clipboard",
  },
  {
    rol: "Ingeniería de datos",
    area: "Pipelines y plataforma",
    descripcion:
      "Mantiene la API, los pipelines de parsing, la infraestructura y las exportaciones de investigación.",
    icono: "database",
  },
  {
    rol: "Investigación clínica",
    area: "Diseño de estudios y publicaciones",
    descripcion:
      "Diseña los análisis, resguarda la ética de la investigación y coordina las publicaciones del laboratorio.",
    icono: "microscope",
  },
];
