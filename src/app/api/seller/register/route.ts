import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { storeName, businessCategory, cnic, address, contactInfo, description } = body;

    // Check if seller already exists
    const existingSeller = await prisma.seller.findUnique({
      where: { userId: session.user.id },
    });

    if (existingSeller) {
      return NextResponse.json({ message: "Seller profile already exists" }, { status: 400 });
    }

    // Create Seller and update User role
    // Using transaction to ensure both happen or none
    await prisma.$transaction([
      prisma.seller.create({
        data: {
          userId: session.user.id,
          storeName,
          businessCategory,
          cnic,
          address,
          contactInfo,
          description,
          approved: false, // Explicitly false for manual check
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          role: "PENDING_SELLER",
        },
      }),
    ]);

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    console.error("Seller registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
