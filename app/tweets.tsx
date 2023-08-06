'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Likes from './likes';
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react';
import router, { useRouter } from 'next/navigation';

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
    <div key={tweet.id}>
      <p>
        {tweet.author.name} {tweet.author.username}
      </p>
      <p>{tweet.title}</p>
      <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
    </div>
  ));
}
