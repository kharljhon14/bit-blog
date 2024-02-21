'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { Blog } from '@/types/blog';

async function getBlogs(page: number): Promise<Array<Blog>> {
  const res = await fetch(`/api/blogs?page=${page.toString()}`);

  const { data } = await res.json();

  return data;
}

export default function BlogList() {
  const [page, setPage] = useState(0);

  getBlogs(page).then((data) => console.log(data));

  return (
    <div>
      <h1>Blog list</h1>
      <Button onClick={() => setPage(page + 1)}>Click me</Button>
    </div>
  );
}
