import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server serve its JS/HMR when you open the site over the LAN IP
  // (e.g. from your phone), not just localhost. Dev-only; ignored in production.
  allowedDevOrigins: ["192.168.1.153", "*.local"],
};

export default nextConfig;
