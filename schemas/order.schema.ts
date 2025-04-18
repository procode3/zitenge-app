import { z } from 'zod';

export const orderSchema = z.object({
  fullName: z.string().min(2, { message: 'Enter a valid name' }).max(100),
  phoneNumber: z.string().min(9, { message: 'Invalid phone number' }).max(15),
  email: z.string().email({ message: 'Invalid email address' }),
  address: z.string().min(2, { message: 'Provide a valid address' }),
  paymentMethod: z.string().min(2).max(50),
  notes: z.string().min(0).max(50),
  amount: z
    .number()
    .min(1000, { message: 'Deposit must be a minimum of ksh. 1000' }),
  paymentType: z.string(),
});

export const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .min(13)
    .max(19)
    .regex(/^\d{13,19}$/, 'Invalid card number'),

  cardHolder: z
    .string()
    .min(2, 'Cardholder name too short')
    .max(100, 'Cardholder name too long'),

  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
});
