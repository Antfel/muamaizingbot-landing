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
    default: "MUAmaizingBot — Bot para MU en Android",
    template: "%s · MUAmaizingBot",
  },
  description:
    "Bot para MU en Android y BlueStacks: farmea, caza bosses, reparte buffs de elfa y se recupera solo. Sin root. Descarga la última versión.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "MUAmaizingBot",
    description:
      "Tu personaje sigue avanzando, aunque no estés jugando. Farm, bosses y buffs automáticos para MU.",
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
