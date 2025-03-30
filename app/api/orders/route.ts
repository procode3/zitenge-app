import { NextResponse } from 'next/server';
import { getPrisma } from '@/utils/prisma';
import { Order, OrderItem } from '@prisma/client';
export const runtime = 'edge';

export interface Env {
  DB: D1Database;
}

export async function GET() {
  const prisma = getPrisma();

  try {
    const orders = await prisma.order.findMany({
      select: {
        id: true,
        customerName: true,
        deliveryDate: true,
        deliveryAddress: true,
        notes: true,
        phoneNumber: true,
        guestEmail: true,
        guestName: true,
        deposit: true,
        orderItems: true,
      },
    });

    return NextResponse.json(orders, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const prisma = getPrisma();
  try {
    const body = await request.json();
    const {
      customerName,
      deliveryDate,
      deliveryAddress,
      notes,
      phoneNumber,
      guestEmail,
      guestName,
      deposit,
      userId,
      orderItems,
    } = body as Order;

    if (!customerName || !deliveryDate || !deliveryAddress) {
      return new Response('Invalid input', {
        status: 400,
      });
    }

    if (!orderItems || !Array.isArray(orderItems)) {
      return NextResponse.json(
        { message: 'Invalid order items' },
        { status: 400 }
      );
    }

    // Validate order items
    const validOrderItems = orderItems.map((item: OrderItem) => {
      return {
        shoeRackId: item.shoeRackId,
        frameColor: item.frameColor,
        shelfColor: item.shelfColor,
        price: item.price,
        quantity: item.quantity,
      };
    });

    const order = await prisma.order.create({
      data: {
        customerName,
        deliveryDate: new Date(deliveryDate),
        deliveryAddress,
        notes,
        phoneNumber,
        guestEmail,
        guestName,
        deposit,
        orderItems: {
          create: validOrderItems,
        },
        user: userId ? { connect: { id: userId } } : undefined,
      },
    });
    return NextResponse.json(order, {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const prisma = getPrisma();
  const { id } = params;
  try {
    const body = await request.json();
    const {
      customerName,
      deliveryDate,
      deliveryAddress,
      notes,
      phoneNumber,
      guestEmail,
      guestName,
      deposit,
      orderItems,
    } = body as Order;

    if (!customerName || !deliveryDate || !deliveryAddress) {
      return new Response('Invalid input', {
        status: 400,
      });
    }

    if (!orderItems || !Array.isArray(orderItems)) {
      return NextResponse.json(
        { message: 'Invalid order items' },
        { status: 400 }
      );
    }

    // Validate order items
    const validOrderItems = orderItems.map((item: OrderItem) => {
      return {
        shoeRackId: item.shoeRackId,
        frameColor: item.frameColor,
        shelfColor: item.shelfColor,
        price: item.price,
        quantity: item.quantity,
      };
    });

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        customerName,
        deliveryDate: new Date(deliveryDate),
        deliveryAddress,
        notes,
        phoneNumber,
        guestEmail,
        guestName,
        deposit,
        orderItems: {
          create: validOrderItems,
        },
      },
    });
    return NextResponse.json(order, {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
