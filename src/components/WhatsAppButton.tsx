import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/916230823269?text=Hi%2C%20I%27m%20interested%20in%20construction%20services%20in%20Himachal%20Pradesh."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[hsl(142,70%,35%)] text-white shadow-2xl hover:bg-[hsl(142,70%,30%)] hover:scale-105 transition-all duration-300 border border-white/20"
    aria-label="Chat on WhatsApp (+91 62308 23269)"
  >
    <div className="relative flex items-center justify-center">
      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
      </span>
      <MessageCircle className="w-6 h-6 text-white fill-white" />
    </div>
    <span className="font-medium text-sm text-white drop-shadow-sm">Chat on WhatsApp</span>
  </a>
);

export default WhatsAppButton;
