'use server';

import { signIn, signOut } from '@/utils/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { darajaClient } from './daraja';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      username: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    redirect('/dashboard');
  } catch (error) {
    console.error('Authentication error:', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirect: true });
  redirect('/login');
}

export async function orderAction(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const {
      fullName,
      email,
      address,
      phoneNumber,
      paymentMethod,
      amount,
      shoeRack,
    } = formData;

    const paymentResponse = await darajaClient.sendPaymentRequest({
      phoneNumber,
      amount,
    });

   const orderPromise = fetch('/api/post', {
    method: 'POST', 
    body: {
      fullName,
      email,
      address,
      phoneNumber,
      paymentMethod,
      amount,
      shoeRack,
    }
   })

  } catch (error) {}
}
