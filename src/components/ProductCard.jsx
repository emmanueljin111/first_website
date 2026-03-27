function ProductCard({ product, onAddToCart }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-brand-panel transition duration-300 hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-luxe">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-4 top-4 rounded-full bg-zinc-900/80 px-3 py-1 text-xs uppercase tracking-[0.15em] text-zinc-100 backdrop-blur">
          {product.edition}
        </span>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-medium text-zinc-100">{product.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-brand-accent">${product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="rounded-full border border-brand-accent/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent transition hover:bg-brand-accent hover:text-zinc-900"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
