import { useMemo, useState } from 'react'
import { Award, FileText, KeyRound, LogIn, Package, ShieldCheck, UserPlus } from 'lucide-react'
import { customerPortalData } from '../customerPortalData'
import { formatCurrency } from '../utils/formatCurrency'

const tabs = [
  { id: 'overview', label: 'Dashboard', icon: ShieldCheck },
  { id: 'orders', label: 'Mes commandes', icon: Package },
  { id: 'loyalty', label: 'Fidelite', icon: Award },
  { id: 'auth', label: 'Connexion', icon: LogIn }
]

const statusStyles = {
  'En preparation': 'bg-amber-100 text-amber-700',
  Expedie: 'bg-sky-100 text-sky-700',
  'En cours de livraison': 'bg-violet-100 text-violet-700',
  Livre: 'bg-emerald-100 text-emerald-700'
}

function formatDate(value) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value))
}

function CustomerPortalSection({ sectionRef }) {
  const [activeTab, setActiveTab] = useState('overview')
  const { customer, loyalty, orders, loyaltyHistory } = customerPortalData

  const progressPercent = Math.min(
    100,
    Math.round((loyalty.pointsBalance / loyalty.nextRewardAt) * 100)
  )

  const totalOrders = orders.length
  const deliveredOrders = orders.filter((order) => order.status === 'Livre').length
  const totalSpent = useMemo(
    () => orders.reduce((sum, order) => sum + order.total, 0),
    [orders]
  )

  return (
    <section ref={sectionRef} className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-12">
      <div className="rounded-[2rem] border border-zinc-800 bg-brand-panel p-6 shadow-luxe sm:p-8">
        <div className="flex flex-col gap-6 border-b border-zinc-800 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-accent">Espace Client</p>
            <h2 className="max-w-3xl text-3xl font-semibold text-zinc-100 sm:text-4xl">
              Un tableau de bord e-commerce pret pour l authentification, le suivi des commandes et la fidelite.
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Cette section sert de base frontend pour brancher un vrai backend client avec inscription,
              connexion, recuperation de mot de passe, historique d achats, statuts logistiques et points.
            </p>
          </div>

          <div className="rounded-2xl border border-brand-accent/30 bg-brand-accent/10 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-accent">Regle fidelite</p>
            <p className="mt-2 text-sm font-medium text-zinc-100">{loyalty.ruleLabel}</p>
            <p className="mt-1 text-sm text-zinc-400">{loyalty.rewardLabel}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? 'border-brand-accent/40 bg-brand-accent/10 text-zinc-100'
                      : 'border-zinc-800 text-zinc-400 hover:border-brand-accent/20 hover:text-zinc-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </aside>

          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-800 p-5">
                    <p className="text-sm text-zinc-400">Client connecte</p>
                    <p className="mt-2 text-xl font-semibold text-zinc-100">
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">{customer.email}</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 p-5">
                    <p className="text-sm text-zinc-400">Commandes</p>
                    <p className="mt-2 text-xl font-semibold text-zinc-100">{totalOrders}</p>
                    <p className="mt-1 text-sm text-zinc-500">{deliveredOrders} deja livrees</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 p-5">
                    <p className="text-sm text-zinc-400">Montant depense</p>
                    <p className="mt-2 text-xl font-semibold text-zinc-100">{formatCurrency(totalSpent)}</p>
                    <p className="mt-1 text-sm text-zinc-500">Base de calcul des points</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-brand-accent">Programme fidelite</p>
                      <h3 className="mt-2 text-2xl font-semibold text-zinc-100">
                        {loyalty.pointsBalance} points disponibles
                      </h3>
                      <p className="mt-2 text-sm text-zinc-400">{loyalty.rewardLabel}</p>
                    </div>
                    <div className="rounded-2xl bg-zinc-950 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Prochaine recompense</p>
                      <p className="mt-2 text-lg font-semibold text-zinc-100">
                        {loyalty.nextRewardAt - loyalty.pointsBalance} points restants
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-brand-accent transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.map((order) => (
                  <article key={order.id} className="rounded-3xl border border-zinc-800 p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold text-zinc-100">{order.id}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[order.status] || 'bg-zinc-200 text-zinc-700'}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-zinc-400">
                          Commande passee le {formatDate(order.placedAt)}
                        </p>
                        <div className="mt-4 space-y-2 text-sm text-zinc-300">
                          {order.items.map((item) => (
                            <p key={`${order.id}-${item.name}`}>
                              {item.quantity} x {item.name}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="min-w-[220px] rounded-2xl bg-zinc-950 p-4">
                        <p className="text-sm text-zinc-400">Total</p>
                        <p className="mt-1 text-xl font-semibold text-zinc-100">{formatCurrency(order.total)}</p>
                        <p className="mt-3 text-sm text-zinc-500">Facture {order.invoiceNumber}</p>
                        <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent transition hover:bg-brand-accent hover:text-zinc-900">
                          <FileText size={14} />
                          Telecharger le PDF
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="rounded-3xl border border-zinc-800 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-brand-accent">Historique des points</p>
                      <h3 className="mt-2 text-2xl font-semibold text-zinc-100">Mouvements fidelite</h3>
                    </div>
                    <Award className="text-brand-accent" size={22} />
                  </div>

                  <div className="mt-6 space-y-4">
                    {loyaltyHistory.map((entry) => (
                      <div key={entry.id} className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-800 p-4">
                        <div>
                          <p className="font-medium text-zinc-100">{entry.label}</p>
                          <p className="mt-1 text-sm text-zinc-500">{formatDate(entry.date)}</p>
                        </div>
                        <p className={`text-sm font-semibold ${entry.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {entry.type === 'credit' ? '+' : '-'}
                          {Math.abs(entry.change)} pts
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-accent">Regles</p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-100">Attribution et recompense</h3>
                  <div className="mt-5 space-y-4 text-sm text-zinc-300">
                    <p>{loyalty.ruleLabel}</p>
                    <p>{loyalty.rewardLabel}</p>
                    <p>
                      Suggestion backend: crediter les points a chaque commande payee, puis les debiter
                      seulement quand un coupon est effectivement consomme.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'auth' && (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-zinc-800 p-6">
                  <div className="flex items-center gap-3">
                    <LogIn className="text-brand-accent" size={20} />
                    <h3 className="text-2xl font-semibold text-zinc-100">Connexion</h3>
                  </div>
                  <div className="mt-6 space-y-4">
                    <label className="block">
                      <span className="mb-2 block text-sm text-zinc-400">Email</span>
                      <input
                        type="email"
                        placeholder="client@exemple.com"
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-brand-accent"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-zinc-400">Mot de passe</span>
                      <input
                        type="password"
                        placeholder="Votre mot de passe"
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-brand-accent"
                      />
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <button className="rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-900 transition hover:brightness-110">
                        Se connecter
                      </button>
                      <button className="rounded-full border border-zinc-700 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-200 transition hover:border-brand-accent/60 hover:text-brand-accent">
                        Continuer avec Google
                      </button>
                      <button className="rounded-full border border-zinc-700 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-200 transition hover:border-brand-accent/60 hover:text-brand-accent">
                        Continuer avec Apple
                      </button>
                    </div>
                    <button className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-brand-accent">
                      <KeyRound size={14} />
                      Mot de passe oublie
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 p-6">
                  <div className="flex items-center gap-3">
                    <UserPlus className="text-brand-accent" size={20} />
                    <h3 className="text-2xl font-semibold text-zinc-100">Inscription</h3>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm text-zinc-400">Prenom</span>
                      <input
                        type="text"
                        placeholder="Emmanuel"
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-brand-accent"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-zinc-400">Nom</span>
                      <input
                        type="text"
                        placeholder="Jin"
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-brand-accent"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-sm text-zinc-400">Email</span>
                      <input
                        type="email"
                        placeholder="client@exemple.com"
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-brand-accent"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-sm text-zinc-400">Mot de passe</span>
                      <input
                        type="password"
                        placeholder="Choisissez un mot de passe"
                        className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-brand-accent"
                      />
                    </label>
                  </div>
                  <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-900 transition hover:brightness-110">
                    <UserPlus size={16} />
                    Creer mon compte
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerPortalSection
