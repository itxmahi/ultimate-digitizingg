import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth-simple";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock conversations for now
    const conversations = [
      {
        id: "conv_1",
        user: { name: "Sarah Jenkins", avatar: "https://i.pravatar.cc/100?img=1" },
        lastMessage: "Is the Royal Floral design compatible with Tajima machines?",
        time: "2h ago",
        unread: true
      },
      {
        id: "conv_2",
        user: { name: "Michael Chen", avatar: "https://i.pravatar.cc/100?img=2" },
        lastMessage: "Thanks for the quick deployment! The quality is insane.",
        time: "5h ago",
        unread: false
      },
      {
        id: "conv_3",
        user: { name: "Emma Wilson", avatar: "https://i.pravatar.cc/100?img=3" },
        lastMessage: "Can you create a custom protocol for a leather jacket?",
        time: "1d ago",
        unread: false
      }
    ];

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("Seller messages fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
