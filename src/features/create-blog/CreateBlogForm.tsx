'use client';

import './createBlogForm.css';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import js from 'highlight.js/lib/languages/javascript';
import { common, createLowlight } from 'lowlight';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import MenuBar from './MenuBar';

const lowlight = createLowlight(common);

lowlight.register({ js });

lowlight.highlight('js', '"use strict";');

const extensions = [
  StarterKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Highlight,
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: 'js',
  }),
];

const content = `
<h1>AI is the future</h1>
<p>The new advancements in artificial intelligence are revolutionizing various industries...</p>
`;

export default function CreateBlogForm() {
  return (
    <div className="mx-12 space-y-4">
      <h1 className="text-3xl">Add Article</h1>
      <Input placeholder="Title" />
      <EditorProvider
        extensions={extensions}
        content={content}
        slotBefore={<MenuBar />}
        editorProps={{
          attributes: {
            class:
              'prose-base prose-lg focus:outline-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-hr:h-px prose-hr:bg-black/20 prose-ul:list-disc prose-ol:list-decimal',
          },
        }}
      >
        <div />
      </EditorProvider>
      <Button
        size="lg"
        className="w-full"
      >
        Submit
      </Button>
    </div>
  );
}
