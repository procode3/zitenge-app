'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { revalidatePath } from 'next/cache';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { shoeRacks } from '@/db/schema';

export async function getRacks() {
  try {
    const context = await getCloudflareContext();
    const db = drizzle(context.env.DB as D1Database);

    if (!db) {
      throw new Error('Database not found in context');
    }

    const rawshoeRacks = await db.select().from(shoeRacks).all();

    return { success: true, racks: rawshoeRacks || [] };
  } catch (error) {
    console.error('Failed to fetch colors:', error);
    return { success: false, message: 'Failed to fetch colors' };
  }
}

export async function addRack({
  name,
  length,
  levels,
  price,
}: {
  name: string;
  length: number;
  levels: number;
  price: {
    rustic: number;
    painted: number;
    combined: number;
  };
}) {
  try {
    const context = await getCloudflareContext();
    const db = drizzle(context.env.DB as D1Database);

    if (!db) {
      throw new Error('Database not found in context');
    }

    const newRack: typeof shoeRacks.$inferInsert = {
      name,
      length,
      levels,
      price,
    };
    const inserteRack = await db.insert(shoeRacks).values(newRack).returning();
    revalidatePath('/experience');

    return {
      success: true,
      results: inserteRack[0] || {},
      message: 'Rack added successfully',
    };
  } catch (error) {
    console.error('Failed to add a new rack:', error);
    return { success: false, message: 'Failed to add new rack' };
  }
}

export async function deleteRack(id: string) {
  try {
    const context = await getCloudflareContext();
    const db = drizzle(context.env.DB as D1Database);

    if (!db) throw new Error('Database not found in context');

    await db.delete(shoeRacks).where(eq(shoeRacks.id, id));

    revalidatePath('/experience');

    return { success: true, message: 'Rack deleted successfully' };
  } catch (error) {
    console.error('Rack deletion failed:', error);
    return { success: false, message: 'Failed to delete rack' };
  }
}
