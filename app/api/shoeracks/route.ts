import { NextResponse } from 'next/server';
import { getPrisma } from '@/utils/prisma';
import { ShoeRack } from '@prisma/client';

export const runtime = 'edge';

export interface Env {
  DB: D1Database;
}

export async function GET() {
  const prisma = getPrisma();

  try {
    const shoeRacks = await prisma.shoeRack.findMany();

    return NextResponse.json(shoeRacks, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching shoe racks:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const prisma = getPrisma();
  try {
    const body = await request.json();
    const { name, description, price, image, size } = body as ShoeRack;

    if (!name || !price || !size) {
      return new Response('Invalid input', {
        status: 400,
      });
    }

    const shoeRack = await prisma.shoeRack.create({
      data: {
        name,
        description,
        price,
        image,
        size,
      },
    });

    return NextResponse.json(shoeRack, {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating shoe rack:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
