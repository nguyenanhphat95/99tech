import { useEffect, useState } from 'react';

import { getListCurrency } from '../api/get-list-currency';
import { Currency } from '../types/currency';

export const useFetchCurrency = () => {
  const [listCurrency, setListCurrency] = useState<Currency[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getListCurrency()
      .then((data) => {
        setListCurrency(data);
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  }, []);

  return {
    listCurrency,
    isFetching,
  };
};
