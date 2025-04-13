import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

// Enums
export const roleEnum = ['ADMIN', 'EMPLOYEE', 'CUSTOMER'] as const;
export const orderStatusEnum = [
  'PENDING',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const;
export const paymentMethodEnum = [
  'CASH',
  'CARD',
  'MPESA',
  'BANK_TRANSFER',
] as const;

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: roleEnum }).default('CUSTOMER').notNull(),
  isArchived: integer('isArchived', { mode: 'boolean' })
    .default(false)
    .notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).defaultNow().notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).defaultNow().notNull(),
});

export const orders = sqliteTable('orders', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  deliveryDate: integer('deliveryDate', { mode: 'timestamp' }).notNull(),
  deliveryAddress: text('deliveryAddress').notNull(),
  notes: text('notes'),
  phoneNumber: text('phoneNumber'),
  guestEmail: text('guestEmail'),
  guestName: text('guestName'),
  deposit: real('deposit'),
  userId: text('userId'),
  status: text('status', { enum: orderStatusEnum })
    .default('PENDING')
    .notNull(),
  cancelledby: text('cancelledby'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).defaultNow().notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).defaultNow().notNull(),
});

export const shoeRacks = sqliteTable('shoeracks', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull().unique(),
  description: text('description'),
  price: text('price', { mode: 'json' }).notNull(),
  length: integer('length').notNull(),
  levels: integer('levels').notNull(),
  image: text('image'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).defaultNow().notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).defaultNow().notNull(),
});

export const orderItems = sqliteTable('orderitems', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  orderId: text('orderId').notNull(),
  shoeRackId: text('shoeRackId').notNull(),
  shelfColor: text('shelfColor').notNull(),
  frameColor: text('frameColor').notNull(),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).defaultNow().notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).defaultNow().notNull(),
});

export const payments = sqliteTable('payments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  orderId: text('orderId').notNull(),
  amountPaid: real('amountPaid').notNull(),
  TotalAmount: real('TotalAmount').notNull(),
  paymentMethod: text('paymentMethod', { enum: paymentMethodEnum }).notNull(),
  status: text('status').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' }).defaultNow().notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp' }).defaultNow().notNull(),
});

export const colors = sqliteTable('colors', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  hex: text('hex').notNull().unique(),
});

// Relations (optional if you're not using drizzle ORM relationships)
export const userRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderItems: many(orderItems),
  payments: many(payments),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  shoeRack: one(shoeRacks, {
    fields: [orderItems.shoeRackId],
    references: [shoeRacks.id],
  }),
}));

export const paymentRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));
