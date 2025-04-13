'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export async function getRacks() {
  try {
    const context = await getCloudflareContext();
    const db = context.env.DB as D1Database;

    if (!db) {
      throw new Error('Database not found in context');
    }

    const shoeRacksRaw = await db.prepare('SELECT * FROM shoerack').all();
    const shoeRacks =
      shoeRacksRaw.results?.map((rack) => ({
        ...rack,
        price: JSON.parse(rack?.price as string),
      })) ?? [];
    return { success: true, racks: shoeRacks || [] };
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
    const db = context.env.DB as D1Database;

    if (!db) {
      throw new Error('Database not found in context');
    }

    const now = new Date().toISOString();

    const id = uuidv4();
    const inserteRackRaw = await db
      .prepare(
        'INSERT INTO shoerack (id, name, length, levels, price, createdAt, updatedAt ) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *'
      )
      .bind(id, name, length, levels, JSON.stringify(price), now, now)
      .run();

    const inserteRack = {
      ...inserteRackRaw.results[0],
      price: JSON.parse(inserteRackRaw?.results[0]?.price as string),
    };

    revalidatePath('/experience');
    return {
      success: true,
      results: inserteRack || {},
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
    const db = context.env.DB as D1Database;

    if (!db) throw new Error('Database not found in context');

    await db.prepare('DELETE FROM shoerack WHERE id = ?').bind(id).run();

    revalidatePath('/experience');

    return { success: true, message: 'Rack deleted successfully' };
  } catch (error) {
    console.error('Rack deletion failed:', error);
    return { success: false, message: 'Failed to delete rack' };
  }
}
