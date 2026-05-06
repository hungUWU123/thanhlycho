import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, address, items, total } = body;

    if (!customerName || !phone || !address || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Use transaction: create order + deduct stock atomically
    const order = await prisma.$transaction(async (tx) => {
      // Check stock for all items first
      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.id } });
        if (!product) {
          throw new Error(`Sản phẩm không tồn tại: ${item.id}`);
        }
        if (!product.inStock || product.stock < item.quantity) {
          throw new Error(`Sản phẩm "${product.name}" không đủ hàng. Còn lại: ${product.stock}`);
        }
      }

      // Create order
      const newOrder = await tx.order.create({
        data: {
          customerName,
          phone,
          address,
          total,
          status: "PENDING",
          orderItems: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // Deduct stock for each item
      for (const item of items) {
        const updated = await tx.product.update({
          where: { id: item.id },
          data: {
            stock: { decrement: item.quantity },
          },
        });
        // Auto mark out of stock if stock reaches 0
        if (updated.stock <= 0) {
          await tx.product.update({
            where: { id: item.id },
            data: { inStock: false, stock: 0 },
          });
        }
      }

      return newOrder;
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error: any) {
    console.error("Checkout Error:", error);
    const isStockError = error?.message?.includes("không đủ hàng") || error?.message?.includes("không tồn tại");
    return NextResponse.json(
      { error: isStockError ? error.message : "Đặt hàng thất bại, vui lòng thử lại." },
      { status: isStockError ? 400 : 500 }
    );
  }
}
