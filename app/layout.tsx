import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import {
  Instrument_Sans,
  Inter,
  JetBrains_Mono,
  Karla,
  Montserrat,
} from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Confidence Achodo Molade",
  description:
    "Official website concept for Confidence Achodo Molade, Co-CEO of Eden Oasis Realty, speaker, podcaster, and leader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const fontVariables = {
    "--font-display": montserrat.style.fontFamily,
    "--font-body": karla.style.fontFamily,
    "--font-mono": jetbrainsMono.style.fontFamily,
    "--font-hero": instrumentSans.style.fontFamily,
    "--font-hero-ui": inter.style.fontFamily,
  } as CSSProperties;

  return (
    <html lang="en">
      <body className={karla.className} style={fontVariables}>
        {children}
      </body>
    </html>
  );
}
