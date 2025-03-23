"use client"
// pages/index.tsx
import type { NextPage } from 'next';
import FormFound from '@/components/FormFound';

const ReportFound: NextPage = () => {
  return (
    <div className="min-h-screen p-1 md:py-8 bg-Report bg-cover bg-repeat">
      <h1 className="text-center text-2xl font-bold mb-4 ">Post Item you Found! </h1>
      <FormFound />
    </div>
  );
};

export default ReportFound;