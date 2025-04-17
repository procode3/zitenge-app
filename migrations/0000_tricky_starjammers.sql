CREATE TABLE `colors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`hex` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `colors_hex_unique` ON `colors` (`hex`);--> statement-breakpoint
CREATE TABLE `orderitems` (
	`id` text PRIMARY KEY NOT NULL,
	`orderId` text NOT NULL,
	`shoeRackId` text NOT NULL,
	`shelfColor` text NOT NULL,
	`frameColor` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` real NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`deliveryDate` integer NOT NULL,
	`deliveryAddress` text NOT NULL,
	`notes` text,
	`phoneNumber` text,
	`guestEmail` text,
	`guestName` text,
	`deposit` real,
	`userId` text,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`cancelledby` text,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`orderId` text NOT NULL,
	`amountPaid` real NOT NULL,
	`TotalAmount` real NOT NULL,
	`paymentMethod` text NOT NULL,
	`status` text NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `shoeracks` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` text NOT NULL,
	`length` integer NOT NULL,
	`levels` integer NOT NULL,
	`image` text,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `shoeracks_name_unique` ON `shoeracks` (`name`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text DEFAULT 'CUSTOMER' NOT NULL,
	`isArchived` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);