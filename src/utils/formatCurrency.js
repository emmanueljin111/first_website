const euroFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0
})

export function formatCurrency(value) {
  return euroFormatter.format(value)
}
