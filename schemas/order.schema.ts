import { z } from 'zod';

export const orderSchema = z.object({
  fullName: z.string().min(2).max(50),
  phoneNumber: z.string().min(9).max(15),
  email: z.string().email({ message: 'Invalid email address' }),
  address: z.string().min(2).max(50),
  paymentMethod: z.string().min(2).max(50),
});
