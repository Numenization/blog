import '@/css/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainNav from '@/components/navbar';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <MainNav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
