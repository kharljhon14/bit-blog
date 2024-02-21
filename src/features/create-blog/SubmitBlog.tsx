import { useCurrentEditor } from '@tiptap/react';
import type { ButtonHTMLAttributes } from 'react';

import { Button } from '@/components/ui/button';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleSubmit: (content: string) => void;
}

export default function SubmitBlog({ handleSubmit, ...props }: Props) {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  return (
    <Button
      size="lg"
      className="w-full"
      {...props}
      onClick={() => handleSubmit(editor.getHTML())}
    >
      Submit
    </Button>
  );
}
