import { WHATSAPP_NUMBER } from './constants';

/**
 * Digits-only WhatsApp number for wa.me links.
 * wa.me requires the country code with no '+', spaces, or dashes.
 */
export const WHATSAPP_DIGITS = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

/** Build a wa.me click-to-chat URL with a pre-filled text message. */
export const buildWhatsAppUrl = (message: string): string =>
  `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(message)}`;
