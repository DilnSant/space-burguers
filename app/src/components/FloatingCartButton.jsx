import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function FloatingCartButton() {
  const navigate = useNavigate()
  const { itemCount, subtotal } = useCart()

  if (itemCount === 0) return null

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 w-full p-gutter z-40 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <button
          className="floating-cart w-full h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-between px-lg shadow-[0_10px_30px_rgba(183,18,42,0.4)] hover:brightness-110 active:scale-95 transform transition-all duration-200"
          onClick={() => navigate('/carrinho')}
        >
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center relative">
              <Icon name="shopping_cart" filled />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full border-2 border-primary flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <div className="text-left">
              <span className="block text-label-md opacity-80 leading-none">Meu Carrinho</span>
              <span className="font-label-lg">Ver Carrinho</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-headline-md text-headline-md">{formatPrice(subtotal)}</span>
          </div>
        </button>
      </div>
    </div>
  )
}
