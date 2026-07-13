import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import TopAppBar from '../components/TopAppBar'
import QuantitySelector from '../components/QuantitySelector'
import { getProductById, addonsCatalog } from '../data/products'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

const ADD_STATE = { IDLE: 'idle', ADDING: 'adding', ADDED: 'added' }

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = getProductById(id)

  const [quantity, setQuantity] = useState(1)
  const [selectedAddonIds, setSelectedAddonIds] = useState([])
  const [notes, setNotes] = useState('')
  const [addState, setAddState] = useState(ADD_STATE.IDLE)

  const selectedAddons = useMemo(
    () => addonsCatalog.filter((a) => selectedAddonIds.includes(a.id)),
    [selectedAddonIds]
  )
  const unitPrice = (product?.price || 0) + selectedAddons.reduce((sum, a) => sum + a.price, 0)
  const totalPrice = unitPrice * quantity

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-md p-lg text-center">
        <h1 className="font-display text-xl uppercase text-star">Missão não encontrada</h1>
        <button className="neon-purple font-heading underline" onClick={() => navigate('/')}>
          Voltar ao cardápio
        </button>
      </div>
    )
  }

  function toggleAddon(addonId) {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((x) => x !== addonId) : [...prev, addonId]
    )
  }

  function handleAddToCart() {
    if (addState !== ADD_STATE.IDLE) return
    setAddState(ADD_STATE.ADDING)
    setTimeout(() => {
      addItem(product, quantity, selectedAddons, notes)
      setAddState(ADD_STATE.ADDED)
      setTimeout(() => navigate('/carrinho'), 700)
    }, 400)
  }

  return (
    <div className="min-h-screen pb-40">
      <TopAppBar title="Space Burguer" showBack centerLogo />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative w-full aspect-square md:aspect-[16/10] overflow-hidden">
          <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/20 to-transparent" />
          {product.deliveryOnly && (
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-space-500/70 bg-space-900/70 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-star-dim backdrop-blur">
              Só Delivery 📦
            </span>
          )}
        </section>

        {/* Title + price */}
        <div className="px-container-padding -mt-6 relative z-10">
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-star">{product.name}</h2>
          <p className="mt-3 text-body-md text-star-dim leading-relaxed">
            {product.subtitle && <span className="font-bold neon-purple">{product.subtitle}: </span>}
            {product.detailDescription}
          </p>
          <p className="mt-md font-display text-3xl font-extrabold text-star">{formatPrice(product.price)}</p>
        </div>

        {/* UPGRADE PROPULSÃO */}
        {product.hasAddons && (
          <section className="mt-xl px-container-padding">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-star mb-md">
              Upgrade Propulsão
            </h3>
            <div className="panel divide-y divide-space-600/40">
              {addonsCatalog.map((addon) => {
                const checked = selectedAddonIds.includes(addon.id)
                return (
                  <label
                    key={addon.id}
                    className="flex items-center justify-between gap-md p-md cursor-pointer transition-colors hover:bg-space-700/40"
                  >
                    <div className="flex items-center gap-md">
                      <input
                        type="checkbox"
                        className="h-6 w-6 rounded-md border-space-500 bg-space-900 text-neon-magenta focus:ring-neon-purple/40 focus:ring-offset-0"
                        checked={checked}
                        onChange={() => toggleAddon(addon.id)}
                      />
                      <span className="font-heading text-star">{addon.name}</span>
                    </div>
                    <span className="font-heading font-bold text-neon-purple whitespace-nowrap">
                      + {formatPrice(addon.price)}
                    </span>
                  </label>
                )
              })}
            </div>
          </section>
        )}

        {/* Observações */}
        <section className="mt-xl px-container-padding">
          <h3 className="font-display text-lg font-bold uppercase tracking-wide text-star mb-md">Registro de bordo</h3>
          <textarea
            className="w-full h-28 p-md rounded-2xl border border-space-600/60 bg-space-800/70 text-body-md text-star placeholder:text-star-faint focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/30"
            placeholder="Ex: sem cebola, ponto da carne bem passado..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </section>

        {/* Units to deploy */}
        <section className="mt-xl px-container-padding flex items-center justify-between">
          <span className="caption">Units to deploy</span>
          <QuantitySelector
            value={quantity}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            onIncrement={() => setQuantity((q) => q + 1)}
          />
        </section>
      </main>

      {/* Sticky footer */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-space-900/90 backdrop-blur-lg px-container-padding pt-md pb-8 border-t border-space-600/40">
        <button
          className="btn-nebula w-full h-14 text-base uppercase tracking-widest disabled:opacity-80"
          onClick={handleAddToCart}
          disabled={addState !== ADD_STATE.IDLE}
        >
          {addState === ADD_STATE.IDLE && (
            <>
              <Icon name="rocket_launch" filled className="text-[20px]" />
              <span>Adicionar à Nave</span>
              <span className="ml-auto rounded-full bg-white/20 px-3 py-1 text-sm normal-case tracking-normal">
                {formatPrice(totalPrice)}
              </span>
            </>
          )}
          {addState === ADD_STATE.ADDING && (
            <>
              <Icon name="sync" className="animate-spin" />
              <span>Acoplando...</span>
            </>
          )}
          {addState === ADD_STATE.ADDED && (
            <>
              <Icon name="check_circle" filled />
              <span>À bordo!</span>
            </>
          )}
        </button>
      </footer>
    </div>
  )
}
