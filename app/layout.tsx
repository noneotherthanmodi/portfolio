import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/inter-tight/wght.css";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Udit Narayan Modi — GenAI & Backend Engineer",
  description:
    "GenAI and backend engineer in Bengaluru, available for freelance. I turn language models into production systems — agentic workflows, Django and FastAPI backends, cloud delivery on Azure and GCP, and end-to-end products built with Claude Code and Codex.",
  applicationName: "Udit Narayan Modi",
  authors: [{ name: "Udit Narayan Modi" }],
  openGraph: {
    title: "Udit Narayan Modi — the quiet machinery behind AI",
    description: "Agentic systems. Backend platforms. Production ownership.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3ede3",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
