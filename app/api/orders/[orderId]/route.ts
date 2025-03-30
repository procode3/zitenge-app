//dynamic route for user profile
import { NextRequest, NextResponse } from 'next/server';

import { getPrisma } from '@/utils/prisma';

export const runtime = 'edge';

export async function GET(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;
  try {
    const prisma = getPrisma();
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
