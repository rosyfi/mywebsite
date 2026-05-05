import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollCat from "./components/ScrollCat";
import { ThemeProvider } from "next-themes";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "rossella. portfolio",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem={false}>
          <NavBar />
          <ScrollCat />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
