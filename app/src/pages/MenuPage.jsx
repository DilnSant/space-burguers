import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import FloatingCartButton from '../components/FloatingCartButton'
import { products, categories } from '../data/products'
import { formatPrice } from '../utils/format'

export default function MenuPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('lanches')
  const [search, setSearch] = useState('')

  const isSearching = search.trim().length > 0
  const query = search.trim().toLowerCase()

  const visibleProducts = useMemo(() => {
    if (isSearching) {
      return products.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      )
    }
    return products.filter((p) => p.category === selectedCategory)
  }, [isSearching, query, selectedCategory])

  // Destaque só aparece na aba Lanches (e fora da busca); os demais vão para a grade.
  const featured = !isSearching && selectedCategory === 'lanches' ? products.find((p) => p.featured) : null
  const gridProducts = featured ? visibleProducts.filter((p) => p.id !== featured.id) : visibleProducts

  return (
    <div className="min-h-screen pb-40">
      {/* Cabeçalho */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-space-900/80 backdrop-blur-md border-b border-space-600/40">
        <div className="flex items-center gap-2.5">
          <img
            src="/images/logo-space.png"
            alt="Space Burguer"
            className="h-10 w-10 rounded-full object-cover shadow-glow-purple"
          />
          <div className="leading-none">
            <h1 className="font-display text-base font-extrabold uppercase tracking-widest neon-purple">
              Space Burguer
            </h1>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-star-faint">
              Sabor que te leva para outra galáxia
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-whatsapp/40 bg-whatsapp/10 px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-whatsapp animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-whatsapp">Aberto agora</span>
        </div>
      </header>

      <main className="mt-16 px-gutter pt-lg">
        {/* Busca */}
        <div className="relative mb-lg">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Icon name="search" className="text-star-faint" />
          </div>
          <input
            className="w-full h-12 rounded-xl border border-space-600/60 bg-space-800/70 pl-12 pr-4 text-body-md text-star placeholder:text-star-faint focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/30"
            placeholder="Buscar no cardápio..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Abas de categorias */}
        <div className="flex gap-xs overflow-x-auto hide-scrollbar -mx-gutter px-gutter mb-lg">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`flex-shrink-0 px-lg py-2 rounded-full font-heading text-sm font-semibold transition-all ${
                selectedCategory === cat.id && !isSearching
                  ? 'bg-nebula text-white shadow-nebula'
                  : 'border border-space-600/60 bg-space-800/60 text-star-dim hover:text-star'
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

        {isSearching && (
          <h2 className="font-heading text-lg font-bold text-star mb-md">
            Resultados para “{search.trim()}”
          </h2>
        )}

        {/* Destaque */}
        {featured && (
          <section
            className="panel overflow-hidden cursor-pointer mb-lg"
            onClick={() => navigate(`/produto/${featured.id}`)}
          >
            <div className="p-lg">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-gold/15 px-2.5 py-1 mb-md">
                <Icon name="auto_awesome" filled className="text-[14px] text-neon-gold" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neon-gold">Destaque</span>
              </span>
              <h2 className="font-display text-3xl font-extrabold text-star">{featured.name}</h2>
              <p className="mt-2 text-sm text-star-dim">{featured.description}</p>
              <div className="mt-lg flex items-center gap-md">
                <span className="font-display text-3xl font-extrabold text-neon-pink whitespace-nowrap">
                  {formatPrice(featured.price)}
                </span>
                <button
                  className="btn-nebula flex-1 h-12 px-lg text-sm uppercase tracking-widest"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/produto/${featured.id}`)
                  }}
                >
                  <Icon name="add" className="text-[18px]" />
                  Adicionar
                </button>
              </div>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-space-900/70 to-transparent" />
            </div>
          </section>
        )}

        {/* Grade de produtos */}
        {gridProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {gridProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          !featured && (
            <div className="flex flex-col items-center justify-center py-2xl text-center">
              <Icon name="restaurant" className="text-[56px] text-space-500 mb-md" />
              <p className="text-star-dim">
                {isSearching ? 'Nenhum item encontrado.' : 'Em breve, novos itens nesta categoria. 🚀'}
              </p>
            </div>
          )
        )}
      </main>

      <FloatingCartButton />
      <BottomNav />
    </div>
  )
}
