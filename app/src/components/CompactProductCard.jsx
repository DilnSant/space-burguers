import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function CompactProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  function handleQuickAdd(e) {
    e.stopPropagation()
    addItem(product, 1, [], '')
  }

  return (
    <div
      className="product-card bg-surface-container-lowest rounded-xl p-md shadow-sm border border-outline-variant/30 flex flex-col gap-xs cursor-pointer"
      onClick={() => navigate(`/produto/${product.id}`)}
    >
      <div className="aspect-square rounded-lg overflow-hidden bg-surface-container">
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${product.image}')` }} />
      </div>
      <h4 className="font-label-lg text-on-surface line-clamp-1">{product.name}</h4>
      <div className="flex justify-between items-center mt-xs">
        <span className="text-primary font-bold text-label-lg">{formatPrice(product.price)}</span>
        <button
          className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"
          onClick={handleQuickAdd}
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <Icon name="add" className="text-[18px]" />
        </button>
      </div>
    </div>
  )
}
