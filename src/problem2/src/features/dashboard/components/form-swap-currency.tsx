import { UseFormReturn } from 'react-hook-form';

import { Form } from '@/components/ui/form';

import { useFetchCurrency } from '../hooks/use-fetch-currency';
import { useUpdateCurrency } from '../hooks/use-update-currency';
import {
  formSwapCurrencySchema,
  FormSwapCurrencySchema,
} from '../types/form-swap-currency';

import { SwapCurrencyContent } from './swap-currency-content';

const DEFAULT_FORM_VALUES = {
  fromToken: { currency: '', price: 0, amount: 0 },
  toToken: { currency: '', price: 0, amount: 0 },
};

export const FormSwapCurrency = () => {
  const { listCurrency, isFetching } = useFetchCurrency();
  const { isSubmitting, handleUpdateCurrency } = useUpdateCurrency();

  const resetData = (form: UseFormReturn<FormSwapCurrencySchema>) => {
    form.setValue('fromToken.amount', 0);
    form.setValue('toToken.amount', 0);
  };

  const handleSubmit = async (
    values: FormSwapCurrencySchema,
    form: UseFormReturn<FormSwapCurrencySchema>,
  ) => {
    await handleUpdateCurrency(values);
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
            isFetchingCurrencies={isFetching}
            isSubmitting={isSubmitting}
            listCurrency={listCurrency}
            form={form}
          />
        )}
      </Form>
    </div>
  );
};
