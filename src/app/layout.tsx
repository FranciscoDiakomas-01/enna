import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enna",
  description: "Sistema de gestão de tarefas",
  openGraph: {
    countryName: "Angola",
    type: "website",
    siteName: "Enna",
    title: "Enna",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Painel Administrativo do Enna",
      },
    ],
    description: "Sistema de gestão de tarefas para um Enna",
    locale: "pt_BR",
  },
  authors: [
    {
      name: "Francisco Diakomas",
    },
  ],
  creator: "Francisco Diakomas",
  keywords: [
    "Sistema de gestão de tarefas",
    "Gestão de funcionários",
    "Gestão de Ticket",
    "Enna",
    "suporte",
    "admin",
    "gamificação",
    "tickets",
    "tarefas",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Painel Administrativo | Enna Gamificado",
    description:
      "Gerencie sua equipe de suporte com gamificação e produtividade.",
    creator: "@seutwitter",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
