import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - Ali Traders',
  description: 'Login to Ali Traders Sales Management System',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
