import { useState } from 'react';

import { useNotifications } from '@/components/ui/notifications';

import { FormSwapCurrencySchema } from '../types/form-swap-currency';

export const useUpdateCurrency = () => {
  const { addNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateCurrency = async (values: FormSwapCurrencySchema) => {
    console.log(values);
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addNotification({
        title: 'Currency updated successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error updating currency:', error);
      addNotification({
        title: 'Currency updated failed',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    isSubmitting,
    handleUpdateCurrency,
  };
};
