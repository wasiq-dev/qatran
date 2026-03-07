import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const currencies = {
  PKR: { symbol: 'PKR', rate: 1, label: 'Pakistan (PKR)' },
  USD: { symbol: '$', rate: 0.0036, label: 'USA (USD)' },
  GBP: { symbol: '£', rate: 0.0028, label: 'UK (GBP)' },
  EUR: { symbol: '€', rate: 0.0033, label: 'Europe (EUR)' },
  AED: { symbol: 'DH', rate: 0.013, label: 'UAE (AED)' },
};

const useCurrencyStore = create(
  persist(
    (set, get) => ({
      currentCurrency: 'PKR',
      currencies,
      
      setCurrency: (code) => {
        if (currencies[code]) {
          set({ currentCurrency: code });
        }
      },

      formatPrice: (pkrAmount) => {
        const { currentCurrency } = get();
        const currency = currencies[currentCurrency];
        const converted = (pkrAmount / 100) * currency.rate; // Assuming pkrAmount is in paisas
        
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currentCurrency === 'PKR' ? 'PKR' : currentCurrency,
          currencyDisplay: 'symbol',
          minimumFractionDigits: currentCurrency === 'PKR' ? 0 : 2,
        }).format(converted);
      }
    }),
    {
      name: 'toliya-currency-storage',
    }
  )
);

export default useCurrencyStore;
