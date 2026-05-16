import { NextResponse } from "next/server";
import { sendOrderConfirmation } from "@/lib/email";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, productId, totalAmount, email, productName } = body;

    // Get product to find seller
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        sellerId: product.sellerId,
        totalAmount,
        items: {
          create: {
            productId,
            price: totalAmount,
            quantity: 1,
          },
        },
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        },
        seller: {
          include: {
            user: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
