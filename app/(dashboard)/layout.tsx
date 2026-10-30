import type { Metadata } from "next";

import { DashboardShell } from "@/components/shared/dashboard-shell";

export const metadata: Metadata = {
  title: {
    default: "Mesa de trabajo",
    template: "%s · LabOS LMH",
  },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
