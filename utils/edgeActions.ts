'use server';

import { darajaClient } from './daraja';
import { getPrisma } from './prisma';

interface orderProps {
  fullName: string;
  address: string;
  notes?: string;
  phoneNumber?: string;
  email: string;
  deposit: number;
  userId?: string;
  orderItems: { productId: string; price: number }[];
}
export async function createOrder(data: orderProps) {
  try {
    const prisma = getPrisma();

    const {
      userId,
      fullName,
      address,
      notes,
      phoneNumber,
      email,
      deposit,
      orderItems,
    } = data;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    const order = await prisma.order.create({
      data: {
        userId: userId,
        customerName: fullName,
        deliveryDate: deliveryDate,
        deliveryAddress: address,
        notes: notes,
        phoneNumber,
        guestEmail: email,
        deposit,
      },
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Order creation failed:', error);
    return { success: false, message: 'Failed to create order' };
  }
}

export async function createColorAction({
  name,
  hex,
}: {
  name: string;
  hex: string;
}) {
  try {
    const prisma = getPrisma();
    const color = await prisma.color.create({
      data: {
        name,
        hex,
      },
    });

    return { success: true, color };
  } catch (error) {
    console.error('Order creation failed:', error);
    return { success: false, message: 'Failed to add new color' };
  }
}

export async function deleteColor({ hex }: { name: string; hex: string }) {
  try {
    const prisma = getPrisma();
    const color = await prisma.color.delete({
      where: {
        hex,
      },
    });

    return { success: true, color };
  } catch (error) {
    console.error('Order creation failed:', error);
    return { success: false, message: 'Failed to add new color' };
  }
}

export async function updateColorAction({
  id,
  name,
  hex,
}: {
  name: string;
  hex: string;
  id: string;
}) {
  try {
    const prisma = getPrisma();
    const color = await prisma.color.update({
      where: {
        id,
      },
      update: { name, hex },
      create: { name, hex },
    });

    return { success: true, color };
  } catch (error) {
    console.error('Order creation failed:', error);
    return { success: false, message: 'Failed to add new color' };
  }
}
