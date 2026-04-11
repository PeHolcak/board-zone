import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("user"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email")
    .notNull()
    .references(() => users.email),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const tables = pgTable("tables", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  capacity: integer("capacity").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
})

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  tableId: text("table_id").notNull().references(() => tables.id),
  type: text("type").notNull(),
  seats: integer("seats").notNull(),
  gameName: text("game_name"),
  reservationDate: timestamp("reservation_date", { withTimezone: true }).notNull(),
  duration: integer("duration").notNull().default(60),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  reservations: many(reservations),
  contactMessages: many(contactMessages),
}))

export const contactMessagesRelations = relations(contactMessages, ({ one }) => ({
  user: one(users, {
    fields: [contactMessages.email],
    references: [users.email],
  }),
}))

export const tablesRelations = relations(tables, ({ many }) => ({
  reservations: many(reservations),
}))

export const reservationsRelations = relations(reservations, ({ one }) => ({
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id],
  }),
  table: one(tables, {
    fields: [reservations.tableId],
    references: [tables.id],
  }),
}))