import type { Metadata } from "next";
import { Oxanium, Sora } from "next/font/google";
import "./globals.css";

const display = Oxanium({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.muamaizingbot.com"),
  title: {
    default: "MUAmaizingBot — Bot para MU Immortal",
    template: "%s · MUAmaizingBot",
  },
  description:
    "Bot de visión para MU Immortal en emulador: farm, farm bosses, elf buff giver y war. Mira qué hace hoy, pantalla por pantalla.",
  openGraph: {
    title: "MUAmaizingBot",
    description:
      "Automatización visual para MU Immortal. Explora los modos del bot con capturas reales.",
    url: "https://www.muamaizingbot.com",
    siteName: "MUAmaizingBot",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
