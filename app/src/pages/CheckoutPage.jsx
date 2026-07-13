import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { formatPrice } from '../utils/format'
import { buildOrderMessage, getWhatsappUrl } from '../utils/whatsapp'
import { WHATSAPP_NUMBER } from '../config'
import { useCart } from '../context/CartContext'

const paymentOptions = [
  { value: 'pix', label: 'Transferência Imediata (PIX)' },
  { value: 'card', label: 'Cartão (na entrega)' },
  { value: 'cash', label: 'Dinheiro' },
]

function formatPhoneDisplay(digits) {
  const m = digits.match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/)
  return m ? `+${m[1]} ${m[2]} ${m[3]}-${m[4]}` : `+${digits}`
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, clearCart } = useCart()

  const [method, setMethod] = useState('delivery')
  const [payment, setPayment] = useState('pix')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const total = subtotal + (method === 'delivery' ? deliveryFee : 0)
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-md p-lg text-center">
        <h1 className="font-display text-xl uppercase text-star">Hangar vazio</h1>
        <button className="neon-purple font-heading underline" onClick={() => navigate('/')}>
          Voltar ao cardápio
        </button>
      </div>
    )
  }

  function validate() {
    const next = {}
    if (!name.trim()) next.name = 'Identifique o tripulante para continuar.'
    if (method === 'delivery' && !address.trim()) next.address = 'Informe as coordenadas de lançamento.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSendOrder() {
    if (!validate()) return
    const message = buildOrderMessage({
      items,
      subtotal,
      deliveryFee,
      total,
      method,
      payment,
      customer: { name, phone: '', address, complement: '' },
    })
    // Abre em nova aba de forma síncrona (dentro do handler de clique) para evitar bloqueio de pop-up.
    window.open(getWhatsappUrl(message), '_blank', 'noopener,noreferrer')
    setShowSuccess(true)
    clearCart()
  }

  return (
    <div className="min-h-screen pb-44">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-gutter h-16 bg-space-900/80 backdrop-blur-md border-b border-space-600/40">
        <button className="flex items-center gap-2" onClick={() => navigate('/')}>
          <img src="/images/logo-space.png" alt="Space Burguer" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-display text-base font-extrabold uppercase tracking-widest neon-purple">Space Burguer</span>
        </button>
        <div className="flex items-center gap-1 text-star-dim">
          <Icon name="shopping_cart" />
          <Icon name="account_circle" className="text-neon-purple" />
        </div>
      </header>

      <main className="pt-20 px-container-padding max-w-2xl mx-auto space-y-lg">
        {/* Progress */}
        <div>
          <div className="flex justify-between items-center caption mb-2">
            <span>Fase: Checkout</span>
            <span>SFS-02-B</span>
          </div>
          <div className="h-1.5 rounded-full bg-space-700 overflow-hidden">
            <div className="h-full w-1/2 bg-nebula" />
          </div>
          <div className="flex justify-between mt-2 font-mono text-[10px] uppercase tracking-widest">
            <span className="text-neon-purple">● Cart</span>
            <span className="text-neon-pink">● Ship</span>
            <span className="text-star-faint">● Dock</span>
          </div>
        </div>

        {/* Manifesto do Tripulante */}
        <section className="panel p-lg space-y-lg">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-star">
            <Icon name="group" className="text-neon-purple" /> Manifesto do Tripulante
          </h2>

          <div>
            <label className="caption block mb-2" htmlFor="name">Nome do Tripulante</label>
            <div className="relative">
              <input
                id="name"
                type="text"
                className={`w-full h-12 rounded-xl border bg-space-900/60 pl-4 pr-12 text-star placeholder:text-star-faint focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/30 ${
                  errors.name ? 'border-neon-red' : 'border-space-600/60'
                }`}
                placeholder="Identifique seu comando..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Icon name="fingerprint" className="absolute right-4 top-1/2 -translate-y-1/2 text-star-faint" />
            </div>
            {errors.name && <p className="text-neon-red text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Tipo de trajetória */}
          <div>
            <label className="caption block mb-2">Tipo de Trajetória</label>
            <div className="space-y-sm">
              <button
                type="button"
                className={`w-full flex items-center gap-md p-md rounded-xl border text-left transition-all ${
                  method === 'delivery' ? 'border-neon-purple bg-neon-purple/10' : 'border-space-600/60 bg-space-900/40'
                }`}
                onClick={() => setMethod('delivery')}
              >
                <Icon name="local_shipping" className={method === 'delivery' ? 'text-neon-purple' : 'text-star-faint'} />
                <div>
                  <p className="font-heading font-bold text-star">Missão de Entrega</p>
                  <p className="caption normal-case tracking-widest">Teleporte até você</p>
                </div>
              </button>
              <button
                type="button"
                className={`w-full flex items-center gap-md p-md rounded-xl border text-left transition-all ${
                  method === 'pickup' ? 'border-neon-purple bg-neon-purple/10' : 'border-space-600/60 bg-space-900/40'
                }`}
                onClick={() => setMethod('pickup')}
              >
                <Icon name="home" className={method === 'pickup' ? 'text-neon-purple' : 'text-star-faint'} />
                <div>
                  <p className="font-heading font-bold text-star">Retirada no Hangar</p>
                  <p className="caption normal-case tracking-widest">Docagem manual</p>
                </div>
              </button>
            </div>
          </div>

          {/* Coordenadas (só entrega) */}
          {method === 'delivery' && (
            <div className="animate-slide-in">
              <label className="caption block mb-2" htmlFor="address">Coordenadas de Lançamento</label>
              <div className="relative">
                <input
                  id="address"
                  type="text"
                  className={`w-full h-12 rounded-xl border bg-space-900/60 pl-4 pr-12 text-star placeholder:text-star-faint focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/30 ${
                    errors.address ? 'border-neon-red' : 'border-space-600/60'
                  }`}
                  placeholder="Rua, Número, Bairro, Planeta..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Icon name="location_on" className="absolute right-4 top-1/2 -translate-y-1/2 text-star-faint" />
              </div>
              {errors.address && <p className="text-neon-red text-xs mt-1">{errors.address}</p>}
            </div>
          )}

          {/* Meio de combustível */}
          <div>
            <label className="caption block mb-2" htmlFor="payment">Meio de Combustível (Pagamento)</label>
            <div className="relative">
              <select
                id="payment"
                className="w-full h-12 appearance-none rounded-xl border border-space-600/60 bg-space-900/60 pl-4 pr-12 text-star focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/30"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                {paymentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-space-800">
                    {opt.label}
                  </option>
                ))}
              </select>
              <Icon name="expand_more" className="absolute right-4 top-1/2 -translate-y-1/2 text-star-faint pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Relatório */}
        <section className="panel p-lg">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-star mb-md">
            <Icon name="assignment" className="text-neon-purple" /> Relatório
          </h2>
          <div className="space-y-sm">
            {items.map((item) => (
              <div key={item.lineId} className="flex items-center gap-md">
                <div
                  className="w-11 h-11 rounded-lg bg-cover bg-center flex-shrink-0 border border-space-600/40"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold text-star truncate">{item.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-star-faint">
                    x{item.qty} unidade{item.qty > 1 ? 's' : ''}
                  </p>
                </div>
                <span className="font-heading font-bold text-neon-purple">{formatPrice(item.unitPrice * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-md pt-md border-t border-dashed border-space-600/50 space-y-1 font-mono text-sm">
            <div className="flex justify-between text-star-dim">
              <span>SUBTOTAL ({itemCount})</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-star-dim">
              <span>TAXA DE REENTRADA</span>
              {method === 'delivery' ? (
                <span className="text-neon-red">{formatPrice(deliveryFee)}</span>
              ) : (
                <span className="text-whatsapp">Grátis</span>
              )}
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-heading text-lg font-bold neon-purple">TOTAL</span>
              <span className="font-heading text-lg font-bold text-neon-pink">{formatPrice(total)}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky WhatsApp CTA */}
      <div className="fixed bottom-0 left-0 w-full px-container-padding pt-md pb-6 bg-space-900/90 backdrop-blur-lg border-t border-space-600/40 z-50">
        <div className="max-w-2xl mx-auto">
          <button
            className="w-full h-14 rounded-2xl bg-whatsapp text-white font-heading font-bold text-base uppercase tracking-widest flex items-center justify-center gap-3 shadow-glow-whatsapp transition-all hover:brightness-110 active:scale-[0.98]"
            onClick={handleSendOrder}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Lançar Pedido via WhatsApp
          </button>
          <p className="text-center font-mono text-[11px] tracking-widest text-star-faint mt-2">
            Enviar para {formatPhoneDisplay(WHATSAPP_NUMBER)}
          </p>
        </div>
      </div>

      {/* Success overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] bg-space-950/95 backdrop-blur flex items-center justify-center p-lg">
          <div className="text-center space-y-lg animate-zoom-in">
            <div className="w-24 h-24 rounded-full bg-nebula flex items-center justify-center mx-auto shadow-nebula-lg">
              <Icon name="rocket_launch" filled className="text-[56px] text-white" />
            </div>
            <h3 className="font-display text-3xl font-black uppercase neon-purple">Pedido Lançado!</h3>
            <p className="text-star-dim max-w-sm">
              Redirecionando para o WhatsApp para confirmar os detalhes da missão com o hangar.
            </p>
            <button
              className="font-heading text-neon-purple underline underline-offset-4"
              onClick={() => navigate('/')}
            >
              Nova missão
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
