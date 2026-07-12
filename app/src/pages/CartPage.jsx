import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import TopAppBar from '../components/TopAppBar'
import BottomNav from '../components/BottomNav'
import QuantitySelector from '../components/QuantitySelector'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, subtotal, increment, decrement, removeItem } = useCart()
  const isEmpty = items.length === 0

  return (
    <div className="bg-background text-on-surface font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen pb-32">
      <TopAppBar title="Meu Carrinho" showBack />

      <main className="pt-20 px-container-padding max-w-3xl mx-auto">
        {isEmpty ? (
          <section className="flex flex-col items-center justify-center py-2xl text-center">
            <div className="w-48 h-48 bg-surface-container rounded-full flex items-center justify-center mb-lg">
              <Icon name="shopping_basket" className="text-[80px] text-outline-variant" />
            </div>
            <h2 className="font-headline-md text-on-surface mb-sm">Seu carrinho está vazio</h2>
            <p className="text-body-md text-on-surface-variant max-w-[280px] mb-xl">
              Parece que você ainda não escolheu seu snack favorito. Que tal dar uma olhadinha no cardápio?
            </p>
            <button
              className="bg-primary-container/10 text-primary font-label-lg px-xl py-md rounded-full hover:bg-primary-container/20 transition-colors"
              onClick={() => navigate('/')}
            >
              Ver Cardápio
            </button>
          </section>
        ) : (
          <>
            {/* Cart Items Section */}
            <section className="space-y-md">
              {items.map((item, index) => (
                <div
                  key={item.lineId}
                  className="animate-slide-in bg-surface-container-lowest p-md rounded-2xl shadow-[0_10px_20px_rgba(0,0,0,0.06)] flex items-center gap-md"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start gap-sm">
                      <h3 className="font-headline-md text-label-lg text-on-surface truncate">{item.name}</h3>
                      <button
                        className="text-outline hover:text-error transition-colors flex-shrink-0"
                        onClick={() => removeItem(item.lineId)}
                        aria-label={`Remover ${item.name} do carrinho`}
                      >
                        <Icon name="delete" className="text-[20px]" />
                      </button>
                    </div>
                    {item.addons.length > 0 && (
                      <p className="text-label-md text-on-surface-variant truncate">
                        {item.addons.map((a) => a.name).join(', ')}
                      </p>
                    )}
                    {item.notes && <p className="text-label-md text-on-surface-variant/80 italic truncate">"{item.notes}"</p>}
                    <div className="mt-sm flex items-center justify-between">
                      <span className="font-price-display text-primary text-price-display">
                        {formatPrice(item.unitPrice * item.qty)}
                      </span>
                      <QuantitySelector
                        value={item.qty}
                        size="sm"
                        onDecrement={() => decrement(item.lineId)}
                        onIncrement={() => increment(item.lineId)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Summary Section */}
            <section className="mt-2xl animate-slide-in">
              <div className="bg-surface-container p-lg rounded-3xl space-y-md">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span className="font-label-lg">Subtotal</span>
                  <span className="font-body-md">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span className="font-label-lg">Taxa de Entrega</span>
                  <span className="font-body-md text-tertiary">Calculada no checkout</span>
                </div>
                <div className="pt-md border-t border-outline-variant/30 flex justify-between items-center">
                  <span className="font-headline-md text-on-surface">Subtotal</span>
                  <span className="font-headline-md text-primary text-headline-md">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </section>

            {/* Checkout Button */}
            <div className="mt-xl mb-lg">
              <button
                className="w-full bg-primary text-on-primary font-headline-md py-lg rounded-[24px] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-md"
                onClick={() => navigate('/finalizar')}
              >
                Finalizar Pedido
                <Icon name="arrow_forward" />
              </button>
            </div>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
