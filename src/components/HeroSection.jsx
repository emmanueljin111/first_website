import { Sparkles } from 'lucide-react'

function HeroSection({ onExplore }) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-16 pt-24 sm:px-10 lg:px-12">
      <p className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-brand-accent">
        <Sparkles size={14} />
        Boutique Creator Series
      </p>
      <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-zinc-100 sm:text-5xl lg:text-6xl">
        I craft statement figurines for collectors who want their shelves to speak before they do.
      </h1>
      <p className="max-w-2xl text-base text-brand-muted sm:text-lg">
        Atelier Figurines merges gallery-grade sculpting with founder-led storytelling—every release is a chapter in a world only true collectors can complete.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={onExplore}
          className="rounded-full bg-brand-accent px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-900 transition hover:-translate-y-0.5 hover:shadow-luxe"
        >
          Explore Collection
        </button>
        <span className="text-sm uppercase tracking-[0.18em] text-zinc-400">New Drop • Spring 2026</span>
      </div>
    </section>
  )
}

export default HeroSection
