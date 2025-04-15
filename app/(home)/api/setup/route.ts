import { users } from '@/db/schema';
import { hashPassword } from '@/utils/password';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.dev.vars') });

const { superAdmin, adminPassword } = process.env;

type NewUser = typeof users.$inferInsert;

export async function POST(req: Request) {
  try {
    if (!superAdmin || !adminPassword) {
      throw new Error(
        'Please provide Admin username and password in the ENV to setup the app'
      );
    }
    const body = await req.json();
    const { name } = body as NewUser;

    const hashedPassword = await hashPassword(adminPassword);
    const user: NewUser = {
      name,
      email: superAdmin,
      password: hashedPassword,
      role: 'ADMIN',
    };

    const { env } = getCloudflareContext();
    const db = drizzle(env.DB);
    const result = await db
      .insert(users)
      .values(user)
      .returning({ insertedId: users.id });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create user', detail: `A server error occured` },
      { status: 500 }
    );
  }
}
