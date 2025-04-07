'use server';

import { signIn, signOut } from '@/utils/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';


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






