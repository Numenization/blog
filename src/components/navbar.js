import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useSession, signIn, signOut } from 'next-auth/react';
import Conditional from '@/components/conditional';

export default function MainNav(props) {
  const { status, data: session } = useSession();
  const user = {
    username: '',
    email: '',
  };

  if (status === 'authenticated') {
    user.username = session.user.name;
    user.email = session.user.email;
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='#'>Nick Spencer</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#'>Blog</Nav.Link>
          </Nav>
          <Conditional showWhen={status != 'loading'}>
            <Conditional showWhen={status == 'unauthenticated'}>
              <Button variant='primary' onClick={() => signIn()}>
                Sign In
              </Button>
            </Conditional>
            <Conditional showWhen={status == 'authenticated'}>
              <div>
                <span className='text-light p-2'>
                  Logged in as {user.username}
                </span>
                <Button variant='outline-danger' onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            </Conditional>
          </Conditional>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
