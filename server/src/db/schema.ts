import { integer, decimal, pgTable, varchar, date, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  hashed_password: varchar({ length: 255 }).notNull(),
  timestamp: timestamp()
  // in the future of course it would be better to use email and/or OpenID google auth
  // + send verefication through email
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  jobs: many(jobsTable),
  days: many(daysTable),
}));

export const jobsTable = pgTable("jobs", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    owner: integer()
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    rate: decimal({ precision: 10, scale: 2 }).default('10.0').notNull()
});

export const jobsRelations = relations(jobsTable, ({ one, many }) => ({
  owner: one(usersTable, {
    fields: [jobsTable.owner],
    references: [usersTable.id],
  }),
  projects: many(projectsTable),
}));

export const projectsTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    parent_job: integer()
        .notNull()
        .references(() => jobsTable.id, { onDelete: "cascade" }),
});

export const projectsRelations = relations(projectsTable, ({ one, many }) => ({
  job: one(jobsTable, {
    fields: [projectsTable.parent_job],
    references: [jobsTable.id],
  }),
  days: many(daysTable),
}));

export const daysTable = pgTable("days", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  hours_worked: integer().notNull().default(0),
  cached_rate: decimal({ precision: 10, scale: 2 }),
  user_id: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  project_id: integer()
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  date: date().notNull(),
});

export const daysRelations = relations(daysTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [daysTable.user_id],
    references: [usersTable.id],
  }),
  project: one(projectsTable, {
    fields: [daysTable.project_id],
    references: [projectsTable.id],
  }),
}));