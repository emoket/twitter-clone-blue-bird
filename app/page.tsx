import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButtonServer from './auth-button-server';
import { redirect } from 'next/navigation';

export default async function Home() {
  // 인증되지 않은 사용자를 로그인 페이지로 리디렉션 시키기 위해 트윗 목록을 받아 오기 전에 리디렉션 로직을 추가합니다.
  // 반대로 로그인 페이지(./login/page.tsx)에서는 이미 인증되어 있다면(session exist) 랜딩페이지('/')로 리디렉션 시킵니다.
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const { data: tweets } = await supabase.from('tweets').select();

  return (
    <>
      <AuthButtonServer />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </>
  );
}
