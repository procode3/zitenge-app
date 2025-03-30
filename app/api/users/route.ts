import { User } from '@prisma/client';
import { getPrisma } from '@/utils/prisma';
import { NextResponse } from 'next/server';
export const runtime = 'edge';
import { hashPassword } from '@/utils/password';

export interface Env {
  DB: D1Database;
}

export async function GET() {
  const prisma = getPrisma();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
    },
  });

  return NextResponse.json(users, {
    status: 200,
  });
}

export async function POST(request: Request) {
  try {
    const prisma = getPrisma();
    const body = await request.json();
    const { name, email, password } = body as User;
    if (!name || !email || !password) {
      return new Response('Invalid input', {
        status: 400,
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
      },
    });
    const result = JSON.stringify(user);
    return new Response(result, {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  const prisma = getPrisma();
  const { id } = (await request.json()) as User;
  try {
    if (!id) {
      return new Response('Invalid input', {
        status: 400,
      });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });
    return new Response('User deleted', {
      status: 200,
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
