import { useCurrency } from '@/hooks/useCurrency';
import { parsePriceString } from '@/lib/currency';

interface PriceProps {
  priceString: string;
  fromCurrency?: string;
  className?: string;
  showOriginal?: boolean;
}

export const Price = ({ 
  priceString, 
  fromCurrency = 'USD',
  className = '',
  showOriginal = false 
}: PriceProps) => {
  const { convertPrice, selectedCountry } = useCurrency();
  const { prefix, price, suffix } = parsePriceString(priceString);
  
  const convertedPrice = convertPrice(price, fromCurrency);
  const isConverted = fromCurrency !== selectedCountry.currency;

  return (
    <span className={className}>
      {prefix && `${prefix} `}
      {convertedPrice}
      {suffix && `${suffix}`}
      {showOriginal && isConverted && (
        <span className="text-xs text-muted-foreground ml-1">
          (~{priceString.replace(/^.*?([\d$£€¥₹,]+\.?\d*).*$/, '$1')})
        </span>
      )}
    </span>
  );
};
