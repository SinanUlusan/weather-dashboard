import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./Providers/ThemeProvider";
import { SWRProvider } from "./Providers/SWRProvider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Dashboard",
  description:
    "A comprehensive weather dashboard built with Next.js 14, TypeScript, and modern web technologies that provides real-time weather data for any city worldwide.",
  keywords: ["weather", "dashboard", "next.js", "typescript", "openweathermap"],
  authors: [{ name: "Weather Dashboard" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
