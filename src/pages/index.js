import Conditional from '@/components/conditional';
import styles from '@/css/index.module.css';
import { useSession } from 'next-auth/react';
import { Button } from 'react-bootstrap';

export default function Index() {
  const { status, data: session } = useSession();

  return (
    <div>
      <Button variant='primary' href='/post/new'>
        New Post
      </Button>
    </div>
  );
}
