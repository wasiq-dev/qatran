import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const currencies = {
  PKR: { symbol: 'PKR', rate: 1, label: 'Pakistan (PKR)' },
  USD: { symbol: '$', rate: 0.0036, label: 'USA (USD)' },
  GBP: { symbol: '£', rate: 0.0028, label: 'UK (GBP)' },
  EUR: { symbol: '€', rate: 0.0033, label: 'Europe (EUR)' },
  AED: { symbol: 'DH', rate: 0.013, label: 'UAE (AED)' },
  SAR: { symbol: 'SR', rate: 0.0134, label: 'Saudi Arabia (SAR)' },
  QAR: { symbol: 'QR', rate: 0.0136, label: 'Qatar (QAR)' },
  KWD: { symbol: 'KD', rate: 0.0011, label: 'Kuwait (KWD)' },
  BHD: { symbol: 'BD', rate: 0.0014, label: 'Bahrain (BHD)' },
  OMR: { symbol: 'RO', rate: 0.0037, label: 'Oman (OMR)' },
  JOD: { symbol: 'JD', rate: 0.0051, label: 'Jordan (JOD)' },
  LBP: { symbol: 'LL', rate: 0.000024, label: 'Lebanon (LBP)' },
  ILS: { symbol: '₪', rate: 0.013, label: 'Israel (ILS)' },
  TRY: { symbol: '₺', rate: 0.11, label: 'Turkey (TRY)' },
  IQD: { symbol: 'د.ع', rate: 4.8, label: 'Iraq (IQD)' },
  YER: { symbol: '﷼', rate: 0.009, label: 'Yemen (YER)' },
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
