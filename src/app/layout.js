import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Logo from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Wild Oasis",
  description: "Your luxury home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
