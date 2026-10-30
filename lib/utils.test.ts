import { describe, expect, it } from "vitest";

import {
  ageFromBirthDate,
  formatBytes,
  formatDate,
  initials,
  protocolLabel,
} from "@/lib/utils";

describe("utils", () => {
  it("formatea bytes con unidades legibles", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(1024)).toBe("1.0 KB");
    expect(formatBytes(2_845_100)).toBe("2.7 MB");
    expect(formatBytes(null)).toBe("0 B");
  });

  it("genera iniciales de un nombre", () => {
    expect(initials("Ana María Gómez")).toBe("AM");
    expect(initials("Bruno")).toBe("B");
    expect(initials("")).toBe("");
  });

  it("traduce códigos de protocolo", () => {
    expect(protocolLabel("salto_vertical")).toBe("Salto vertical");
    expect(protocolLabel("protocolo_desconocido")).toBe("protocolo desconocido");
  });

  it("calcula la edad a partir de la fecha de nacimiento", () => {
    const age = ageFromBirthDate("1990-01-01");
    expect(age).not.toBeNull();
    expect(age).toBeGreaterThan(30);
    expect(ageFromBirthDate(null)).toBeNull();
  });

  it("formatea fechas inválidas sin romper", () => {
    expect(formatDate("fecha-invalida")).toBe("—");
    expect(formatDate("2026-10-30T12:00:00Z")).toContain("2026");
  });
});
