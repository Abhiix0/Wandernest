import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  symbol: string;
}

export const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£' },
  { code: 'EU', name: 'European Union', flag: '🇪🇺', currency: 'EUR', symbol: '€' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', symbol: '¥' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'C$' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', symbol: '¥' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED', symbol: 'د.إ' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'S$' },
];

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  selectedCountry: Country;
  exchangeRates: ExchangeRates;
  isLoading: boolean;
  setSelectedCountry: (country: Country) => void;
  convertPrice: (price: number, fromCurrency?: string) => string;
  formatPrice: (price: number, currency?: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCountry, setSelectedCountryState] = useState<Country>(() => {
    const stored = localStorage.getItem('wandernest_country');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return countries[0];
      }
    }
    return countries[0];
  });

  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        setExchangeRates({
          USD: 1,
          INR: 83,
          GBP: 0.79,
          EUR: 0.92,
          JPY: 149,
          AUD: 1.52,
          CAD: 1.36,
          CNY: 7.24,
          AED: 3.67,
          SGD: 1.34,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 3600000);
    return () => clearInterval(interval);
  }, []);

  const setSelectedCountry = (country: Country) => {
    setSelectedCountryState(country);
    localStorage.setItem('wandernest_country', JSON.stringify(country));
  };

  const convertPrice = (price: number, fromCurrency: string = 'USD'): string => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[selectedCountry.currency]) {
      return formatPrice(price, fromCurrency);
    }

    const usdAmount = price / exchangeRates[fromCurrency];
    const convertedAmount = usdAmount * exchangeRates[selectedCountry.currency];
    
    return formatPrice(convertedAmount, selectedCountry.currency);
  };

  const formatPrice = (price: number, currency: string = selectedCountry.currency): string => {
    const country = countries.find(c => c.currency === currency) || selectedCountry;
    
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: currency === 'JPY' ? 0 : 2,
      maximumFractionDigits: currency === 'JPY' ? 0 : 2,
    }).format(price);

    return `${country.symbol}${formatted}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCountry,
        exchangeRates,
        isLoading,
        setSelectedCountry,
        convertPrice,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
