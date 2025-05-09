import Sidebar from '@components/Sidebar/Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Sidebar />
      <div style={{ width: '100%' }}>{children}</div>
    </div>
  );
}
