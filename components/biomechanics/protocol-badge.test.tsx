import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProtocolBadge } from "@/components/biomechanics/protocol-badge";

describe("ProtocolBadge", () => {
  it("muestra la etiqueta legible del protocolo", () => {
    render(<ProtocolBadge protocol="salto_vertical" />);
    expect(screen.getByText("Salto vertical")).toBeInTheDocument();
  });

  it("usa el código si el protocolo es desconocido", () => {
    render(<ProtocolBadge protocol="test_personalizado" />);
    expect(screen.getByText("test personalizado")).toBeInTheDocument();
  });
});
