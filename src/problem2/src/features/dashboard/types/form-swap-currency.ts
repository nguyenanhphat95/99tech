import { z } from 'zod';

export const formSwapCurrencySchema = z.object({
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

export type FormSwapCurrencySchema = z.infer<typeof formSwapCurrencySchema>;
