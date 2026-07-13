import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function FloatingCartButton() {
  const navigate = useNavigate()
  const { itemCount, subtotal } = useCart()

  if (itemCount === 0) return null

  return (
    <div className="fixed bottom-20 md:bottom-4 left-0 w-full px-gutter z-40 pointer-events-none">
      <div className="max-w-2xl mx-auto pointer-events-auto">
        <button
          className="floating-cart btn-nebula w-full h-16 flex items-center justify-between px-lg"
          onClick={() => navigate('/carrinho')}
        >
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center relative">
              <Icon name="rocket_launch" filled />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon-gold text-space-900 text-[10px] font-bold rounded-full border-2 border-white/20 flex items-center justify-center">
                {itemCount}
              </span>
            </div>
            <div className="text-left">
              <span className="block font-mono text-[10px] uppercase tracking-widest opacity-80 leading-none">
                Hangar
              </span>
              <span className="font-heading text-label-lg">Ver pedido</span>
            </div>
          </div>
          <span className="font-display text-lg font-bold">{formatPrice(subtotal)}</span>
        </button>
      </div>
    </div>
  )
}
