import type { Metadata } from "next";
import Footer from "./UI/Footer/Footer";
import NavBar from "./UI/NavBar/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dan Abidov | Embedded Systems Engineer",
  description:
    "Portfolio layout focused on embedded firmware, hardware development, and systems engineering projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
