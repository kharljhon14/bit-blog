'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { Blog } from '@/types/blog';

import BlogCard from './BlogCard';

async function getBlogs(page: number): Promise<Array<Blog>> {
  const res = await fetch(`/api/blogs?page=${page.toString()}`);

  const { data } = await res.json();

  return data;
}

export default function BlogList() {
  const [page, setPage] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    getBlogs(page).then((data) => setBlogs(data));
  }, [page]);

  return (
    <div>
      <div className="grid grid-cols-5">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
      <Button onClick={() => setPage(page - 1)}>Prev</Button>
      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </div>
  );
}
