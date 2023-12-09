"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";

import { project } from "@/database/schema";
import db from "@/database";

export async function createProjectAction() {
  await db.insert(project).values({});
  revalidatePath("/");
}

export async function getProjectsAction() {
  return await db.query.project.findMany({
    orderBy: desc(project.createdAt),
  });
}

export async function getProjectAction(id: number) {
  return await db.query.project.findFirst({
    where: eq(project.id, id),
  });
}
