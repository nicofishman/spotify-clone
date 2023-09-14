import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { api } from '@/utils/api';

import '@/styles/globals.css';
import EditPlaylistModal from '@/components/shared/modals/EditPlaylistModal';
import { useEffect, useState } from 'react';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ModalProvider />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <EditPlaylistModal />;
};
