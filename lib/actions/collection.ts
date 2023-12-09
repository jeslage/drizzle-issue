"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";

import db from "@/database";
import { collection, collectionItem } from "@/database/schema";

export async function createCollectionAction() {
  await db.insert(collection).values({});
  revalidatePath("/");
}

export async function getCollectionsAction() {
  return await db.query.collection.findMany({
    orderBy: desc(collection.createdAt),
    with: {
      items: {
        with: {
          project: true,
          asset: true,
        },
      },
    },
  });
}

export async function getCollectionAction(id: number) {
  return await db.query.collection.findFirst({
    where: eq(collection.id, id),
    with: {
      items: {
        with: {
          project: true,
          asset: true,
        },
      },
    },
  });
}

type AddToCollectionActionProps = {
  collectionId: number;
  projectId?: number;
  assetId?: number;
};

export async function addToCollectionAction({
  collectionId,
  projectId,
  assetId,
}: AddToCollectionActionProps) {
  await db.insert(collectionItem).values({
    collectionId,
    projectId,
    assetId,
  });

  revalidatePath("/");
}
