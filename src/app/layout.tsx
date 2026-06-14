import type { Metadata, Viewport } from "next";
import { MediaAutoplayUnlock } from "@/src/components/media-autoplay-unlock";
import "./globals.css";

export const metadata: Metadata = {
  title: "TikTok Demo",
  description: "Static TikTok-style mobile interface",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MediaAutoplayUnlock />
        {children}
      </body>
    </html>
  );
}
