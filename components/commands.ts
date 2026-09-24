export type Command = {
  id: string;
  label: string;
  hint?: string; // right-aligned marker, mono. "↗" flags a new-tab/external jump.
  keywords?: string;
  kind: "scroll" | "external" | "mailto";
  target: string; // element id (no #) | url | email address
  group: "Go to" | "Links";
};

export const commands: Command[] = [
  { id: "top", label: "Top", keywords: "home hero start intro name", kind: "scroll", target: "top", group: "Go to" },
  { id: "peel", label: "Peel — macOS sticky notes", keywords: "project work case study swift appkit native", kind: "scroll", target: "peel", group: "Go to" },
  { id: "relay", label: "Relay — real-time issue tracker", keywords: "project work case study convex websocket sync", kind: "scroll", target: "relay", group: "Go to" },
  { id: "corpsec", label: "Experience — Corpsec", keywords: "work job technical pm product manager fullstack", kind: "scroll", target: "corpsec", group: "Go to" },
  { id: "about", label: "Off the clock", keywords: "about bio singing metal comics interests", kind: "scroll", target: "about", group: "Go to" },
  { id: "contact", label: "Contact", keywords: "email hire reach get in touch whatsapp", kind: "scroll", target: "contact", group: "Go to" },
  { id: "email", label: "Email prasaiadarsha@gmail.com", hint: "↗", keywords: "contact hire mail write", kind: "mailto", target: "prasaiadarsha@gmail.com", group: "Links" },
  { id: "whatsapp", label: "WhatsApp", hint: "↗", keywords: "message chat contact", kind: "external", target: "https://wa.me/9779813244949", group: "Links" },
  { id: "github", label: "GitHub — Adarsha23", hint: "↗", keywords: "code profile projects source", kind: "external", target: "https://github.com/Adarsha23", group: "Links" },
  { id: "linkedin", label: "LinkedIn", hint: "↗", keywords: "profile work experience connect", kind: "external", target: "https://www.linkedin.com/in/adarsha-prasai-637b49283/", group: "Links" },
  { id: "spotify", label: "My metal playlist on Spotify", hint: "↗", keywords: "music metal listen", kind: "external", target: "https://open.spotify.com/playlist/1Ff9IYQkKGvbrXthjccekz", group: "Links" },
  { id: "relay-live", label: "Open the live Relay app", hint: "↗", keywords: "demo deployed vercel try", kind: "external", target: "https://relayy-web.vercel.app", group: "Links" },
  { id: "peel-repo", label: "Peel source on GitHub", hint: "↗", keywords: "code repo swift open source mit", kind: "external", target: "https://github.com/Adarsha23/peel", group: "Links" },
];
