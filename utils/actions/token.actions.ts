'use server';

import jwt from 'jsonwebtoken';

const { AUTH_SECRET: JWT_SECRET } = process?.env;

interface Payload {
  orderId: string;
  paymentMethod: string;
  amount: number;
}

export const signAction = async (payload: Payload) => {
  try {
    console.log('JWT signing payload:', JWT_SECRET);
    return jwt.sign(payload, JWT_SECRET as string, { expiresIn: '1h' });
  } catch (error) {
    console.error('JWT signing failed:', error);
    throw new Error('Failed to sign JWT');
  }
};

export const verifyAction = async (token: string): Promise<Payload> => {
  try {
    return jwt.verify(token, JWT_SECRET as string) as Promise<Payload>;
  } catch (error) {
    console.error('JWT verification failed:', error);
    throw new Error('Failed to verify JWT');
  }
};
