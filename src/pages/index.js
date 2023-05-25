import Conditional from '@/components/conditional';
import styles from '@/css/index.module.css';
import { useSession } from 'next-auth/react';

export default function Index() {
  const { status, data: session } = useSession();

  if (status === 'authenticated') {
    return <p>Signed in as {session.user.email}</p>;
  }

  return (
    <div>
      <p>Not signed in</p>
    </div>
  );
}
