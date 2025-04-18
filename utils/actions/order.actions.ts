'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { revalidatePath } from 'next/cache';
import { drizzle } from 'drizzle-orm/d1';
// import { eq } from 'drizzle-orm';
import { orderItems, orders } from '@/db/schema';

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
    const db = drizzle(context.env.DB as D1Database);

    if (!db) {
      throw new Error('Database not found in context');
    }

    const ordersRaw = await db.select().from(orders).all();

    return { success: true, racks: ordersRaw || [] };
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
  orderItems: cartItems,
  paymentMethod,
}: Order) {
  try {
    const context = await getCloudflareContext();
    const db = drizzle(context.env.DB as D1Database);
    if (!db) throw new Error('Database not found in context');
    const newOrder: typeof orders.$inferInsert = {
      guestName: name,
      deliveryDate: new Date(deliveryDate),
      deliveryAddress,
      notes,
      phoneNumber,
      guestEmail: email,
      deposit,
      userId,
    };

    const { orderId } = (
      await db.insert(orders).values(newOrder).returning({ orderId: orders.id })
    )[0];

    const itemInserts = cartItems.map((item) => {
      const { shoeRackId, shelfColor, frameColor, quantity, price } = item;
      const newItem: typeof orderItems.$inferInsert = {
        orderId,
        shoeRackId,
        shelfColor: shelfColor?.name as string,
        frameColor: frameColor?.name as string,
        quantity,
        price,
      };
      db.insert(orderItems).values(newItem);
    });

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
