import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import QuantitySelector from '../components/QuantitySelector'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, increment, decrement, removeItem } = useCart()
  const isEmpty = items.length === 0
  const total = subtotal + (isEmpty ? 0 : deliveryFee)

  return (
    <div className="min-h-screen pb-40">
      {/* Neon brand header */}
      <header className="pt-2xl pb-lg flex flex-col items-center gap-3">
        <img
          src="/images/logo-space.png"
          alt="Space Burguer"
          className="h-20 w-20 rounded-full object-cover shadow-glow-purple"
        />
        <h1 className="font-display text-2xl font-black uppercase tracking-[0.25em] neon-purple">Space Burguer</h1>
      </header>

      <main className="px-container-padding max-w-2xl mx-auto">
        {isEmpty ? (
          <section className="flex flex-col items-center justify-center py-2xl text-center">
            <div className="w-40 h-40 rounded-full bg-space-800/60 border border-space-600/50 flex items-center justify-center mb-lg">
              <Icon name="rocket_launch" className="text-[72px] text-space-500" />
            </div>
            <h2 className="font-display text-xl uppercase text-star mb-sm">Seu carrinho está vazio</h2>
            <p className="text-star-dim max-w-[280px] mb-xl">
              Você ainda não adicionou nenhum item. Que tal escolher um lanche no cardápio?
            </p>
            <button className="btn-nebula px-xl h-12 uppercase tracking-widest text-sm" onClick={() => navigate('/')}>
              Ver cardápio
            </button>
          </section>
        ) : (
          <>
            {/* Items */}
            <section className="space-y-md">
              {items.map((item, index) => (
                <div
                  key={item.lineId}
                  className="animate-slide-in panel p-md flex gap-md"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-space-600/40">
                    <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-sm">
                      <h3 className="font-heading font-bold text-neon-purple truncate">{item.name}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-mono text-xs text-star-faint">{item.qty}x</span>
                        <button
                          className="text-star-faint hover:text-neon-red transition-colors"
                          onClick={() => removeItem(item.lineId)}
                          aria-label={`Remover ${item.name}`}
                        >
                          <Icon name="close" className="text-[18px]" />
                        </button>
                      </div>
                    </div>
                    {item.addons.length > 0 && (
                      <p className="text-xs text-star-dim truncate">{item.addons.map((a) => a.name).join(', ')}</p>
                    )}
                    {item.notes && <p className="text-xs text-star-faint italic truncate">"{item.notes}"</p>}
                    <div className="mt-sm flex items-center justify-between">
                      <QuantitySelector
                        value={item.qty}
                        size="sm"
                        onDecrement={() => decrement(item.lineId)}
                        onIncrement={() => increment(item.lineId)}
                      />
                      <span className="font-heading font-bold text-neon-pink">{formatPrice(item.unitPrice * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Resumo */}
            <section className="mt-xl panel p-lg">
              <h3 className="caption border-b border-space-600/40 pb-sm mb-md">Resumo do pedido</h3>
              <div className="space-y-sm font-mono text-sm">
                <div className="flex justify-between text-star-dim">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-star-dim">
                  <span>Taxa de entrega</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="pt-sm border-t border-space-600/40 flex justify-between items-baseline">
                  <span className="font-heading text-lg font-bold text-star">Total</span>
                  <span className="font-heading text-lg font-bold text-neon-pink">{formatPrice(total)}</span>
                </div>
                <p className="text-right text-[10px] text-neon-gold">Entrega estimada: 35 min</p>
              </div>
            </section>

            {/* Cupom */}
            <section className="mt-md panel p-md flex items-center justify-between border-dashed">
              <div className="flex items-center gap-md">
                <Icon name="confirmation_number" className="text-neon-purple" />
                <div>
                  <p className="font-heading font-bold text-star">Cupom de desconto</p>
                  <p className="caption normal-case tracking-widest">Insira um código para ganhar desconto</p>
                </div>
              </div>
              <button className="font-mono text-xs uppercase tracking-widest text-neon-purple underline underline-offset-4">
                Adicionar
              </button>
            </section>

            {/* Finalizar */}
            <button
              className="btn-nebula w-full h-14 mt-xl text-base uppercase tracking-widest"
              onClick={() => navigate('/finalizar')}
            >
              Finalizar pedido
              <Icon name="arrow_forward" className="text-[20px]" />
            </button>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
