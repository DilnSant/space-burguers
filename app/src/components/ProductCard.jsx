import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

/**
 * Card de produto: foto, nome, descrição, preço e botão "+" de adição rápida.
 */
export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  function handleQuickAdd(e) {
    e.stopPropagation()
    addItem(product, 1, [], '')
  }

  return (
    <div
      className="product-card panel overflow-hidden flex flex-col group cursor-pointer"
      onClick={() => navigate(`/produto/${product.id}`)}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-900/70 via-transparent to-transparent" />
      </div>
      <div className="p-container-padding flex-1 flex flex-col">
        <h3 className="font-heading text-lg font-bold text-star">{product.name}</h3>
        <p className="mt-1 text-sm text-star-dim line-clamp-2">{product.description}</p>
        <div className="mt-md flex items-center justify-between">
          <span className="font-heading text-price-display font-bold text-neon-pink">{formatPrice(product.price)}</span>
          <button
            className="w-10 h-10 rounded-full border border-space-600 bg-space-700/60 text-neon-purple flex items-center justify-center transition-all hover:bg-nebula hover:text-white hover:border-transparent active:scale-90"
            onClick={handleQuickAdd}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            <Icon name="add" />
          </button>
        </div>
      </div>
    </div>
  )
}
