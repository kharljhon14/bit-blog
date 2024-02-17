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
    <EditorProvider
      extensions={extensions}
      content={content}
      slotBefore={<MenuBar />}
      editorProps={{
        attributes: {
          class:
            'prose prose-sm focus:outline-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg',
        },
      }}
    >
      {null}
    </EditorProvider>
  );
}
