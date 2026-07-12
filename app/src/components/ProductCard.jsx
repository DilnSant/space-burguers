import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()

  function handleQuickAdd(e) {
    e.stopPropagation()
    // Itens sem adicionais podem ser incluídos direto pelo card, com quantidade 1.
    addItem(product, 1, [], '')
  }

  return (
    <div
      className="product-card bg-surface-container-lowest rounded-[24px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.06)] flex flex-col group cursor-pointer"
      onClick={() => navigate(`/produto/${product.id}`)}
    >
      <div className="aspect-[4/3] w-full bg-surface-container-high relative overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${product.image}')` }}
        />
        {product.rating && (
          <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-xs py-0.5 rounded-lg font-label-md flex items-center gap-1">
            <Icon name="star" filled className="text-[14px]" />
            {product.rating}
          </div>
        )}
      </div>
      <div className="p-container-padding flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-base">
          <h3 className="font-headline-md text-headline-md text-on-surface">{product.name}</h3>
          <span className="font-price-display text-price-display text-primary whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-on-surface-variant font-body-md line-clamp-2 mb-lg">{product.description}</p>
        <div className="mt-auto flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-surface-variant/50 text-[10px] uppercase font-bold text-outline"
              >
                {tag}
              </span>
            ))}
          </div>
          <button
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md active:scale-90 transition-transform flex-shrink-0"
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
