import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import BottomNav from '../components/BottomNav'
import ProductCard from '../components/ProductCard'
import CompactProductCard from '../components/CompactProductCard'
import FloatingCartButton from '../components/FloatingCartButton'
import { products, categories } from '../data/products'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'

function SectionHeader({ icon, title, trailing }) {
  return (
    <div className="flex items-end justify-between mb-md mt-2xl">
      <h2 className="flex items-center gap-2 font-display text-xl font-extrabold uppercase tracking-wide text-star">
        {icon && <Icon name={icon} className="text-neon-purple" />}
        {title}
      </h2>
      {trailing && <span className="caption">{trailing}</span>}
    </div>
  )
}

export default function MenuPage() {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('orbita')
  const [search, setSearch] = useState('')

  const isSearching = search.trim().length > 0
  const query = search.trim().toLowerCase()

  const searchResults = useMemo(
    () =>
      products.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      ),
    [query]
  )

  const featured = products.find((p) => p.section === 'featured')
  const sideMissions = products.filter((p) => p.section === 'side')
  const orbitMissions = products.filter((p) => p.section === 'orbit')
  const fuel = products.filter((p) => p.section === 'combustivel')

  const show = {
    featured: selectedCategory === 'orbita' || selectedCategory === 'galactica',
    side: selectedCategory === 'orbita' || selectedCategory === 'galactica' || selectedCategory === 'side',
    orbit: selectedCategory === 'orbita' || selectedCategory === 'galactica',
    fuel: selectedCategory === 'orbita' || selectedCategory === 'combustivel',
  }

  return (
    <div className="min-h-screen pb-40">
      {/* Header */}
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
          <span className="font-mono text-[10px] uppercase tracking-widest text-whatsapp">Delivery Aberto</span>
        </div>
      </header>

      <main className="mt-16 px-gutter pt-lg">
        {/* Search */}
        <div className="relative mb-lg">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Icon name="search" className="text-star-faint" />
          </div>
          <input
            className="w-full h-12 rounded-xl border border-space-600/60 bg-space-800/70 pl-12 pr-12 text-body-md text-star placeholder:text-star-faint focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/30"
            placeholder="Encontre sua missão..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute inset-y-0 right-4 flex items-center text-star-faint">
            <Icon name="tune" />
          </div>
        </div>

        {/* Category chips */}
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

        {/* Search results */}
        {isSearching ? (
          <>
            <SectionHeader title="Resultados" />
            {searchResults.length > 0 ? (
              <div className="space-y-md">
                {searchResults.map((p) => (
                  <CompactProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-star-dim">Nenhuma missão encontrada nessa órbita.</p>
            )}
          </>
        ) : (
          <>
            {/* Featured */}
            {show.featured && featured && (
              <section
                className="panel overflow-hidden cursor-pointer mt-lg"
                onClick={() => navigate(`/produto/${featured.id}`)}
              >
                <div className="p-lg">
                  <div className="flex items-center gap-1.5 mb-md">
                    <Icon name="auto_awesome" filled className="text-[16px] text-neon-gold" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-neon-gold">
                      Orbital Masterpiece
                    </span>
                  </div>
                  <span className="caption text-neon-purple">Featured Burguer</span>
                  <h2 className="font-display text-3xl font-extrabold text-star mt-1">{featured.name}</h2>
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
                      <Icon name="rocket_launch" filled className="text-[18px]" />
                      Initiate Mission
                    </button>
                  </div>
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-900/70 to-transparent" />
                </div>
              </section>
            )}

            {/* Side Missions */}
            {show.side && sideMissions.length > 0 && (
              <>
                <SectionHeader icon="auto_awesome_motion" title="Side Missions" trailing="Companions" />
                <div className="space-y-md">
                  {sideMissions.map((p) => (
                    <CompactProductCard key={p.id} product={p} />
                  ))}
                </div>
              </>
            )}

            {/* Orbit Missions */}
            {show.orbit && orbitMissions.length > 0 && (
              <>
                <SectionHeader title="Orbit Missions" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  {orbitMissions.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </>
            )}

            {/* Combustível */}
            {show.fuel && fuel.length > 0 && (
              <>
                <SectionHeader icon="local_bar" title="Combustível" trailing="Bebidas" />
                <div className="space-y-md">
                  {fuel.map((p) => (
                    <CompactProductCard key={p.id} product={p} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <FloatingCartButton />
      <BottomNav />
    </div>
  )
}
