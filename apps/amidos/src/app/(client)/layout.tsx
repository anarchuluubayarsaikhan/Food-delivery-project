import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="m-auto">{children}</div>
    </Suspense>
  );
}
