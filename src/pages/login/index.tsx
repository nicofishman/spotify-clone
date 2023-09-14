import { cn } from '@/utils/cn';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Spotify | Log in</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main
        className={cn(
          'flex h-screen flex-col items-center justify-center gap-y-6 overflow-x-hidden bg-[linear-gradient(rgba(88,232,128)_0,#121212_100%)] px-8 pt-6 text-white grid-in-main-view @container/main'
        )}
      >
        <button
          className='w-full max-w-2xl bg-spotify-green py-2 font-black'
          onClick={() =>
            signIn('spotify', {
              callbackUrl: '/',
            })
          }
        >
          Log in
        </button>
      </main>
    </>
  );
};

export default LoginPage;
