/**
 * WhatsApp contact by username, so the phone number is never published.
 * NEXT_PUBLIC_WHATSAPP_USER overrides the default username.
 * Username links are https://wa.me/<username> (WhatsApp usernames, 2026).
 */
const DEFAULT_USER = "Antfel2206";
const user = (process.env.NEXT_PUBLIC_WHATSAPP_USER || DEFAULT_USER).trim().replace(/^@/, "");

export const whatsappUrl: string | null = user ? `https://wa.me/${encodeURIComponent(user)}` : null;
