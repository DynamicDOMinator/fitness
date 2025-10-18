import { Cairo, Bebas_Neue } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";
import { LanguageProvider } from "./contexts/LanguageContext";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "BettrFitness",
  icons: {
    icon: "/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
      bg-[#1a1c21] max-w-[1600px] mx-auto ${cairo.variable} ${bebasNeue.variable}`}
      >
        <LanguageProvider>
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
