'use server';

import { colors } from '@/db/schema';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';

export async function getColors() {
  try {
    const context = await getCloudflareContext();
    const db = drizzle(context.env.DB as D1Database);

    if (!db) {
      throw new Error('Database not found in context');
    }

    const allColors = await db.select().from(colors).all();
    return { success: true, colors: allColors || [] };
  } catch (error) {
    console.error('Failed to fetch colors:', error);
    return { success: false, message: 'Failed to fetch colors' };
  }
}

export async function createColor({
  name,
  hex,
}: {
  name: string;
  hex: string;
}) {
  try {
    const context = await getCloudflareContext();
    const db = drizzle(context.env.DB as D1Database);

    if (!db) {
      throw new Error('Database not found in context');
    }

    const existingColor = await db
      .select()
      .from(colors)
      .where(eq(colors.hex, hex))
      .get();

    if (existingColor) {
      throw new Error('Color hex must be unique');
    }
    const newColor: typeof colors.$inferInsert = {
      name,
      hex,
    };

    const inserteColor = await db.insert(colors).values(newColor).returning();

    return {
      success: true,
      results: inserteColor || [],
      message: 'Color added successfully',
    };
  } catch (error) {
    console.error('Order creation failed:', error);
    return { success: false, message: 'Failed to add new color' };
  }
}

export async function deleteColor(id: string) {
  try {
    const context = await getCloudflareContext();
    const db = context.env.DB as D1Database;

    if (!db) throw new Error('Database not found in context');

    await db.prepare('DELETE FROM color WHERE id = ?').bind(id).run();

    return { success: true, message: 'Color deleted successfully' };
  } catch (error) {
    console.error('Color deletion failed:', error);
    return { success: false, message: 'Failed to delete color' };
  }
}
