import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salud Cerca",
  description: "Servicios de Salud - Gobierno Electrónico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Font Awesome requerido por Poncho */}
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" 
          rel="stylesheet" 
        />
        {/* Poncho oficial */}
        <link 
          href="https://argob.github.io/poncho/dist/css/icono-arg.css" 
          rel="stylesheet" 
        />
        
        {/* API SERIES DE TIEMPO */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.2/dist/css/components.css" 
          type="text/css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}