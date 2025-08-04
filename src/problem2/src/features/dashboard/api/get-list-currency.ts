import { api } from '@/lib/api-client';

import { Currency } from '../types/currency';

const formatCurrencies = (currencies: Currency[]): Currency[] => {
  const seen = new Set<string>();
  const result: Currency[] = [];

  for (const c of currencies) {
    if (seen.has(c.currency)) continue;
    if (!c.price) continue;
    seen.add(c.currency);
    result.push(c);
  }

  return result;
};

export const getListCurrency = (): Promise<Currency[]> => {
  return api
    .get<Currency[]>('/prices.json', {
      baseURL: 'https://interview.switcheo.com',
    })
    .then((res) => {
      return formatCurrencies(res.data);
    });
};
