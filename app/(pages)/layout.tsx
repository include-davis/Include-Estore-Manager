import '@globals/styles/colors.scss';
import '@globals/styles/spacers.scss';
import '@globals/styles/variables.scss';
import '@globals/styles/globals.scss';
import font_string from '@globals/fonts';
import metadata from '@globals/metadata.json';

export { metadata };

export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font_string}>{children}</body>
    </html>
  );
}
