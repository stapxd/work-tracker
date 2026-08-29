import { integer, decimal, pgTable, varchar, date, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  hashed_password: varchar("hashed_password", { length: 255 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  // in the future of course it would be better to use email and/or OpenID google auth
  // + send verefication through email
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  jobs: many(jobsTable),
  days: many(daysTable),
}));

export const jobsTable = pgTable("jobs", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    owner: integer("owner")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    rate: decimal("rate", { precision: 10, scale: 2 }).default('0.0').notNull()
});

export const jobsRelations = relations(jobsTable, ({ one, many }) => ({
  owner: one(usersTable, {
    fields: [jobsTable.owner],
    references: [usersTable.id],
  }),
  projects: many(projectsTable),
}));

export const projectsTable = pgTable("projects", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    parent_job: integer("parent_job")
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
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  hours_worked: integer("hours_worked").notNull().default(0),
  cached_rate: decimal({ precision: 10, scale: 2 }),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  project_id: integer("project_id")
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
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