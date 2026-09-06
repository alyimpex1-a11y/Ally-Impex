export const formatCurrency = (amount: number, currency: 'USD' | 'EUR' | 'GBP' = 'USD'): string => {
  const rates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
  };

  const curr = rates[currency] || rates.USD;
  const converted = amount * curr.rate;
  return `${curr.symbol}${converted.toFixed(2)}`;
};
