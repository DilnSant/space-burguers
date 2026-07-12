import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useCart } from '../context/CartContext'

const navItems = [
  { to: '/', icon: 'restaurant_menu', label: 'Cardápio' },
  { icon: 'receipt_long', label: 'Pedidos', disabled: true },
  { to: '/carrinho', icon: 'shopping_cart', label: 'Carrinho', showBadge: true },
  { icon: 'person', label: 'Perfil', disabled: true },
]

export default function BottomNav() {
  const { itemCount } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-6 px-2 bg-surface/90 backdrop-blur-lg shadow-[0_-10px_20px_rgba(0,0,0,0.06)] rounded-t-xl border-t border-outline-variant/30 md:hidden">
      {navItems.map((item) =>
        item.disabled ? (
          // Itens fora do escopo (Pedidos/Perfil) — shell visual, sem rota implementada.
          <span
            key={item.label}
            className="flex flex-col items-center justify-center text-on-surface-variant/40 cursor-default select-none"
            aria-disabled="true"
          >
            <Icon name={item.icon} />
            <span className="font-label-md text-label-md">{item.label}</span>
          </span>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center transition-transform duration-200 active:scale-90 ${
                isActive
                  ? 'text-primary bg-primary-container/20 rounded-full px-4 py-1'
                  : 'text-on-surface-variant hover:text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative">
                  <Icon name={item.icon} filled={isActive} />
                  {item.showBadge && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </>
            )}
          </NavLink>
        )
      )}
    </nav>
  )
}
