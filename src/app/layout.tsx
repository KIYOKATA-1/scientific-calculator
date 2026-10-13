import type { Metadata, Viewport } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.scss";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Scientific Calculator",
  description: "Scientific calculator with calculation history",
};

export const viewport: Viewport = {
  themeColor: "#1c1f22",
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