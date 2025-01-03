import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ marginLeft: "160px", marginRight: "160px", marginTop: "55px" }}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
