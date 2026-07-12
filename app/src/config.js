// Número do WhatsApp da loja no formato internacional, somente dígitos
// (código do país + DDD + número). Ex: 55 11 99999-9999 -> "5511999999999".
// Pode ser sobrescrito via variável de ambiente VITE_WHATSAPP_NUMBER (arquivo .env).
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999'

export const STORE_NAME = 'SaltySnack'
export const STORE_PICKUP_ADDRESS = 'Rua das Delícias, 123 - Centro'
