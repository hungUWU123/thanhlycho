"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const inStock = formData.get("inStock") !== "false";

  await prisma.product.update({
    where: { id },
    data: { stock, inStock },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  redirect("/admin/products");
}
