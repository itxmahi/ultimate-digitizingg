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
      where: { userId: session.user.id },
      include: {
        products: {
          include: {
            orderItems: {
              include: {
                order: true
              }
            }
          }
        }
      }
    });

    if (!seller) {
      return NextResponse.json({ error: "Not a seller" }, { status: 403 });
    }

    // Calculate Stats
    let netVolume = 0;
    let activeOrders = 0;
    const clientIds = new Set();
    const recentOrders: any[] = [];

    seller.products.forEach(product => {
      product.orderItems.forEach(item => {
        netVolume += item.price;
        if (item.order.status === "PENDING" || item.order.status === "PROCESSING") {
          activeOrders++;
        }
        clientIds.add(item.order.userId);
        
        // Collect for recent orders
        recentOrders.push({
          id: item.order.id.slice(-4),
          customer: item.order.userId.slice(-6), // Placeholder since we don't have name in User easily without fetching
          product: product.name,
          amount: `$${item.price.toFixed(2)}`,
          status: item.order.status,
          date: item.order.createdAt,
          img: product.images[0]
        });
      });
    });

    // Sort recent orders
    recentOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      stats: [
        { name: "NET VOLUME", value: `$${netVolume.toLocaleString()}`, change: "+12.5%", icon: "DollarSign", color: "text-chart-2", bg: "bg-chart-2/10" },
        { name: "ACTIVE ORDERS", value: activeOrders.toString(), change: "+5.2%", icon: "ShoppingBag", color: "text-primary", bg: "bg-primary/10" },
        { name: "LOYAL CLIENTS", value: clientIds.size.toString(), change: "+8.1%", icon: "Users", color: "text-chart-4", bg: "bg-chart-4/10" },
        { name: "CONVERSION", value: "4.2%", change: "+0.5%", icon: "TrendingUp", color: "text-chart-5", bg: "bg-chart-5/10" },
      ],
      recentOrders: recentOrders.slice(0, 5),
      chartData: [40, 60, 45, 90, 65, 85, 55, 75, 40, 60, 45, 90] // Mock for now or calculate from daily sales
    });

  } catch (error) {
    console.error("Seller stats error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
