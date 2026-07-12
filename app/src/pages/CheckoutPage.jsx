import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import TopAppBar from '../components/TopAppBar'
import { formatPrice } from '../utils/format'
import { buildOrderMessage, getWhatsappUrl } from '../utils/whatsapp'
import { useCart } from '../context/CartContext'

const paymentOptions = [
  { value: 'card', label: 'Cartão (Na entrega)', icon: 'credit_card' },
  { value: 'pix', label: 'Pix', icon: 'qr_code_2' },
  { value: 'cash', label: 'Dinheiro', icon: 'payments' },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, clearCart } = useCart()

  const [method, setMethod] = useState('delivery')
  const [payment, setPayment] = useState('pix')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [complement, setComplement] = useState('')
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const total = subtotal + (method === 'delivery' ? deliveryFee : 0)
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])

  if (items.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-md p-lg text-center">
        <h1 className="font-headline-md text-headline-md text-on-surface">Seu carrinho está vazio</h1>
        <button className="text-primary font-label-lg underline" onClick={() => navigate('/')}>
          Voltar ao cardápio
        </button>
      </div>
    )
  }

  function validate() {
    const nextErrors = {}
    if (!name.trim()) nextErrors.name = 'Informe seu nome para continuarmos.'
    if (method === 'delivery' && !address.trim()) nextErrors.address = 'Informe o endereço de entrega.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
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
      customer: { name, phone, address, complement },
    })
    const url = getWhatsappUrl(message)

    // Abre em nova aba de forma síncrona (dentro do handler de clique) para evitar bloqueio de pop-up.
    window.open(url, '_blank', 'noopener,noreferrer')

    setShowSuccess(true)
    clearCart()
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen pb-32">
      <TopAppBar title="Finalizar Pedido" showBack />

      <main className="pt-24 px-container-padding max-w-2xl mx-auto space-y-lg">
        {/* Order Progress */}
        <div className="flex items-center justify-between mb-lg px-2">
          <div className="flex flex-col items-center gap-xs">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-lg">1</div>
            <span className="font-label-md text-label-md text-primary">Carrinho</span>
          </div>
          <div className="flex-1 h-0.5 bg-primary-fixed mx-2 mb-6" />
          <div className="flex flex-col items-center gap-xs">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-label-lg">2</div>
            <span className="font-label-md text-label-md text-primary">Checkout</span>
          </div>
          <div className="flex-1 h-0.5 bg-surface-variant mx-2 mb-6" />
          <div className="flex flex-col items-center gap-xs">
            <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-label-lg">3</div>
            <span className="font-label-md text-label-md text-on-surface-variant">Pronto</span>
          </div>
        </div>

        <div className="space-y-lg">
          {/* Identification Section */}
          <section className="bg-surface-container-lowest p-lg rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-2">
              <Icon name="person" className="text-primary" /> Seus Dados
            </h2>
            <div className="space-y-md">
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs" htmlFor="name">
                  Nome Completo
                </label>
                <input
                  className={`w-full p-md bg-surface-container-low border-transparent rounded-xl focus:bg-white transition-all font-body-md ${
                    errors.name ? 'ring-2 ring-error' : ''
                  }`}
                  id="name"
                  placeholder="Ex: João Silva"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-error text-label-md mt-xs">{errors.name}</p>}
              </div>
              <div>
                <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs" htmlFor="phone">
                  WhatsApp
                </label>
                <input
                  className="w-full p-md bg-surface-container-low border-transparent rounded-xl focus:bg-white transition-all font-body-md"
                  id="phone"
                  placeholder="(00) 00000-0000"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Delivery/Pickup Section */}
          <section className="bg-surface-container-lowest p-lg rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-2">
              <Icon name="delivery_dining" className="text-primary" /> Entrega ou Retirada
            </h2>
            <div className="grid grid-cols-2 gap-md p-xs bg-surface-container-low rounded-2xl mb-lg">
              <button
                className={`flex items-center justify-center gap-xs py-md px-lg rounded-xl transition-all font-label-lg ${
                  method === 'delivery' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-variant/50'
                }`}
                onClick={() => setMethod('delivery')}
              >
                <Icon name="moped" className="text-[20px]" /> Entrega
              </button>
              <button
                className={`flex items-center justify-center gap-xs py-md px-lg rounded-xl transition-all font-label-lg ${
                  method === 'pickup' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-variant/50'
                }`}
                onClick={() => setMethod('pickup')}
              >
                <Icon name="store" className="text-[20px]" /> Retirada
              </button>
            </div>

            {method === 'delivery' ? (
              <div className="space-y-md">
                <div>
                  <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs" htmlFor="address">
                    Endereço de Entrega
                  </label>
                  <div className="relative">
                    <input
                      className={`w-full p-md bg-surface-container-low border-transparent rounded-xl focus:bg-white transition-all font-body-md pr-12 ${
                        errors.address ? 'ring-2 ring-error' : ''
                      }`}
                      id="address"
                      placeholder="Rua, número, bairro..."
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <Icon name="location_on" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
                  </div>
                  {errors.address && <p className="text-error text-label-md mt-xs">{errors.address}</p>}
                </div>
                <div>
                  <label className="block font-label-lg text-label-lg text-on-surface-variant mb-xs" htmlFor="complement">
                    Complemento (Opcional)
                  </label>
                  <input
                    className="w-full p-md bg-surface-container-low border-transparent rounded-xl focus:bg-white transition-all font-body-md"
                    id="complement"
                    placeholder="Ap, Bloco, Ponto de ref..."
                    type="text"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="animate-slide-in">
                <div className="bg-primary-container/10 p-md rounded-xl border border-primary-container/20 flex gap-md items-start">
                  <Icon name="info" className="text-primary" />
                  <div>
                    <p className="font-label-lg text-label-lg text-primary">Retirada Grátis</p>
                    <p className="font-body-md text-on-surface-variant text-sm">
                      Rua das Delícias, 123 - Centro. Seu pedido estará pronto em 20-30 min.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Payment Method */}
          <section className="bg-surface-container-lowest p-lg rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-md flex items-center gap-2">
              <Icon name="payments" className="text-primary" /> Forma de Pagamento
            </h2>
            <div className="grid grid-cols-1 gap-md">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center justify-between p-md border border-outline-variant/30 rounded-xl cursor-pointer hover:bg-surface-variant/20 transition-all"
                >
                  <div className="flex items-center gap-md">
                    <Icon name={opt.icon} className="text-secondary" />
                    <span className="font-body-md">{opt.label}</span>
                  </div>
                  <input
                    className="text-primary focus:ring-primary h-5 w-5 border-outline-variant"
                    name="payment"
                    type="radio"
                    value={opt.value}
                    checked={payment === opt.value}
                    onChange={() => setPayment(opt.value)}
                  />
                </label>
              ))}
            </div>
          </section>

          {/* Order Summary */}
          <section className="bg-surface-container-lowest p-lg rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] border border-outline-variant/20">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-md">Resumo</h2>
            <div className="space-y-sm">
              <div className="flex justify-between font-body-md text-on-surface-variant">
                <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-body-md text-on-surface-variant">
                <span>Taxa de Entrega</span>
                {method === 'delivery' ? (
                  <span className="font-bold">{formatPrice(deliveryFee)}</span>
                ) : (
                  <span className="text-secondary font-bold">Grátis</span>
                )}
              </div>
              <div className="pt-sm border-t border-outline-variant/30 flex justify-between">
                <span className="font-headline-md text-headline-md text-on-surface">Total</span>
                <span className="font-headline-md text-headline-md text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Primary Action Button Wrapper */}
      <div className="fixed bottom-0 left-0 w-full p-container-padding bg-surface/90 backdrop-blur-lg border-t border-outline-variant/20 z-50">
        <div className="max-w-2xl mx-auto">
          <button
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-lg rounded-2xl flex items-center justify-center gap-md font-headline-md text-headline-md shadow-lg transition-all active:scale-[0.98] duration-200"
            onClick={handleSendOrder}
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enviar pedido pelo WhatsApp
          </button>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] bg-surface flex items-center justify-center p-lg">
          <div className="text-center space-y-lg animate-zoom-in">
            <div className="w-24 h-24 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Icon name="check_circle" filled className="text-[64px]" />
            </div>
            <h3 className="font-headline-xl text-headline-xl text-primary">Pedido Enviado!</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm">
              Você será redirecionado para o WhatsApp para confirmar os detalhes com nossa equipe.
            </p>
            <button
              className="font-label-lg text-label-lg text-primary underline underline-offset-4"
              onClick={() => navigate('/')}
            >
              Fazer novo pedido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
