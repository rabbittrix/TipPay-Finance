'use client'

interface CurrencySelectorProps {
  selected: string
  onSelect: (currency: string) => void
}

export default function CurrencySelector({ selected, onSelect }: CurrencySelectorProps) {
  const currencies = ['TipPay CP', 'ECP']

  return (
    <div className="flex space-x-2">
      {currencies.map((currency) => (
        <button
          key={currency}
          onClick={() => onSelect(currency)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === currency
              ? 'bg-gradient-to-r from-tippay-primary to-tippay-accent text-white'
              : 'bg-tippay-light text-tippay-primary hover:bg-tippay-primary/10'
          }`}
        >
          {currency}
        </button>
      ))}
    </div>
  )
} 