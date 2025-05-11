"use client"
import Routeloader from '@/components/Routeloader'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Routeloader />
      {children}
    </main>
  );
}
