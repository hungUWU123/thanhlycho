import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone")?.trim();

  if (!phone) {
    return NextResponse.json({ error: "Vui lòng nhập số điện thoại" }, { status: 400 });
  }

  const orders = await prisma.order.findMany({
    where: { phone },
    include: {
      orderItems: {
        include: {
          product: { select: { name: true, image: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders });
}
