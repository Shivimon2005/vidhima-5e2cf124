import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getContact, waLink } from "@/lib/contact";

const WhatsAppButton = () => {
  const contact = getContact(useLocation().pathname);

  return (
    <a
      href={waLink(contact)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center sm:gap-2.5 px-3.5 sm:px-4 py-3 rounded-full bg-[hsl(142,72%,29%)] text-white shadow-2xl hover:bg-[hsl(142,72%,24%)] hover:scale-105 transition-all duration-300 border border-white/20"
      aria-label={`Chat on WhatsApp (${contact.displayPhone})`}
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 text-white fill-white" />
      </div>
      <span className="hidden sm:inline font-medium text-sm text-white drop-shadow-sm">Chat on WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
