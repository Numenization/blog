import 'bootstrap/dist/css/bootstrap.css';
import '@/css/globals.css';

import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
