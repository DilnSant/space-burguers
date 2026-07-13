// Número do WhatsApp da loja no formato internacional, somente dígitos
// (código do país + DDD + número). Ex: +55 47 98493-2926 -> "5547984932926".
// Pode ser sobrescrito via variável de ambiente VITE_WHATSAPP_NUMBER (arquivo .env).
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5547984932926'

export const STORE_NAME = 'Space Burguer'
export const STORE_PICKUP_ADDRESS = 'Hangar Central — Estação Orbital 47'

// "Taxa de Lançamento" (delivery fee)
export const DELIVERY_FEE = 12.0
