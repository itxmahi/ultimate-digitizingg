import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userId, action } = await req.json();

    if (action === "APPROVE") {
      await prisma.$transaction([
        prisma.seller.update({
          where: { userId },
          data: { approved: true },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { role: "SELLER" },
        }),
      ]);
      return NextResponse.json({ message: "Seller approved successfully" });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Approve seller error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
