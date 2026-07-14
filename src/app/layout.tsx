import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${sourceSerif.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
