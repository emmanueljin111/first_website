export const customerPortalData = {
  customer: {
    firstName: 'Emmanuel',
    lastName: 'Jin',
    email: 'emmanuel@example.com',
    memberSince: '2025-09-14'
  },
  loyalty: {
    pointsBalance: 146,
    eurosSpent: 146,
    nextRewardAt: 200,
    rewardLabel: '200 points = bon de reduction de 20 EUR',
    ruleLabel: '1 EUR depense = 1 point de fidelite'
  },
  orders: [
    {
      id: 'CMD-2026-001',
      placedAt: '2026-03-18',
      status: 'En cours de livraison',
      total: 249,
      invoiceNumber: 'FAC-2026-001',
      items: [
        { name: 'Aurora Sentinel', quantity: 1 }
      ]
    },
    {
      id: 'CMD-2026-002',
      placedAt: '2026-03-10',
      status: 'Expedie',
      total: 329,
      invoiceNumber: 'FAC-2026-002',
      items: [
        { name: 'The Crownless King', quantity: 1 }
      ]
    },
    {
      id: 'CMD-2026-003',
      placedAt: '2026-02-26',
      status: 'Livre',
      total: 468,
      invoiceNumber: 'FAC-2026-003',
      items: [
        { name: 'Obsidian Monk', quantity: 1 },
        { name: 'Neon Kitsune', quantity: 1 }
      ]
    }
  ],
  loyaltyHistory: [
    {
      id: 'LOY-1001',
      date: '2026-03-18',
      label: 'Points gagnes sur CMD-2026-001',
      change: 249,
      type: 'credit'
    },
    {
      id: 'LOY-1002',
      date: '2026-03-02',
      label: 'Bon de reduction anniversaire',
      change: -100,
      type: 'debit'
    },
    {
      id: 'LOY-1003',
      date: '2026-02-26',
      label: 'Points gagnes sur CMD-2026-003',
      change: 468,
      type: 'credit'
    }
  ]
}
