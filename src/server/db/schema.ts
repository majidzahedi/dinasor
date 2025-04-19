// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `dinasor_${name}`);

export const user = createTable("user", (d) => ({
  id: d.text("id").primaryKey(),
  name: d.text("name").notNull(),
  email: d.text("email").notNull().unique(),
  emailVerified: d.boolean("email_verified").notNull(),
  image: d.text("image"),
  createdAt: d.timestamp("created_at").notNull(),
  updatedAt: d.timestamp("updated_at").notNull(),
  role: d.text("role"),
  banned: d.boolean("banned"),
  banReason: d.text("ban_reason"),
  banExpires: d.timestamp("ban_expires"),
  phoneNumber: d.text("phone_number").unique(),
  phoneNumberVerified: d.boolean("phone_number_verified"),
}));

export const session = createTable("session", (d) => ({
  id: d.text("id").primaryKey(),
  expiresAt: d.timestamp("expires_at").notNull(),
  token: d.text("token").notNull().unique(),
  createdAt: d.timestamp("created_at").notNull(),
  updatedAt: d.timestamp("updated_at").notNull(),
  ipAddress: d.text("ip_address"),
  userAgent: d.text("user_agent"),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: d.text("impersonated_by"),
  activeOrganizationId: d.text("active_organization_id"),
}));

export const account = createTable("account", (d) => ({
  id: d.text("id").primaryKey(),
  accountId: d.text("account_id").notNull(),
  providerId: d.text("provider_id").notNull(),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: d.text("access_token"),
  refreshToken: d.text("refresh_token"),
  idToken: d.text("id_token"),
  accessTokenExpiresAt: d.timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at"),
  scope: d.text("scope"),
  password: d.text("password"),
  createdAt: d.timestamp("created_at").notNull(),
  updatedAt: d.timestamp("updated_at").notNull(),
}));

export const verification = createTable("verification", (d) => ({
  id: d.text("id").primaryKey(),
  identifier: d.text("identifier").notNull(),
  value: d.text("value").notNull(),
  expiresAt: d.timestamp("expires_at").notNull(),
  createdAt: d.timestamp("created_at"),
  updatedAt: d.timestamp("updated_at"),
}));

export const organization = createTable("organization", (d) => ({
  id: d.text("id").primaryKey(),
  name: d.text("name").notNull(),
  slug: d.text("slug").unique(),
  logo: d.text("logo"),
  createdAt: d.timestamp("created_at").notNull(),
  metadata: d.text("metadata"),
}));

export const member = createTable("member", (d) => ({
  id: d.text("id").primaryKey(),
  organizationId: d
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  userId: d
    .text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: d.text("role").notNull(),
  createdAt: d.timestamp("created_at").notNull(),
}));

export const invitation = createTable("invitation", (d) => ({
  id: d.text("id").primaryKey(),
  organizationId: d
    .text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),
  email: d.text("email").notNull(),
  role: d.text("role"),
  status: d.text("status").notNull(),
  expiresAt: d.timestamp("expires_at").notNull(),
  inviterId: d
    .text("inviter_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  members: many(member),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const organizationRelations = relations(organization, ({ many }) => ({
  members: many(member),
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
