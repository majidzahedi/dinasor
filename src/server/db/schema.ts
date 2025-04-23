// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { type PgColumnBuilder, pgTableCreator } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { jsonlStreamProducer } from "@trpc/server/unstable-core-do-not-import";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `dinasor_${name}`);

export const user = createTable("user", (d) => ({
  id: d
    .varchar("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: d.varchar("name", { length: 255 }).notNull(),
  email: d.varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: d.boolean("email_verified").notNull(),
  image: d.varchar("image", { length: 255 }),
  createdAt: d
    .timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date()),
  role: d.varchar("role", { length: 255 }),
  banned: d.boolean("banned"),
  banReason: d.varchar("ban_reason", { length: 255 }),
  banExpires: d.timestamp("ban_expires", { withTimezone: true }),
  phoneNumber: d.varchar("phone_number", { length: 12 }).unique(),
  phoneNumberVerified: d.boolean("phone_number_verified"),
}));

export const session = createTable("session", (d) => ({
  id: d
    .varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  expiresAt: d.timestamp("expires_at", { withTimezone: true }).notNull(),
  token: d.varchar("token", { length: 255 }).notNull().unique(),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date()),
  ipAddress: d.varchar("ip_address", { length: 45 }), // IPv6 max length
  userAgent: d.varchar("user_agent", { length: 512 }),
  userId: d
    .varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: d.varchar("impersonated_by", { length: 255 }),
  activeOrganizationId: d.varchar("active_organization_id", { length: 255 }),
}));

export const account = createTable("account", (d) => ({
  id: d
    .varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  accountId: d.varchar("account_id", { length: 255 }).notNull(),
  providerId: d.varchar("provider_id", { length: 255 }).notNull(),
  userId: d
    .varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: d.varchar("access_token", { length: 1024 }),
  refreshToken: d.varchar("refresh_token", { length: 1024 }),
  idToken: d.varchar("id_token", { length: 1024 }),
  accessTokenExpiresAt: d.timestamp("access_token_expires_at", {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at", {
    withTimezone: true,
  }),
  scope: d.varchar("scope", { length: 512 }),
  password: d.varchar("password", { length: 255 }),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date()),
}));

export const verification = createTable("verification", (d) => ({
  id: d
    .varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  identifier: d.varchar("identifier", { length: 255 }).notNull(),
  value: d.varchar("value", { length: 512 }).notNull(),
  expiresAt: d.timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date()),
}));

export const organization = createTable("organization", (d) => ({
  id: d
    .varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: d.varchar("name", { length: 255 }).notNull(),
  slug: d.varchar("slug", { length: 255 }).unique(),
  logo: d.varchar("logo", { length: 512 }),
  address: d.varchar("address", { length: 100 }),
  phonenumber: d.varchar("phonenumber", { length: 20 }),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  metadata: d.text("metadata"), // can be JSON later
}));

export const organizationInsertSchema = createInsertSchema(organization);
export const organizationUpdateSchema = createUpdateSchema(organization);
export const organizationSelectSchema = createSelectSchema(organization);

export const member = createTable("member", (d) => ({
  id: d
    .varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  organizationId: d
    .varchar("organization_id", { length: 255 })
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  userId: d
    .varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: d.varchar("role", { length: 255 }).notNull(),
  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}));

export const invitation = createTable("invitation", (d) => ({
  id: d
    .varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  organizationId: d
    .varchar("organization_id", { length: 255 })
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  email: d.varchar("email", { length: 255 }).notNull(),
  role: d.varchar("role", { length: 255 }),
  status: d.varchar("status", { length: 50 }).notNull(),
  expiresAt: d.timestamp("expires_at", { withTimezone: true }).notNull(),
  inviterId: d
    .varchar("inviter_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
}));

export const todo = createTable("todo", (d) => ({
  id: d
    .varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: d.varchar("title", { length: 255 }).notNull(),
  description: d.varchar("description", { length: 255 }),
  status: d.varchar("status", { length: 50 }).default("pending"),
  dueDate: d.timestamp("expires_at", { withTimezone: true }),

  creatorId: d
    .varchar("creater_id", { length: 255 })
    .notNull()
    .references(() => user.id),
  organizationId: d
    .varchar("organization_id", { length: 255 })
    .references(() => organization.id),
  assignedTo: d
    .varchar("assigned_to", { length: 255 })
    .references(() => user.id),

  createdAt: d
    .timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: d
    .timestamp("updated_at", { withTimezone: true })
    .$onUpdate(() => new Date()),
}));

export const todoInsertSchema = createInsertSchema(todo);
export const todoUpdateSchema = createUpdateSchema(todo);
export const todoSelectSchema = createSelectSchema(todo);

/**
 * Property model: represents a property belonging to an organization and owned by a user.
 */
export const property = createTable("property", (d) => ({
  id: d.text("id").primaryKey(),
  name: d.text("name").notNull(),
  address: d.text("address"),
  createdAt: d.timestamp("created_at").notNull(),
  updatedAt: d.timestamp("updated_at").notNull(),
  organizationId: d
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  ownerId: d
    .text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "no action" }),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  members: many(member),
  properties: many(property),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member),
  properties: many(property),
}));

export const memberRelations = relations(member, ({ one }) => ({
  organization: one(organization, {
    fields: [member.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
}));

/**
 * Relations for Property table.
 */
export const propertyRelations = relations(property, ({ one }) => ({
  organization: one(organization, {
    fields: [property.organizationId],
    references: [organization.id],
  }),
  owner: one(user, {
    fields: [property.ownerId],
    references: [user.id],
  }),
}));
