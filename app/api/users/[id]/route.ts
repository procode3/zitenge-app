//dynamic route for user profile
import { NextRequest, NextResponse } from 'next/server';

import { User } from '@prisma/client';
import { getPrisma } from '@/utils/prisma';

export const runtime = 'edge';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const prisma = getPrisma();
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = getPrisma();
  const { id } = params;
  try {
    const body = await request.json();
    const { name } = body as User;
    if (!name) {
      return new Response('Invalid input', {
        status: 400,
      });
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = getPrisma();
  const { id } = params;
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
    const result = JSON.stringify(user);
    return new Response(result, {
      status: 200,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
