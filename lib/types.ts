export type Rol = "admin" | "profesional" | "paciente";

export interface Usuario {
  id: string;
  email: string;
  nombre_completo: string;
  rol: Rol;
  activo: boolean;
  paciente_id: string | null;
  created_at: string;
}

export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string | null;
  dni_anonimizado: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Evaluacion {
  id: string;
  paciente_id: string;
  tipo_protocolo: string;
  fecha: string;
  dispositivo_origen: string;
  datos_raw: {
    schema_version?: string;
    metricas?: Record<string, number | string>;
    series?: Record<string, { unidad?: string; valores?: number[] }>;
    [key: string]: unknown;
  };
  created_at: string;
}

export interface ArchivoAdjunto {
  id: string;
  evaluacion_id: string;
  url_storage: string;
  tipo_archivo: string;
  hash_sha256: string;
  nombre_original: string | null;
  tamano_bytes: number | null;
  created_at: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface ResumenInvestigacion {
  generated_at: string;
  totales: {
    pacientes: number;
    evaluaciones: number;
    archivos: number;
    bytes_almacenados: number;
  };
  ultima_evaluacion: string | null;
  por_protocolo: Array<{ protocolo: string; total: number }>;
  por_dispositivo: Array<{ dispositivo: string; total: number }>;
}

export interface DatasetItem {
  evaluacion_id: string;
  paciente_seudonimo: string;
  tipo_protocolo: string;
  fecha: string;
  dispositivo_origen: string;
  datos_raw: Record<string, unknown>;
}
