export const metadata = {
  title: 'Expense Dashboard',
  description: 'Track personal expenses easily',
};

import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </body>
    </html>
  );
}
