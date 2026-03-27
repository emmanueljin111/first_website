import { Minus, Plus, ShoppingBag, X } from 'lucide-react'

function MiniCart({ isOpen, items, onClose, onIncrement, onDecrement, onRemove }) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/70 transition ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-zinc-950 p-6 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mini cart"
      >
        <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-100">
            <ShoppingBag size={18} />
            Your Collection
          </h2>
          <button onClick={onClose} className="rounded-full p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <p className="pt-12 text-center text-sm text-zinc-500">No pieces selected yet.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-zinc-800 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-zinc-100">{item.name}</h3>
                    <p className="text-sm text-brand-accent">${item.price}</p>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-xs uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-200">
                    Remove
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button onClick={() => onDecrement(item.id)} className="rounded-full border border-zinc-700 p-1.5 text-zinc-300 hover:border-zinc-500">
                    <Minus size={14} />
                  </button>
                  <span className="min-w-7 text-center text-sm text-zinc-100">{item.quantity}</span>
                  <button onClick={() => onIncrement(item.id)} className="rounded-full border border-zinc-700 p-1.5 text-zinc-300 hover:border-zinc-500">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 space-y-4 border-t border-zinc-800 pt-5">
          <div className="flex items-center justify-between text-sm text-zinc-300">
            <span>Subtotal</span>
            <span className="text-lg font-semibold text-brand-accent">${subtotal}</span>
          </div>
          <button className="w-full rounded-full bg-brand-accent py-3 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-900 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40" disabled={items.length === 0}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}

export default MiniCart
