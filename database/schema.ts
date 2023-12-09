import {
  InferInsertModel,
  InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import { int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

const now = sql`CURRENT_TIMESTAMP`;

export const asset = mysqlTable("asset", {
  id: int("id").autoincrement().notNull().primaryKey(),
  createdAt: timestamp("created_at").notNull().default(now),
});

export type Asset = InferSelectModel<typeof asset>;
export type NewAsset = InferInsertModel<typeof asset>;

export const project = mysqlTable("project", {
  id: int("id").autoincrement().notNull().primaryKey(),
  createdAt: timestamp("created_at").notNull().default(now),
});

export type Project = InferSelectModel<typeof project>;
export type NewProject = InferInsertModel<typeof project>;

export const collection = mysqlTable("collection", {
  id: int("id").autoincrement().notNull().primaryKey(),
  createdAt: timestamp("created_at").notNull().default(now),
});

export const collectionRelations = relations(collection, ({ one, many }) => ({
  items: many(collectionItem),
}));

export type Collection = InferSelectModel<typeof collection>;
export type NewCollection = InferInsertModel<typeof collection>;

export const collectionItem = mysqlTable("collection_item", {
  id: int("id").autoincrement().notNull().primaryKey(),
  createdAt: timestamp("created_at").notNull().default(now),
  collectionId: int("collection_id").notNull(),
  projectId: int("project_id"),
  assetId: int("asset_id"),
});

export const collectionItemRelations = relations(collectionItem, ({ one }) => ({
  collection: one(collection, {
    fields: [collectionItem.collectionId],
    references: [collection.id],
  }),
  project: one(project, {
    fields: [collectionItem.projectId],
    references: [project.id],
  }),
  asset: one(asset, {
    fields: [collectionItem.assetId],
    references: [asset.id],
  }),
}));

export type CollectionItem = InferSelectModel<typeof collectionItem>;
export type NewCollectionItem = InferInsertModel<typeof collectionItem>;
