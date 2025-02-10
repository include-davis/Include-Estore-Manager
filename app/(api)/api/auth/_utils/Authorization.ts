'use server';

import { auth, signIn, signOut } from '@/auth';

export const loginWithCredentials = async (email: string, password: string) => {
  await signIn('credentials', { email, password, redirectTo: '/' });
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/', redirect: true });
};

export const isLoggedIn = async () => {
  const session = await auth();

  if (!session) return false;
  if (!session.user) return false;
  if (!session.user.id) return false;

  return true;
};
