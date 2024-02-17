'use client';

import './createBlogForm.css';

import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import MenuBar from './MenuBar';

const extensions = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Highlight,
];
const content = `
<h1>AI is the future</h1>
<p>The new ...</p>
`;

export default function CreateBlogForm() {
  return (
    <div>
      <EditorProvider
        extensions={extensions}
        content={content}
        slotBefore={<MenuBar />}
        editorProps={{
          attributes: {
            class:
              'prose-lg focus:outline-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-hr:h-px prose-hr:bg-black/20 prose-ul:list-disc prose-ol:list-decimal',
          },
        }}
      >
        <div className=" " />
      </EditorProvider>
    </div>
  );
}
