import { useEffect } from "react";

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const Analytics = () => {
  useEffect(() => {
    if (!GA4_ID || !GA4_ID.startsWith("G-")) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID);
  }, []);

  return null;
};

export default Analytics;
