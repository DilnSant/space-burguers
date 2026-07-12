import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

/**
 * Barra superior fixa. Se `showBack` for true, exibe botão de voltar;
 * caso contrário, exibe o slot `leading` (ex.: menu) à esquerda.
 */
export default function TopAppBar({ title, showBack = false, trailing = null, leading = null }) {
  const navigate = useNavigate()

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-surface/80 backdrop-blur-md shadow-[0_10px_20px_rgba(0,0,0,0.06)]">
      {showBack ? (
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant/50 transition-colors active:scale-95 duration-100 ease-in-out"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          <Icon name="arrow_back" className="text-primary" />
        </button>
      ) : (
        leading || <div className="w-10 h-10" />
      )}
      <h1 className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight truncate px-2">
        {title}
      </h1>
      {trailing || <div className="w-10 h-10" />}
    </header>
  )
}
