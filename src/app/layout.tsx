import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lite Flow CRM",
  description: "O CRM perfeito para vender mais e melhor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="antialiased">
      <body className={`${inter.className} min-h-screen bg-white text-slate-900 overflow-x-hidden flex flex-col`}>
        {children}
      </body>
    </html>
  );
}