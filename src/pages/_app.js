import '@/css/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { SessionProvider } from 'next-auth/react';

import MainNav from '@/components/navbar';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider>
      <MainNav />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
