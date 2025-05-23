'use server';

import { auth, Credentials, signIn, signOut } from '@/auth';
import InvalidLoginError from '@error/auth/InvalidLoginError';
import prisma from '@datalib/_prisma/client';

interface LoginResponse {
  message: string;
  isError?: boolean;
}

export const loginWithCredentials = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    return { message: response };
  } catch (error) {
    if (error instanceof InvalidLoginError)
      return { message: error.code, isError: true };

    return {
      message: (error as Error).message,
      isError: true,
    };
  }
};

export const signupWithCredentials = async (
  credentials: Credentials
): Promise<LoginResponse> => {
  try {
    const response = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    return { message: response };
  } catch (error) {
    if (error instanceof InvalidLoginError)
      return { message: error.code, isError: true };

    return {
      message: (error as Error).message,
      isError: true,
    };
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/', redirect: true });
};

export const signupAllowed = async () => {
  return (await prisma.user.count()) === 0;
};

export const isLoggedIn = async () => {
  const session = await auth();

  if (!session) return false;
  if (!session.user) return false;
  if (!session.user.id) return false;

  return true;
};
