import type { Metadata } from "next";
import { Darker_Grotesque, Inter, Geist } from "next/font/google";
import "./globals.css";

// Configure Darker Grotesque
const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  variable: "--font-darker-grotesque",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Configure your secondary font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Future",
  description: "The future is here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Inject both font variables into the body */}
      <body className={`${darkerGrotesque.variable} ${inter.variable} ${geist.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}