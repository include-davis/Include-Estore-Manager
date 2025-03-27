import ProtectedDisplay from '../_components/ProtectedDisplay/ProtectedDisplay';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedDisplay failRedirectRoute="/login">{children}</ProtectedDisplay>
  );
}
