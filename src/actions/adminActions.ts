"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import path from "path";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const originalPriceStr = formData.get("originalPrice") as string;
  const originalPrice = originalPriceStr ? parseFloat(originalPriceStr) : null;
  const condition = formData.get("condition") as string;
  const categoryId = formData.get("categoryId") as string;
  const imageUrl = formData.get("image") as string;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const inStock = formData.get("inStock") !== "false";

  if (!name || !price || !categoryId) {
    throw new Error("Thiếu thông tin bắt buộc");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      originalPrice,
      condition,
      categoryId,
      image: imageUrl,
      stock,
      inStock,
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const originalPriceStr = formData.get("originalPrice") as string;
  const originalPrice = originalPriceStr ? parseFloat(originalPriceStr) : null;
  const condition = formData.get("condition") as string;
  const categoryId = formData.get("categoryId") as string;
  const imageUrl = formData.get("image") as string;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const inStock = formData.get("inStock") === "true";

  await prisma.product.update({
    where: { id },
    data: { name, description, price, originalPrice, condition, categoryId, image: imageUrl, stock, inStock },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get("productId") as string;
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  if (!name) throw new Error("Tên danh mục là bắt buộc");
  await prisma.category.create({ data: { name, description } });
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get("categoryId") as string;
  // Check if category has products
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count > 0) throw new Error("Không thể xóa danh mục đang có sản phẩm");
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

export async function deleteOrder(formData: FormData) {
  const id = formData.get("orderId") as string;
  await prisma.order.delete({ where: { id } });
  revalidatePath("/admin/orders");
}


export async function updateOrderStatus(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as string;

  if (!orderId || !status) throw new Error("Thiếu thông tin");

  const validStatuses = ["PENDING", "SHIPPING", "COMPLETED", "CANCELLED"];
  if (!validStatuses.includes(status)) throw new Error("Trạng thái không hợp lệ");

  // If cancelling, restore stock in a transaction
  if (status === "CANCELLED") {
    await prisma.$transaction(async (tx: any) => {
      // Get the order with its items
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { orderItems: true },
      });

      if (!order) throw new Error("Đơn hàng không tồn tại");
      if (order.status === "CANCELLED") throw new Error("Đơn hàng đã được hủy trước đó");
      if (order.status === "COMPLETED") throw new Error("Không thể hủy đơn đã hoàn thành");

      // Restore stock for each item
      for (const item of order.orderItems) {
        const updated = await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
        // Auto mark back in stock if stock > 0
        if (updated.stock > 0) {
          await tx.product.update({
            where: { id: item.productId },
            data: { inStock: true },
          });
        }
      }

      // Update order status
      await tx.order.update({
        where: { id: orderId },
        data: { status: "CANCELLED" },
      });
    });
  } else {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  revalidatePath("/admin/orders");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function loginAdmin(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    const { cookies } = await import("next/headers");
    (await cookies()).set("admin_session", "true", { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 // 1 day
    });
    return true;
  }
  return false;
}

export async function logoutAdmin() {
  const { cookies } = await import("next/headers");
  (await cookies()).delete("admin_session");
  redirect("/admin/login");
}
