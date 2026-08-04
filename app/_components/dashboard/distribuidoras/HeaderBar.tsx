'use client';

import { useRouter } from 'next/navigation';

interface Props {
  title: string;
}

export function HeaderBar({ title }: Props) {
  const router = useRouter();

  return (
    <header className="bg-[#082046] text-white px-4 py-4 flex items-center justify-between shadow-md">
      <button 
        onClick={() => router.back()}
        className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 className="text-lg font-bold tracking-wide uppercase">{title}</h1>
      <div className="w-10" />
    </header>
  );
}