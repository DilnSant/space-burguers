import Icon from './Icon'

/**
 * Seletor de quantidade ("UNITS TO DEPLOY").
 * Pílula escura com botões circulares e número em fonte mono.
 */
export default function QuantitySelector({ value, onDecrement, onIncrement, size = 'md' }) {
  const isSm = size === 'sm'
  const btn = isSm ? 'w-7 h-7' : 'w-9 h-9'
  const num = isSm ? 'text-body-md w-7' : 'text-lg w-10'

  return (
    <div className="flex items-center gap-1 rounded-full border border-space-600/70 bg-space-900/60 p-1">
      <button
        className={`${btn} flex items-center justify-center rounded-full text-star-dim transition-all hover:bg-space-700 hover:text-neon-purple active:scale-90`}
        onClick={onDecrement}
        aria-label="Diminuir quantidade"
      >
        <Icon name="remove" className={isSm ? 'text-[16px]' : ''} />
      </button>
      <span className={`text-center font-mono font-bold text-star ${num}`}>
        {String(value).padStart(2, '0')}
      </span>
      <button
        className={`${btn} flex items-center justify-center rounded-full text-star-dim transition-all hover:bg-space-700 hover:text-neon-purple active:scale-90`}
        onClick={onIncrement}
        aria-label="Aumentar quantidade"
      >
        <Icon name="add" className={isSm ? 'text-[16px]' : ''} />
      </button>
    </div>
  )
}
