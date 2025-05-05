import '@globals/styles/colors.scss';
import '@globals/styles/spacers.scss';
import '@globals/styles/variables.scss';
import '@globals/styles/globals.scss';
import fonts from '@globals/fonts';
import metadata from '@globals/metadata.json';

import navLinks from '@data/navLinks.json';
import Sidebar from '@components/Sidebar/Sidebar';

export { metadata };

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Sidebar navLinks={navLinks} />
          {children}
        </div>
      </body>
    </html>
  );
}
