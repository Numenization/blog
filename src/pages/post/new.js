import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
  const router = useRouter();
  /*const [post, setPost] = useState({
    title: '',
    content: '',
    published: false,
  });*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
      published: e.target.published.value == 'on' ? true : false,
    };
    console.log(data.published);
    const JSONdata = JSON.stringify(data);

    const endpoint = '/api/post/new';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    router.push('/post/' + result.id);
  };

  return (
    <div>
      <Form method='POST' action='/api/post/new' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='postForm.Title'>
          <Form.Label>Post Title</Form.Label>
          <Form.Control type='text' placeholder='Title' name='title' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postForm.Text'>
          <Form.Label>Content</Form.Label>
          <Form.Control as='textarea' rows={10} name='content' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='postForm.Published'>
          <Form.Check type='checkbox' label='Publish?' name='published' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit Post
        </Button>
      </Form>
    </div>
  );
}
