import { auth } from '@/auth';
import { redirect } from 'next/navigation';
// display children when user is logged in 



export default async function ProtectedDisplay({

    failRedirectRoute,
    children,
    
  }: {
   failRedirectRoute: string;
    children: React.ReactNode;

  }) {
    const session = await auth();
  
    if (session?.user) {
      return <>{children}</>;
    } else  {
        redirect(failRedirectRoute); 

  
    }
  }