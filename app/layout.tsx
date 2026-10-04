import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build With Harshit",
  description:
    "Practical Arduino, ESP32 and cybersecurity laboratory projects with source code and tutorials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}