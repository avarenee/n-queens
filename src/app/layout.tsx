import type { Metadata } from "next";
import "./globals.css";
import { ChessboardProvider } from "./chessboard/chessboardProvider";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Outfit } from "next/font/google"
const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "N Queens"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased h-screen flex flex-col items-center`}
      >
        <Header/>
        <ChessboardProvider>
          {children}
        </ChessboardProvider>
        <Footer/>
      </body>
    </html>
  );
}
