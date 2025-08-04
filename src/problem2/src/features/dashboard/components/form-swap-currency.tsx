import { ShuffleIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';

import { getListCurrency } from '../api/get-list-currency';
import { Currency } from '../types/currency';

import { SelectCurrency } from './select-currency';

const formSwapCurrencySchema = z.object({
  fromToken: z.object({
    currency: z.string().min(1, 'Please select a token'),
    price: z.number().min(0, 'Invalid token price'),
    amount: z.number().min(0),
  }),
  toToken: z.object({
    currency: z.string().min(1, 'Please select a token'),
    price: z.number().min(0, 'Invalid token price'),
    amount: z.number().min(0),
  }),
});

type FormSwapCurrencySchema = z.infer<typeof formSwapCurrencySchema>;

const DEFAULT_FORM_VALUES = {
  fromToken: { currency: '', price: 0, amount: 0 },
  toToken: { currency: '', price: 0, amount: 0 },
};

export const FormSwapCurrency = () => {
  const [listCurrency, setListCurrency] = useState<Currency[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getListCurrency().then((data) => {
      setListCurrency(data);
    });
  }, []);

  const resetData = (form: UseFormReturn<FormSwapCurrencySchema>) => {
    form.setValue('fromToken.amount', 0);
    form.setValue('toToken.amount', 0);
  };

  const handleSubmit = async (
    values: FormSwapCurrencySchema,
    form: UseFormReturn<FormSwapCurrencySchema>,
  ) => {
    console.log(values);
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    resetData(form);
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        schema={formSwapCurrencySchema}
        className="flex justify-center"
        options={{
          defaultValues: DEFAULT_FORM_VALUES,
        }}
      >
        {(form) => (
          <SwapCurrencyContent
            isSubmitting={isSubmitting}
            listCurrency={listCurrency}
            form={form}
          />
        )}
      </Form>
    </div>
  );
};

type SwapCurrencyContentProps = {
  form: UseFormReturn<FormSwapCurrencySchema>;
  listCurrency: Currency[];
  isSubmitting: boolean;
};

export const SwapCurrencyContent = ({
  form,
  listCurrency,
  isSubmitting,
}: SwapCurrencyContentProps) => {
  const { formState, watch, getValues, setValue } = form;

  const fromToken = watch('fromToken');
  const toToken = watch('toToken');

  useEffect(() => {
    if (listCurrency.length > 1) {
      setValue('fromToken.currency', listCurrency[0].currency);
      setValue('fromToken.price', listCurrency[0].price);
      setValue('toToken.currency', listCurrency[1].currency);
      setValue('toToken.price', listCurrency[1].price);
    }
  }, [listCurrency, setValue]);

  const updateAmount = (
    source: 'fromToken' | 'toToken',
    target: 'fromToken' | 'toToken',
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
    (field: 'fromToken' | 'toToken') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const amount = +e.target.value;
      const opposite = field === 'fromToken' ? 'toToken' : 'fromToken';
      updateAmount(field, opposite, amount);
    };

  const handleChangeCurrency =
    (field: 'fromToken' | 'toToken') => (currency: Currency) => {
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
    <div className="relative rounded-xl bg-white p-8 shadow-md sm:w-[80vw] md:w-[30vw]">
      {isSubmitting && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200/50">
          <Spinner className="animate-spin" />
        </div>
      )}

      <h2 className="mb-4 text-center text-2xl font-bold">Currency Swap</h2>
      <div className="flex flex-col gap-[30px]">
        <div className="grid grid-cols-3 gap-4">
          <SelectCurrency
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
