'use server';

import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

const { AUTH_SECRET: JWT_SECRET } = process?.env;
if (!JWT_SECRET) throw new Error('AUTH_SECRET env variable not set');

interface Payload {
  orderId: string;
  paymentMethod: string;
  amount: number;
}

const getSecret = () => new TextEncoder().encode(JWT_SECRET);

export const signAction = async (payload: Payload) => {
  try {
    const secret = getSecret();
    return await new SignJWT(payload as unknown as JWTPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secret);
  } catch (error) {
    console.error('JWT signing failed:', error);
    throw new Error('Failed to sign JWT');
  }
};

export const verifyAction = async (token: string): Promise<Payload> => {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as Payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    throw new Error('Failed to verify JWT');
  }
};
