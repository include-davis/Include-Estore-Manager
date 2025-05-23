'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signupAllowed } from '@actions/Authorization';
import Signup from './Signup';

export default function SignupPage() {
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSignupAllowed = async () => {
      const allowed = await signupAllowed();
      setIsAllowed(allowed);
      setIsLoading(false);
    };

    checkSignupAllowed();
  }, []);

  if (isLoading) return <div>Loading...</div>; // TODO: Probably make this look nicer.
  if (!isAllowed) router.push('/login');

  return <Signup />;
}
