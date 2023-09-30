import { NextAuthProvider } from "@/providers/auth";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "./components/Header";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotefy | O seu portal para viagens inesquecíveis!",
  description:
    "Hotefy oferece uma experiência de reserva de hotel excepcional, onde o conforto e a conveniência se encontram. Descubra uma ampla variedade de acomodações cuidadosamente selecionadas para tornar as suas viagens inesquecíveis. Reserve seu refúgio pessoal conosco e desfrute do conforto, da hospitalidade e da qualidade que você merece. Planeje suas próximas aventuras com confiança e deixe a Hotefy cuidar dos detalhes da sua hospedagem. Sua jornada começa aqui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-200 dark:from-neutral-800 dark:to-neutral-600 montserrat.className">
          <NextAuthProvider>
            <Header />
            {children}
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
