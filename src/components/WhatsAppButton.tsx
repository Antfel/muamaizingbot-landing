import { whatsappUrl } from "@/lib/contact";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

/** Inline call to action ("Escríbenos por WhatsApp"). Renders nothing until a username is set. */
export function WhatsAppLink({ label = "Escríbenos por WhatsApp", className = "" }: { label?: string; className?: string }) {
  if (!whatsappUrl) return null;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 border border-[#25d366]/60 px-5 py-3 font-[family-name:var(--font-display)] text-sm tracking-wide text-[#5fe08f] transition hover:bg-[#25d366] hover:text-ink ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      {label}
    </a>
  );
}

/** Floating chat button, bottom right. */
export function WhatsAppFloat() {
  if (!whatsappUrl) return null;
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir chat de WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#25d366] p-3.5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition hover:scale-105 md:right-6 md:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden pr-1 text-sm font-semibold md:group-hover:inline">¿Dudas? Escríbenos</span>
    </a>
  );
}
