import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  // Verify the session user is a valid user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (user === null) {
    res.status(400).json({ error: 'Session User Mismatch' });
  }

  const post = {
    title: '',
    content: '',
    published: false,
    User: {
      connect: {
        id: user.id,
      },
    },
  };

  const body = req.body;

  // Validate title
  if (body.title) {
    post.title = body.title;
  }

  // Validate content
  if (body.content) {
    post.content = body.content;
  }

  // Validate published
  if (body.published) {
    post.published = body.published;
  }

  const result = await prisma.post.create({ data: post });

  res.status(201).json(result);
}
