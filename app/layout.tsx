import type { Metadata } from "next";
import localFont from "next/font/local";
import { Indie_Flower, Solway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const displayFont = localFont({
  src: [
    {
      path: "../assets/fonts/malibu/TBJMalibuMiniEdition-Thin-BF67e6e5805f97d.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/malibu/TBJMalibuMiniEdition-ExtLt-BF67e6e58062cd3.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/malibu/TBJMalibuMiniEdition-Light-BF67e6e5805e005.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/malibu/TBJMalibuMiniEdition-Regular-BF67e6e5803866a.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/malibu/TBJMalibuMiniEdition-Medium-BF67e6e58062cd1.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/malibu/TBJMalibuMiniEdition-SemiBold-BF67e6e58038574.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/malibu/TBJMalibuMiniEdition-Bold-BF67e6e5805c263.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/malibu/TBJMalibuMiniEdition-ExtBd-BF67e6e5805f6f5.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-display",
});

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-indie-flower",
});

const solway = Solway({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-solway",
});

export const metadata: Metadata = {
  title: "CPU Scheduling Simulator",
  description: "A CPU scheduling simulator built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${displayFont.variable} ${indieFlower.variable} ${solway.variable}`}
    >
      <body className="min-h-full flex flex-col font-body">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
