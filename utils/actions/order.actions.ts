'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export type Color = {
  id: string;
  name: string;
  hex: string;
};

interface Order {
  name: string;
  deliveryDate: string;
  deliveryAddress: string;
  notes: string;
  phoneNumber: string;
  email: string;
  deposit: number;
  userId: string;
  paymentMethod: string;
  orderItems: {
    shoeRackId: string;
    name: string | undefined;
    quantity: number;
    price: number;
    shelfColor: Color | null;
    frameColor: Color | null;
  }[];
}

export async function getOrders() {
  try {
    const context = await getCloudflareContext();
    const db = context.env.DB as D1Database;

    if (!db) {
      throw new Error('Database not found in context');
    }

    const ordersRaw = await db.prepare('SELECT * FROM orders').all();
    const orders =
      ordersRaw.results?.map((rack) => ({
        ...rack,
        price: JSON.parse(rack?.price as string),
      })) ?? [];
    return { success: true, racks: orders || [] };
  } catch (error) {
    console.error('Failed to fetch colors:', error);
    return { success: false, message: 'Failed to fetch colors' };
  }
}

export async function addOrder({
  name,
  deliveryAddress,
  deliveryDate,
  notes,
  phoneNumber,
  email,
  deposit,
  userId,
  orderItems,
  paymentMethod,
}: Order) {
  try {
    const context = await getCloudflareContext();
    const db = context.env.DB as D1Database;
    if (!db) throw new Error('Database not found in context');

    const now = new Date().toISOString();
    const orderId = uuidv4();

    await db
      .prepare(
        `INSERT INTO "Order" (
      id, customerName, deliveryDate, deliveryAddress, notes, phoneNumber,
      guestEmail, deposit, userId, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        orderId,
        name,
        deliveryDate,
        deliveryAddress,
        notes || null,
        phoneNumber || null,
        email || null,
        deposit ?? null,
        userId || null,
        now,
        now
      )
      .run();

    const itemInserts = orderItems.map((item) =>
      db
        .prepare(
          `INSERT INTO "orderitem" (
              id, orderId, shoeRackId, shelfColor, frameColor,
              quantity, price, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          uuidv4(),
          orderId,
          item.shoeRackId,
          item.shelfColor?.name,
          item.frameColor?.name,
          item.quantity,
          item.price,
          now,
          now
        )
        .run()
    );

    await Promise.all(itemInserts);

    revalidatePath('/checkout');

    return {
      success: true,
      data: {
        orderId,
        amount: deposit,
        paymentMethod,
      },
      message: 'Order created successfully',
    };
  } catch (error) {
    console.error('Failed to add order:', error);
    return { success: false, message: 'Failed to add order' };
  }
}
