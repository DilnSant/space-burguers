import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import TopAppBar from '../components/TopAppBar'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import CompactProductCard from '../components/CompactProductCard'
import FloatingCartButton from '../components/FloatingCartButton'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'

const sectionTitles = {
  lanches: 'Os Favoritos da Galera',
  porcoes: 'Porções pra Compartilhar',
  bebidas: 'Bebidas Geladas',
  sobremesas: 'Doces Tentações',
}

export default function MenuPage() {
  const navigate = useNavigate()
  const { itemCount } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('lanches')
  const [search, setSearch] = useState('')

  const isSearching = search.trim().length > 0

  const mainList = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (isSearching) {
      return products.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      )
    }
    return products.filter((p) => p.category === selectedCategory)
  }, [search, selectedCategory, isSearching])

  const beverages = products.filter((p) => p.category === 'bebidas')
  const showBeverageSection = !isSearching && selectedCategory !== 'bebidas'

  return (
    <div className="bg-background text-on-surface font-body-md antialiased pb-32 min-h-screen">
      <TopAppBar
        title="SaltySnack"
        leading={
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant/50 transition-colors text-primary active:scale-95 duration-100 ease-in-out">
            <Icon name="menu" />
          </button>
        }
        trailing={
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant/50 transition-colors text-primary active:scale-95 duration-100 ease-in-out relative"
            onClick={() => navigate('/carrinho')}
            aria-label="Ver carrinho"
          >
            <Icon name="shopping_basket" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        }
      />

      <main className="mt-16 px-gutter pt-lg">
        {/* Search Bar */}
        <div className="relative mb-lg">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Icon name="search" className="text-outline" />
          </div>
          <input
            className="w-full h-12 bg-surface-container-low border-none rounded-xl pl-12 pr-4 text-body-md focus:ring-2 focus:ring-primary shadow-sm"
            placeholder="O que você quer comer hoje?"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-xs overflow-x-auto hide-scrollbar -mx-gutter px-gutter mb-2xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`flex-shrink-0 px-lg py-2 rounded-full font-label-lg shadow-sm transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant/50'
              }`}
              onClick={() => {
                setSelectedCategory(cat.id)
                setSearch('')
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="mb-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {isSearching ? 'Resultados da busca' : sectionTitles[selectedCategory]}
          </h2>
        </div>

        {/* Product Grid */}
        {mainList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {mainList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-on-surface-variant font-body-md">Nenhum item encontrado.</p>
        )}

        {/* Section 2: Bebidas */}
        {showBeverageSection && (
          <>
            <div className="mt-2xl mb-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface">Bebidas Geladas</h2>
            </div>
            <div className="grid grid-cols-2 gap-md mb-xl">
              {beverages.map((product) => (
                <CompactProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      <FloatingCartButton />
      <BottomNav />
    </div>
  )
}
