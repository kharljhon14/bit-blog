/* eslint-disable react/no-danger */
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  id: string;
  title: string;
  content: string;
}

export default function BlogCard({ id, title, content }: Props) {
  return (
    <Link href={`/blog/${id}`}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </CardContent>
      </Card>
    </Link>
  );
}
