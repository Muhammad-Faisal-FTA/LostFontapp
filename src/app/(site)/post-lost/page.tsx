import React from 'react'
import type { NextPage } from 'next';
import FormLost from '@/components/FormLost';
const PostLost = () => {
  return (
    <div className="min-h-screen p-1 md:py-8 bg-Report bg-cover bg-repeat">
      <h1 className="text-center text-2xl font-bold mb-4">Post your lost Item! </h1>
      <FormLost />
    </div>
  )
}

export default PostLost
