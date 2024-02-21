/* eslint-disable react/no-danger */

'use client';

import { useEffect, useState } from 'react';

import type { Blog } from '@/types/blog';

interface Params {
  params: {
    id: string;
  };
}

async function getBlogPost(id: string): Promise<Blog> {
  const res = await fetch(`/api/blogs/${id}`);

  const { data } = await res.json();

  return data;
}

export default function BlogPage({ params }: Params) {
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    getBlogPost(params.id).then((data) => setBlog(data));
  }, [params.id]);

  return (
    <div className="mx-12 mt-24">
      {blog && (
        <>
          <h1 className="mb-6 text-4xl font-bold">{blog?.title}</h1>
          <div
            className="prose prose-lg mb-6 max-w-full"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />
        </>
      )}
    </div>
  );
}
