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

    // Calculate analytics
    const dailyData: Record<string, number> = {};
    const categoryData: Record<string, number> = {};
    let totalRevenue = 0;
    let totalSales = 0;

    // Last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dailyData[dateStr] = 0;
    }

    seller.products.forEach(product => {
      categoryData[product.category] = (categoryData[product.category] || 0) + product.orderItems.length;
      
      product.orderItems.forEach(item => {
        const dateStr = item.order.createdAt.toISOString().split('T')[0];
        if (dailyData[dateStr] !== undefined) {
          dailyData[dateStr] += item.price;
        }
        totalRevenue += item.price;
        totalSales++;
      });
    });

    const dailyPerformance = Object.entries(dailyData).map(([date, value]) => ({
      date,
      value
    }));

    const topCategories = Object.entries(categoryData).map(([name, count]) => ({
      name,
      count
    })).sort((a, b) => b.count - a.count);

    return NextResponse.json({
      totalRevenue: `$${totalRevenue.toFixed(2)}`,
      totalSales,
      avgOrderValue: `$${totalSales > 0 ? (totalRevenue / totalSales).toFixed(2) : "0.00"}`,
      dailyPerformance,
      topCategories
    });

  } catch (error) {
    console.error("Seller analytics error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
