import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "First National Bank - Online Banking",
  description: "First National Bank Online Banking Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
