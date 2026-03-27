import ProductCard from './ProductCard'

function ProductShowcase({ products, onAddToCart, sectionRef }) {
  return (
    <section ref={sectionRef} className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-12">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-accent">Collector Lineup</p>
          <h2 className="mt-3 text-3xl font-semibold text-zinc-100 sm:text-4xl">Designed for the modern showcase.</h2>
        </div>
        <p className="max-w-md text-sm text-zinc-400">
          Every figurine arrives with numbered authenticity cards, archival packaging, and founder-signed concept notes.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}

export default ProductShowcase
