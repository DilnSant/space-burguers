import Icon from './Icon'

export default function QuantitySelector({ value, onDecrement, onIncrement, size = 'md', highlightIncrement = true }) {
  const isSm = size === 'sm'
  const btnSize = isSm ? 'w-8 h-8' : 'w-10 h-10'
  const textSize = isSm ? 'font-label-lg w-4' : 'font-headline-md text-headline-md w-10'
  const incrementClasses = highlightIncrement
    ? 'bg-secondary-container text-on-secondary-container'
    : 'bg-surface-container-lowest text-secondary-container'

  return (
    <div className={`flex items-center bg-surface-variant rounded-full ${isSm ? 'gap-sm px-xs py-xs' : 'p-1.5 shadow-inner'}`}>
      <button
        className={`${btnSize} rounded-full flex items-center justify-center bg-surface-container-lowest text-secondary-container transition-transform active:scale-90`}
        onClick={onDecrement}
        aria-label="Diminuir quantidade"
      >
        <Icon name="remove" className="font-bold" />
      </button>
      <span className={`text-center text-on-surface ${textSize}`}>{value}</span>
      <button
        className={`${btnSize} rounded-full flex items-center justify-center ${incrementClasses} transition-transform active:scale-90`}
        onClick={onIncrement}
        aria-label="Aumentar quantidade"
      >
        <Icon name="add" className="font-bold" />
      </button>
    </div>
  )
}
