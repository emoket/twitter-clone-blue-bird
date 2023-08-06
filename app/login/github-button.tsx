'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

export default function GitHubButton() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
  };

  return (
    <button
      onClick={handleSignIn}
      className='flex flex-col items-center justify-center p-8 hover:bg-gray-800 rounded-xl'
    >
      <Image
        src='/github-mark-white.png'
        alt='GitHub logo'
        width={100}
        height={100}
      />
      <p className='mt-5 text-sm text-gray-500'>Login with GitHub</p>
    </button>
  );
}
