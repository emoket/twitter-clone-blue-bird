import { User, createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function NewTweet({ user }: { user: User }) {
  const addTweet = async (formData: FormData) => {
    'use server';
    const title = String(formData.get('title'));
    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.from('tweets').insert({ title, user_id: user.id });
  };

  return (
    <form className='border border-t-0 border-gray-800' action={addTweet}>
      <div className='flex px-4 pt-8'>
        <div className='w-12 h-12'>
          <Image
            src={user.user_metadata.avatar_url}
            alt='user avatar'
            width={48}
            height={48}
            className='rounded-full'
          />
        </div>
        {/* TODO 트윗 작성 후 폼 초기화 */}
        <input
          id='title'
          name='title'
          className='flex-1 w-full px-2 ml-2 text-xl font-medium leading-loose text-gray-400 placeholder-gray-500 outline-none bg-inherit'
          placeholder="What's happening?"
          required
        ></input>
      </div>
      {/* middle creat tweet below icons */}
      <div className='flex'>
        <div className='w-10'></div>

        <div className='w-64 px-2'>
          <div className='flex items-center'>
            <div className='flex-1 px-1 py-1 m-2 text-center'>
              <a
                href='#'
                className='flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full group hover:bg-gray-800 hover:text-blue-300'
              >
                <svg
                  className='w-6 text-center h-7'
                  fill='none'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                </svg>
              </a>
            </div>

            <div className='flex-1 py-2 m-2 text-center'>
              <a
                href='#'
                className='flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full group hover:bg-gray-800 hover:text-blue-300'
              >
                <svg
                  className='w-6 text-center h-7'
                  fill='none'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'></path>
                  <path d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                </svg>
              </a>
            </div>

            <div className='flex-1 py-2 m-2 text-center'>
              <a
                href='#'
                className='flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full group hover:bg-gray-800 hover:text-blue-300'
              >
                <svg
                  className='w-6 text-center h-7'
                  fill='none'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                </svg>
              </a>
            </div>

            <div className='flex-1 py-2 m-2 text-center'>
              <a
                href='#'
                className='flex items-center px-2 py-2 mt-1 text-base font-medium leading-6 text-blue-400 rounded-full group hover:bg-gray-800 hover:text-blue-300'
              >
                <svg
                  className='w-6 text-center h-7'
                  fill='none'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
