import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Form, Button } from 'react-bootstrap';

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // make sure a user is logged in and can post, otherwise redirect to home
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

export default function NewPost() {
  //const { status, data: session } = useSession();

  return (
    <div>
      <Form method='POST' action='/api/post/new'>
        <Form.Group className='mb-3' controlId='postForm.Title'>
          <Form.Label>Post Title</Form.Label>
          <Form.Control type='text' placeholder='Title' name='title' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postForm.Text'>
          <Form.Label>Content</Form.Label>
          <Form.Control as='textarea' rows={10} name='content' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postForm.Published'>
          <Form.Check type='checkbox' label='Publish?' name='publish' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit Post
        </Button>
      </Form>
    </div>
  );
}
