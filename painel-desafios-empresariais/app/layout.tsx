import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Painel de Desafios Empresariais",
  description: "Painel compartilhado para escolha de desafios do Técnico em Administração.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
