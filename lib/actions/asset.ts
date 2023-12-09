"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";

import db from "@/database";
import { asset } from "@/database/schema";

export async function createAssetAction() {
  await db.insert(asset).values({});
  revalidatePath("/");
}

export async function getAssetsAction() {
  return await db.query.asset.findMany({
    orderBy: desc(asset.createdAt),
  });
}

export async function getAssetAction(id: number) {
  return await db.query.asset.findFirst({ where: eq(asset.id, id) });
}
