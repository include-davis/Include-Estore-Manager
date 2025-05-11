import ProtectedDisplay from '../_components/ProtectedDisplay/ProtectedDisplay';
import Sidebar from '@components/Sidebar/Sidebar';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedDisplay failRedirectRoute="/login">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar />
        <div style={{ width: '100%' }}>{children}</div>
      </div>
    </ProtectedDisplay>
  );
}
