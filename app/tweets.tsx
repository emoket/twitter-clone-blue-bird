'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Likes from './likes';
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react';
import router, { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const [optimisticTweeks, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, (currentOtimisticTweets, newTweet) => {
    const newOptimisticTweets = [...currentOtimisticTweets];
    const index = newOptimisticTweets.findIndex(
      (tweet) => tweet.id === newTweet.id
    );
    newOptimisticTweets[index] = newTweet;
    return newOptimisticTweets;
  });

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('realtime tweets')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tweets',
        },
        (payload) => {
          console.log({ payload });
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return optimisticTweeks?.map((tweet) => (
    <div
      key={tweet.id}
      className='flex px-4 py-8 border border-t-0 border-gray-800'
    >
      <div className='w-12 h-12'>
        <Image
          className='rounded-full'
          src={tweet.author.avatar_url}
          alt='tweet user avatar'
          width={48}
          height={48}
        />
      </div>
      <div className='ml-4'>
        <p>
          <span className='font-bold'>{tweet.author.name}</span>
          <span className='ml-2 text-sm text-gray-400'>
            {tweet.author.username}
          </span>
        </p>
        <p>{tweet.title}</p>
        <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
      </div>
    </div>
  ));
}
