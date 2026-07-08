import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppUIProvider } from '@repo/ui';
import '@repo/theme/globals.css';

export const metadata: Metadata = {
  title: 'Astryx UI Kit',
  description: 'Reusable UI system scaffold for Astryx-based React and Next.js projects.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-theme="dark">
      <body>
        <AppUIProvider>{children}</AppUIProvider>
      </body>
    </html>
  );
}
