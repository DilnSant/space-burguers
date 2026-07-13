import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

/**
 * Barra superior fixa (tema Space Burguer).
 * showBack -> botão voltar à esquerda; senão usa o slot `leading`.
 */
export default function TopAppBar({ title, showBack = false, trailing = null, leading = null, centerLogo = false }) {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-space-900/80 backdrop-blur-md border-b border-space-600/40">
      {showBack ? (
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full text-neon-purple hover:bg-space-700/60 transition-colors active:scale-95"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          <Icon name="chevron_left" className="text-[28px]" />
        </button>
      ) : (
        leading || <div className="w-10 h-10" />
      )}
      {centerLogo ? (
        <img
          src="/images/logo-space.png"
          alt={title || 'Space Burguer'}
          className="h-11 w-11 rounded-full object-cover shadow-glow-purple"
        />
      ) : (
        <h1 className="font-display text-lg font-extrabold uppercase tracking-[0.15em] neon-purple truncate px-2">
          {title}
        </h1>
      )}
      {trailing || <div className="w-10 h-10" />}
    </header>
  )
}
