import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth-simple";

export const runtime = "nodejs";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        seller: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const seller = await prisma.seller.findUnique({
      where: { userId: session.user.id }
    });

    if (!seller) {
      return NextResponse.json({ error: "User is not a seller" }, { status: 403 });
    }

    const body = await req.json();
    const { 
      name, 
      description, 
      price, 
      category, 
      images, 
      stitchCount,
      isFlashSale, 
      discountPercentage,
      originalPrice,
      discountedPrice
    } = body;

    // Create the product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        sellerId: seller.id,
        images,
        flashSale: isFlashSale ? {
          isFlashSale: true,
          originalPrice: originalPrice || price,
          discountedPrice: discountedPrice || price,
          discountPercentage: discountPercentage || null,
        } : undefined,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
