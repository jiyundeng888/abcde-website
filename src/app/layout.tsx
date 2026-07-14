import type { Metadata } from "next";
import { Oswald, Montserrat, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ABCDE - Car Audio Amplifiers, Subwoofers, Speakers & Wiring Kits",
  description:
    "ABCDE manufactures high-quality car audio amplifiers, subwoofers, speakers, and wiring kits. Orders before 4 PM CST ship same day!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${montserrat.variable} ${barlowCondensed.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
