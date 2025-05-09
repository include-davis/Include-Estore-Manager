'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';

interface ProtectedDisplayProps {
  failRedirectRoute: string;
  children: React.ReactNode;
}

/**
 * Display children when user is logged in.
 *
 * ! - Important: This component's parents must only be server components.
 */
export default async function ProtectedDisplay(props: ProtectedDisplayProps) {
  const session = await auth();

  if (session?.user) {
    return <>{props.children}</>;
  } else {
    redirect(props.failRedirectRoute);
  }
}
