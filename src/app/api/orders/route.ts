import { NextResponse } from "next/server";
import { sendOrderConfirmation } from "@/lib/email";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, productId, totalAmount, whatsappOrder, email, productName } = body;

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        whatsappOrder,
        orderItems: {
          create: {
            productId,
            price: totalAmount,
          },
        },
      },
    });

    // Send email confirmation in background
    if (email) {
      await sendOrderConfirmation(email, order.id, productName);
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
