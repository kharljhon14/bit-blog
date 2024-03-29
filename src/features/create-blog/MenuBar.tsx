import { useCurrentEditor } from '@tiptap/react';
import { AiOutlineOrderedList, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsBlockquoteLeft } from 'react-icons/bs';
import { LuCode2, LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import {
  MdOutlineFormatAlignCenter,
  MdOutlineFormatAlignLeft,
  MdOutlineFormatAlignRight,
  MdOutlineFormatBold,
  MdOutlineFormatItalic,
  MdOutlineFormatStrikethrough,
  MdOutlineHorizontalRule,
  MdOutlineRedo,
  MdOutlineUndo,
} from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) return null;
  return (
    <div className="mb-4 flex space-x-2">
      <div className="flex space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`${editor.isActive('bold') ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <MdOutlineFormatBold size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`${editor.isActive('italic') ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <MdOutlineFormatItalic size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${editor.isActive('strike') ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <MdOutlineFormatStrikethrough size={24} />
        </Button>
      </div>

      <div className="flex h-10 items-center space-x-4 text-sm">
        <Separator orientation="vertical" />
      </div>

      <div className="flex space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${editor.isActive('heading', { level: 1 }) ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <LuHeading1 size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${editor.isActive('heading', { level: 2 }) ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <LuHeading2 size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${editor.isActive('heading', { level: 3 }) ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <LuHeading3 size={24} />
        </Button>
      </div>

      <div className="flex h-10 items-center space-x-4 text-sm">
        <Separator orientation="vertical" />
      </div>

      <div className="flex space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bulletList') ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <AiOutlineUnorderedList size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive('orderedList') ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <AiOutlineOrderedList size={24} />
        </Button>
      </div>

      <div className="flex h-10 items-center space-x-4 text-sm">
        <Separator orientation="vertical" />
      </div>

      <div className="flex space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${editor.isActive({ textAlign: 'left' }) ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <MdOutlineFormatAlignLeft size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${editor.isActive({ textAlign: 'center' }) ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <MdOutlineFormatAlignCenter size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${editor.isActive({ textAlign: 'right' }) ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <MdOutlineFormatAlignRight size={24} />
        </Button>
      </div>

      <div className="flex h-10 items-center space-x-4 text-sm">
        <Separator orientation="vertical" />
      </div>

      <div className="flex space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={`${editor.isActive('bulletList') ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <MdOutlineHorizontalRule size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${editor.isActive('codeBlock') ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <LuCode2 size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${editor.isActive('blockquote') ? 'bg-black text-white' : ''} hover:bg-black hover:text-white`}
        >
          <BsBlockquoteLeft size={24} />
        </Button>
      </div>

      <div className="flex h-10 items-center space-x-4 text-sm">
        <Separator orientation="vertical" />
      </div>

      <div className="flex space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <MdOutlineUndo size={24} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <MdOutlineRedo size={24} />
        </Button>
      </div>
    </div>
  );
}
