import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { DELIVERY_FEE } from '../config'

const CartContext = createContext(null)
const STORAGE_KEY = 'spaceburguer.cart'

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore corrupt storage
  }
  return { items: [] }
}

function makeLineId(productId, addons, notes) {
  const addonsKey = (addons || [])
    .map((a) => a.id)
    .sort()
    .join('+')
  return `${productId}::${addonsKey}::${(notes || '').trim()}`
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, qty, addons, notes } = action.payload
      const lineId = makeLineId(product.id, addons, notes)
      const unitPrice = product.price + (addons || []).reduce((sum, a) => sum + a.price, 0)
      const existing = state.items.find((i) => i.lineId === lineId)

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) => (i.lineId === lineId ? { ...i, qty: i.qty + qty } : i)),
        }
      }

      const newItem = {
        lineId,
        productId: product.id,
        name: product.name,
        image: product.image,
        unitPrice,
        addons: addons || [],
        notes: notes || '',
        qty,
      }
      return { ...state, items: [...state.items, newItem] }
    }
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((i) => (i.lineId === action.payload.lineId ? { ...i, qty: i.qty + 1 } : i)),
      }
    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map((i) => (i.lineId === action.payload.lineId ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.lineId !== action.payload.lineId) }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const value = useMemo(() => {
    const items = state.items
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0)
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0)

    return {
      items,
      itemCount,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      addItem: (product, qty, addons, notes) => dispatch({ type: 'ADD_ITEM', payload: { product, qty, addons, notes } }),
      increment: (lineId) => dispatch({ type: 'INCREMENT', payload: { lineId } }),
      decrement: (lineId) => dispatch({ type: 'DECREMENT', payload: { lineId } }),
      removeItem: (lineId) => dispatch({ type: 'REMOVE_ITEM', payload: { lineId } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de um CartProvider')
  return ctx
}
