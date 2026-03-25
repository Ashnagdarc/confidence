import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import {
  JetBrains_Mono,
  Karla,
  Montserrat,
} from "next/font/google";

import { SiteFooter } from "@/components/site-footer";

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

export const metadata: Metadata = {
  title: "Confidence Molade",
  description:
    "Official website for Confidence Molade, Co-CEO of Eden Oasis Realty, speaker, podcaster, and leader.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const fontVariables = {
    "--display": montserrat.style.fontFamily,
    "--sans": karla.style.fontFamily,
    "--mono": jetbrainsMono.style.fontFamily,
  } as CSSProperties;

  return (
    <html lang="en">
      <body className={karla.className} style={fontVariables}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
