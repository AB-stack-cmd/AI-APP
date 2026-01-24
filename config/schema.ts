import { integer, pgTable, varchar,date } from "drizzle-orm/pg-core";
import { datetime } from "drizzle-orm/mysql-core";
import { json } from "drizzle-orm/gel-core";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const ProjectTable = pgTable("project",{
  id:integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId:varchar().notNull(),
  userInput:varchar(),
  device:varchar(),
  createOn:date().defaultNow(),
  userId:varchar().references(()=>usersTable.email).notNull()
})