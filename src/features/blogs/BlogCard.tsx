/* eslint-disable react/no-danger */
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Blog } from '@/types/blog';

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <Link href={`/blogs/${blog.id}`}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-between text-xs">
            <span>Author: {blog.username}</span>
            <span>{new Date(blog.updated_at).toLocaleDateString()}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
