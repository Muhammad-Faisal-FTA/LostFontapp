'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Simulate a short loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    },1500); // adjust as needed

    return () => clearTimeout(timeout);
  }, [pathname]); // triggers on route change

  if (!loading) return null;

  return (
   <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>  );
}
