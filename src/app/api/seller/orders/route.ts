import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const seller = await prisma.seller.findUnique({
      where: { userId: session.user.id }
    });

    if (!seller) {
      return NextResponse.json({ error: "Not a seller" }, { status: 403 });
    }

    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              sellerId: seller.id
            }
          }
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Seller orders fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderId, status } = body;

    // Check if the order contains items from this seller
    const seller = await prisma.seller.findUnique({
      where: { userId: session.user.id }
    });

    if (!seller) {
      return NextResponse.json({ error: "Not a seller" }, { status: 403 });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        items: {
          some: {
            product: {
              sellerId: seller.id
            }
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found or access denied" }, { status: 404 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Order status update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
