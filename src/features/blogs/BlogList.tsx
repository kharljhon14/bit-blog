'use client';

import type { Blog } from '@/types/blog';

async function getBlogs(): Promise<Array<Blog>> {
  const res = await fetch('/api/blogs');

  const { data } = await res.json();

  return data;
}

export default function BlogList() {
  getBlogs().then((data) => console.log(data));

  return (
    <div>
      <h1>Blog list</h1>
    </div>
  );
}
