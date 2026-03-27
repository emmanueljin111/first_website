import { useMemo, useRef, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import HeroSection from './components/HeroSection'
import ProductShowcase from './components/ProductShowcase'
import FoundersTouch from './components/FoundersTouch'
import MiniCart from './components/MiniCart'
import { figurines } from './MockData'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const productsRef = useRef(null)

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const incrementItem = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decrementItem = (id) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-brand-background text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Atelier Figurines</p>
            <p className="text-lg font-medium text-zinc-100">Founder Series Store</p>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-full border border-zinc-700 p-3 text-zinc-200 transition hover:border-brand-accent/60 hover:text-brand-accent"
            aria-label="Open cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-accent px-1 text-xs font-semibold text-zinc-900">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main>
        <HeroSection onExplore={scrollToProducts} />
        <ProductShowcase products={figurines} onAddToCart={addToCart} sectionRef={productsRef} />
        <FoundersTouch />
      </main>

      <MiniCart
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
      />
    </div>
  )
}

export default App
