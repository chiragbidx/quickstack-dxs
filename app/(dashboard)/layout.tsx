import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Your layout UI */}
      {children}
    </section>
  );
}