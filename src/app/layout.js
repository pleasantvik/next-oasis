import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import NewHeader from "./_components/NewHeader";
import ReservationProvider from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "The Wild Oasis | %s",
    default: "The Wild Oasis",
  },
  description:
    "Luxurious home, located in the hearts of Italian Dolomites, surrounded by beautiful mountains and dark forest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased bg-primary-950 text-primary-100 min-h-screen ${josefin.className} flex flex-col`}
      >
        <NewHeader />
        <div className="flex-1 px-8 py-12 grid w-full">
          <main className="max-w-7xl  mx-auto  w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
