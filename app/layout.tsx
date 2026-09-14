import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PathGuard",
  description: "DEX routing and slippage sentinel for Stellar path payments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
