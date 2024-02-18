import { useCurrentEditor } from '@tiptap/react';

import { Button } from '@/components/ui/button';

import { createBlog } from './blogForm';

interface Props {
  title: string;
}

export default function SubmitBlog({ title }: Props) {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  const handleOnClick = async () => {
    await createBlog(title, editor.getHTML().toString());
  };

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleOnClick}
    >
      Submit
    </Button>
  );
}
