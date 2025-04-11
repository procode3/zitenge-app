'use server';

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { v4 as uuidv4 } from 'uuid';

export async function getColors() {
  try {
    const context = await getCloudflareContext();
    const db = context.env.DB as D1Database;

    if (!db) {
      throw new Error('Database not found in context');
    }

    const colors = await db.prepare('SELECT * FROM color').all();

    return { success: true, colors: colors.results || [] };
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
    const db = context.env.DB as D1Database;

    if (!db) {
      throw new Error('Database not found in context');
    }

    const existingColor = await db
      .prepare('SELECT * FROM color WHERE hex = ?')
      .bind(hex)
      .first();

    if (existingColor) {
      throw new Error('Color hex must be unique');
    }
    const id = uuidv4();
    const inserteColor = await db
      .prepare('INSERT INTO color (id, name, hex) VALUES (?, ?, ?) RETURNING *')
      .bind(id, name, hex)
      .run();

    return {
      success: true,
      results: inserteColor?.results || [],
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
