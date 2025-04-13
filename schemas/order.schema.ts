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
