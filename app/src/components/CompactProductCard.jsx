import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

/**
 * Linha horizontal usada nas "Side Missions" e no "Combustível":
 * miniatura à esquerda, nome + descrição + preço, e botão de adição rápida.
 */
export default function CompactProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  function handleQuickAdd(e) {
    e.stopPropagation()
    addItem(product, 1, [], '')
  }

  return (
    <div
      className="product-card panel flex items-center gap-md p-sm cursor-pointer"
      onClick={() => navigate(`/produto/${product.id}`)}
    >
      <div
        className="w-16 h-16 flex-shrink-0 rounded-xl bg-cover bg-center border border-space-600/40"
        style={{ backgroundImage: `url('${product.image}')` }}
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-bold text-star truncate">{product.name}</h4>
        <p className="text-xs text-star-dim line-clamp-1">{product.description}</p>
        <span className="mt-0.5 block font-heading text-sm font-bold text-neon-pink">{formatPrice(product.price)}</span>
      </div>

      <button
        className="w-9 h-9 flex-shrink-0 rounded-full border border-space-600 bg-space-700/60 text-neon-purple flex items-center justify-center transition-all hover:bg-nebula hover:text-white hover:border-transparent active:scale-90"
        onClick={handleQuickAdd}
        aria-label={`Adicionar ${product.name} à nave`}
      >
        <Icon name="add" />
      </button>
    </div>
  )
}
