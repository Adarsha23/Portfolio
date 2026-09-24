import { Bangers, Comic_Neue, IBM_Plex_Mono } from "next/font/google";

// Display: Bangers is the classic inked comic-title face — loud, hand-lettered.
export const display = Bangers({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bangers",
});

// Body: Comic Neue is a properly-drawn comic face (a redeemed Comic Sans),
// readable at text sizes while keeping the comic voice.
export const body = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-comic",
});

// Data only: keyboard shortcuts, issue keys, metrics, file paths, code.
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});
