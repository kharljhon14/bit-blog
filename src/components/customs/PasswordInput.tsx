'use client';

import { useState } from 'react';

import type { InputProps } from '../ui/input';
import { Input } from '../ui/input';

export default function PasswordInput(props: Omit<InputProps, 'type'>) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={show ? 'text' : 'password'}
      />
      <div className="absolute right-3 top-0 flex h-full items-center justify-center text-xs">
        <button
          onClick={() => setShow(!show)}
          type="button"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}
