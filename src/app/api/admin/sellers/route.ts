import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const sellers = await prisma.seller.findMany({
      where: {
        approved: status === "PENDING" ? false : true,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(sellers);
  } catch (error) {
    console.error("Fetch sellers error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
