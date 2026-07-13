import { NavLink } from 'react-router-dom'
import Icon from './Icon'
import { useCart } from '../context/CartContext'

// Navegação da nave: Missions (cardápio) · Launch Log · Hangar (carrinho) · Astronaut
const navItems = [
  { to: '/', icon: 'restaurant', label: 'Missions' },
  { icon: 'assignment', label: 'Launch Log', disabled: true },
  { to: '/carrinho', icon: 'shopping_cart', label: 'Hangar', showBadge: true },
  { icon: 'person', label: 'Astronaut', disabled: true },
]

export default function BottomNav() {
  const { itemCount } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-6 px-2 bg-space-900/90 backdrop-blur-lg border-t border-space-600/40 md:hidden">
      {navItems.map((item) =>
        item.disabled ? (
          // Itens fora do escopo (shell visual, sem rota implementada).
          <span
            key={item.label}
            className="flex flex-col items-center justify-center gap-0.5 text-star-faint/60 cursor-default select-none"
            aria-disabled="true"
          >
            <Icon name={item.icon} />
            <span className="font-mono text-[10px] uppercase tracking-wider">{item.label}</span>
          </span>
        ) : (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-0.5 transition-transform duration-200 active:scale-90 ${
                isActive ? 'neon-purple' : 'text-star-faint hover:text-neon-purple'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative">
                  <Icon name={item.icon} filled={isActive} />
                  {item.showBadge && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 bg-neon-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider">{item.label}</span>
              </>
            )}
          </NavLink>
        )
      )}
    </nav>
  )
}
