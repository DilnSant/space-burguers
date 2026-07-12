import { formatPrice } from './format'
import { STORE_NAME, WHATSAPP_NUMBER } from '../config'

/**
 * Monta o texto do resumo do pedido para envio via WhatsApp.
 */
export function buildOrderMessage({ items, subtotal, deliveryFee, total, method, payment, customer }) {
  const lines = []

  lines.push(`*Novo pedido - ${STORE_NAME}*`)
  lines.push('')
  lines.push('*Itens:*')

  items.forEach((item) => {
    const itemTotal = item.unitPrice * item.qty
    lines.push(`• ${item.qty}x ${item.name} — ${formatPrice(itemTotal)}`)
    if (item.addons?.length) {
      item.addons.forEach((a) => lines.push(`   + ${a.name} (${formatPrice(a.price)})`))
    }
    if (item.notes) {
      lines.push(`   obs: ${item.notes}`)
    }
  })

  lines.push('')
  lines.push(`Subtotal: ${formatPrice(subtotal)}`)
  lines.push(`Taxa de entrega: ${method === 'delivery' ? formatPrice(deliveryFee) : 'Grátis (retirada)'}`)
  lines.push(`*Total: ${formatPrice(total)}*`)
  lines.push('')

  lines.push(`*Cliente:* ${customer.name}`)
  if (customer.phone) lines.push(`*WhatsApp:* ${customer.phone}`)

  lines.push(`*Entrega:* ${method === 'delivery' ? 'Entrega' : 'Retirada no local'}`)
  if (method === 'delivery') {
    lines.push(`*Endereço:* ${customer.address}${customer.complement ? ` - ${customer.complement}` : ''}`)
  }

  const paymentLabels = { card: 'Cartão (na entrega)', pix: 'Pix', cash: 'Dinheiro' }
  lines.push(`*Pagamento:* ${paymentLabels[payment] || payment}`)

  return lines.join('\n')
}

/**
 * Gera a URL do wa.me com o texto do pedido já codificado.
 */
export function getWhatsappUrl(message, phoneNumber = WHATSAPP_NUMBER) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
}
