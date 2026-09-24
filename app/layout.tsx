import type { Metadata, Viewport } from "next";
import { display, body, mono } from "./fonts";
import Cursor from "@/components/Cursor";
import "./globals.css";

export const metadata: Metadata = {
  // TODO: swap to the real domain on deploy so OG/canonical URLs resolve.
  metadataBase: new URL("https://adarshaprasai.com"),
  title: "Adarsha Prasai — full-stack developer & technical PM",
  description:
    "Full-stack developer and technical product manager. I build native-feeling, keyboard-driven tools: Peel, a zero-dependency macOS sticky-notes app, and Relay, a real-time issue tracker. I also sing and listen to too much metal.",
  authors: [{ name: "Adarsha Prasai" }],
  openGraph: {
    title: "Adarsha Prasai — full-stack developer & technical PM",
    description:
      "I build native-feeling tools, ship them finished, and care about the product. Peel, Relay, and a lot of metal.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsha Prasai — full-stack developer & technical PM",
    description: "I build tools I actually want to use. Peel, Relay, and a lot of metal.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4eddc",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      {/* suppressHydrationWarning: browser extensions (Grammarly, ColorZilla, etc.)
          inject attributes on <body> before React hydrates. This is benign. */}
      <body suppressHydrationWarning>
        {children}
        <Cursor />
      </body>
    </html>
  );
}
