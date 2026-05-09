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

    // Get unique customers who ordered items from this seller
    const customers = await prisma.user.findMany({
      where: {
        orders: {
          some: {
            items: {
              some: {
                product: {
                  sellerId: seller.id
                }
              }
            }
          }
        }
      },
      include: {
        orders: {
          where: {
            items: {
              some: {
                product: {
                  sellerId: seller.id
                }
              }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    });

    const customerData = customers.map(user => {
      const totalSpent = user.orders.reduce((sum, o) => sum + o.totalAmount, 0);
      return {
        id: user.id,
        name: user.name || user.email,
        email: user.email,
        totalOrders: user.orders.length,
        totalSpent: `$${totalSpent.toFixed(2)}`,
        lastOrder: user.orders[0]?.createdAt || null,
        status: "Active" // Mock status
      };
    });

    return NextResponse.json(customerData);
  } catch (error) {
    console.error("Seller customers fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
