'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

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
    name: string;
    quantity: number;
    price: number;
    shelfColor: string;
    frameColor: string;
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

// model Order {
//     id              String      @id @default(cuid())
//     customerName    String
//     deliveryDate    DateTime
//     deliveryAddress String
//     notes           String?
//     phoneNumber     String?
//     guestEmail      String?
//     guestName       String?
//     deposit         Float?
//     userId          String?
//     user            User?       @relation(fields: [userId], references: [id])
//     status          OrderStatus @default(PENDING)
//     orderItems      OrderItem[]
//     cancelledby     String?
//     createdAt       DateTime    @default(now())
//     updatedAt       DateTime    @updatedAt
//     Payment         Payment[]
//   }

// model OrderItem {
//     id         String   @id @default(uuid())
//     orderId    String
//     order      Order    @relation(fields: [orderId], references: [id])
//     shoeRackId String
//     shoeRack   ShoeRack @relation(fields: [shoeRackId], references: [id])
//     shelfColor String
//     frameColor String
//     quantity   Int
//     price      Decimal
//     createdAt  DateTime @default(now())
//     updatedAt  DateTime @updatedAt
//   }

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

    console.log(orderItems);
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
          item.shelfColor,
          item.frameColor,
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
