'use server';

import { signupAllowed } from '@actions/Authorization';

import Signup from './Signup';
import { redirect, RedirectType } from 'next/navigation';

const SignUpWrapper = async () => {
  const isAllowed = await signupAllowed();

  if (!isAllowed) redirect('/login', RedirectType.push);

  return <Signup />;
};

export default SignUpWrapper;
