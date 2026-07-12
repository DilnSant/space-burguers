import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import TopAppBar from '../components/TopAppBar'
import QuantitySelector from '../components/QuantitySelector'
import { getProductById, addonsCatalog } from '../data/products'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

const ADD_STATE = {
  IDLE: 'idle',
  ADDING: 'adding',
  ADDED: 'added',
}

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
        <h1 className="font-headline-md text-headline-md text-on-surface">Produto não encontrado</h1>
        <button className="text-primary font-label-lg underline" onClick={() => navigate('/')}>
          Voltar ao cardápio
        </button>
      </div>
    )
  }

  function toggleAddon(addonId) {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    )
  }

  function handleAddToCart() {
    if (addState !== ADD_STATE.IDLE) return
    setAddState(ADD_STATE.ADDING)
    setTimeout(() => {
      addItem(product, quantity, selectedAddons, notes)
      setAddState(ADD_STATE.ADDED)
      setTimeout(() => {
        setAddState(ADD_STATE.IDLE)
        setQuantity(1)
        setSelectedAddonIds([])
        setNotes('')
      }, 1200)
    }, 500)
  }

  return (
    <div className="bg-background text-on-surface min-h-screen pb-32">
      <TopAppBar
        title={product.name}
        showBack
        trailing={
          <button className="p-2 hover:bg-surface-variant/50 transition-colors rounded-full" aria-label="Compartilhar">
            <Icon name="share" className="text-primary" />
          </button>
        }
      />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden product-image-container">
          <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </section>

        {/* Product Details */}
        <div className="px-container-padding -mt-8 relative z-10">
          <div className="bg-surface-container-lowest rounded-3xl p-lg shadow-[0_10px_20px_rgba(0,0,0,0.06)]">
            <div className="flex justify-between items-start mb-xs gap-md">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">
                {product.name}
              </h2>
              <span className="font-price-display text-price-display text-primary whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
            </div>
            {(product.badges.length > 0 || product.tags.length > 0) && (
              <div className="flex gap-xs mb-md flex-wrap">
                {product.badges.map((badge) => (
                  <span key={badge} className="bg-tertiary/10 text-tertiary-container px-3 py-1 rounded-full font-label-md text-label-md">
                    {badge}
                  </span>
                ))}
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-error/10 text-error px-3 py-1 rounded-full font-label-md text-label-md">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {product.detailDescription}
            </p>
          </div>
        </div>

        {/* Adicionais Section */}
        {product.hasAddons && (
          <section className="mt-xl px-container-padding">
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-headline-md text-headline-md text-on-surface">Adicionais</h3>
              <span className="bg-surface-variant text-on-surface-variant font-label-md text-label-md px-2 py-0.5 rounded">
                Opcional
              </span>
            </div>
            <div className="space-y-sm">
              {addonsCatalog.map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center justify-between p-md bg-surface-container rounded-2xl cursor-pointer hover:bg-surface-variant/50 transition-all border-2 border-transparent has-[:checked]:border-primary/30 has-[:checked]:bg-primary/5"
                >
                  <div className="flex items-center gap-md">
                    <input
                      className="h-6 w-6 rounded-lg border-outline text-primary focus:ring-primary/20"
                      type="checkbox"
                      checked={selectedAddonIds.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                    />
                    <div>
                      <p className="font-label-lg text-label-lg text-on-surface">{addon.name}</p>
                      <p className="font-label-md text-label-md text-on-surface-variant">{addon.description}</p>
                    </div>
                  </div>
                  <span className="font-label-lg text-label-lg text-primary">+ {formatPrice(addon.price)}</span>
                </label>
              ))}
            </div>
          </section>
        )}

        {/* Observation */}
        <section className="mt-xl px-container-padding">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Alguma observação?</h3>
          <textarea
            className="w-full h-32 p-md bg-surface-container-high rounded-2xl border-none focus:ring-2 focus:ring-primary/30 font-body-md text-body-md placeholder:text-on-surface-variant/50"
            placeholder="Ex: Tirar a cebola, ponto da carne bem passado..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </section>
      </main>

      {/* Sticky Footer Actions */}
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-lg px-container-padding pt-md pb-xl shadow-[0_-10px_20px_rgba(0,0,0,0.06)] rounded-t-3xl border-t border-outline-variant/30">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-md">
          <QuantitySelector
            value={quantity}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            onIncrement={() => setQuantity((q) => q + 1)}
            highlightIncrement={false}
          />
          <button
            className="flex-1 bg-primary text-on-primary h-14 rounded-full font-label-lg text-label-lg flex items-center justify-center gap-sm active:scale-[0.98] transition-transform shadow-lg shadow-primary/20 disabled:opacity-80"
            onClick={handleAddToCart}
            disabled={addState !== ADD_STATE.IDLE}
          >
            {addState === ADD_STATE.IDLE && (
              <>
                <Icon name="shopping_basket" />
                <span>Adicionar ao Carrinho</span>
                <span className="ml-auto bg-on-primary/20 px-3 py-1 rounded-full text-sm">{formatPrice(totalPrice)}</span>
              </>
            )}
            {addState === ADD_STATE.ADDING && (
              <>
                <Icon name="sync" className="animate-spin" />
                <span>Adicionando...</span>
              </>
            )}
            {addState === ADD_STATE.ADDED && (
              <>
                <Icon name="check_circle" filled />
                <span>Adicionado!</span>
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  )
}
