"use client"
// pages/index.tsx
import type { NextPage } from 'next';
import FormLost from '@/components/FormLost';

const ReportFound: NextPage = () => {
  return (
    <div className="min-h-screen  py-8">
      {/* <h1 className="text-center text-2xl font-bold mb-8">Post Item Details</h1> */}
      <FormLost />
    </div>
  );
};

export default ReportFound;