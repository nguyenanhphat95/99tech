import { ShuffleIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';

import { Currency } from '../types/currency';
import { FormSwapCurrencySchema } from '../types/form-swap-currency';

import { SelectCurrency } from './select-currency';

type SwapCurrencyContentProps = {
  form: UseFormReturn<FormSwapCurrencySchema>;
  listCurrency: Currency[];
  isSubmitting: boolean;
  isFetchingCurrencies: boolean;
};

export const SwapCurrencyContent = ({
  form,
  listCurrency,
  isSubmitting,
  isFetchingCurrencies,
}: SwapCurrencyContentProps) => {
  const { formState, watch, getValues, setValue } = form;

  const fromToken = watch('fromToken');
  const toToken = watch('toToken');

  useEffect(() => {
    if (!listCurrency.length) {
      return;
    }

    setValue('fromToken', {
      currency: listCurrency[0].currency,
      price: listCurrency[0].price,
      amount: 0,
    });
    setValue('toToken', {
      currency: listCurrency[1].currency,
      price: listCurrency[1].price,
      amount: 0,
    });
  }, [listCurrency, setValue]);

  const updateAmount = (
    source: keyof FormSwapCurrencySchema,
    target: keyof FormSwapCurrencySchema,
    amount: number,
  ) => {
    const sourcePrice = getValues(`${source}.price`);
    const targetPrice = getValues(`${target}.price`);

    if (!sourcePrice || !targetPrice) {
      return;
    }

    const exchangeRate = sourcePrice / targetPrice || 0;
    const convertedAmount = +(amount * exchangeRate).toFixed(2);

    setValue(`${source}.amount`, amount);
    setValue(`${target}.amount`, convertedAmount);
  };

  const handleChangeAmount =
    (field: keyof FormSwapCurrencySchema) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const amount = +e.target.value;
      const opposite = field === 'fromToken' ? 'toToken' : 'fromToken';
      updateAmount(field, opposite, amount);
    };

  const handleChangeCurrency =
    (field: keyof FormSwapCurrencySchema) => (currency: Currency) => {
      const amount = getValues(`${field}.amount`) || 0;

      setValue(field, {
        currency: currency.currency,
        price: currency.price,
        amount,
      });
      const opposite = field === 'fromToken' ? 'toToken' : 'fromToken';
      updateAmount(field, opposite, amount);
    };

  const handleSwapToken = () => {
    form.setValue('fromToken', {
      ...toToken,
      amount: fromToken.amount,
    });
    form.setValue('toToken', {
      ...fromToken,
      amount: toToken.amount,
    });
    updateAmount('fromToken', 'toToken', fromToken.amount);
  };

  return (
    <div className="relative rounded-xl bg-white p-8 shadow-md sm:w-[80vw] md:w-[40vw] lg:w-[30vw]">
      {isSubmitting && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200/50">
          <Spinner className="animate-spin" />
        </div>
      )}

      <h2 className="mb-4 text-center text-2xl font-bold">Currency Swap</h2>
      <div className="flex flex-col gap-[30px]">
        <div className="grid grid-cols-3 gap-4">
          <SelectCurrency
            isFetching={isFetchingCurrencies}
            options={listCurrency}
            label="From Token"
            value={fromToken?.currency}
            error={formState.errors.fromToken?.currency}
            onChange={handleChangeCurrency('fromToken')}
          />
          <div className="col-span-2">
            <Input
              type="number"
              label="Amount"
              value={fromToken?.amount}
              error={formState.errors.fromToken?.amount}
              onChange={handleChangeAmount('fromToken')}
            />
          </div>
        </div>

        <div>
          <Button
            type="button"
            disabled={!fromToken.amount || !toToken.amount}
            variant="outline"
            icon={<ShuffleIcon />}
            onClick={handleSwapToken}
          >
            Swap
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <SelectCurrency
            isFetching={isFetchingCurrencies}
            options={listCurrency}
            label="To Token"
            value={toToken?.currency}
            error={formState.errors.toToken?.currency}
            onChange={handleChangeCurrency('toToken')}
          />
          <div className="col-span-2">
            <Input
              type="number"
              label="Amount"
              value={toToken?.amount}
              error={formState.errors.toToken?.amount}
              onChange={handleChangeAmount('toToken')}
            />
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </div>
  );
};
