/**
 * Extract numeric value from price strings like "$89" or "From $156/night"
 */
export const extractPrice = (priceString: string): number => {
  const match = priceString.match(/[\d,]+\.?\d*/);
  if (!match) return 0;
  return parseFloat(match[0].replace(/,/g, ''));
};

/**
 * Parse price range strings like "From $89/night"
 */
export const parsePriceString = (priceString: string): {
  prefix: string;
  price: number;
  suffix: string;
} => {
  const prefixMatch = priceString.match(/^(.*?)[\d$£€¥₹]/);
  const prefix = prefixMatch ? prefixMatch[1].trim() : '';
  
  const suffixMatch = priceString.match(/[\d,]+\.?\d*\s*[^\d\s]*(.*)$/);
  const suffix = suffixMatch && suffixMatch[1] ? suffixMatch[1].trim() : '';
  
  const price = extractPrice(priceString);
  
  return { prefix, price, suffix };
};
