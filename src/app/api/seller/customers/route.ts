import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface CustomerData {
  id: string;
  name: string | null;
  email: string | null;
  totalOrders: number;
  totalSpent: string;
  lastOrder: Date | null;
  status: string;
}

export async function GET(): Promise<NextResponse<CustomerData[] | { error: string }>> {
  try {
    // Temporarily return mock data to isolate crypto module issue
    // TODO: Re-enable Prisma and auth once crypto issue is resolved
    
    const mockCustomers: CustomerData[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        totalOrders: 5,
        totalSpent: "$250.00",
        lastOrder: new Date(),
        status: "Active"
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        totalOrders: 3,
        totalSpent: "$150.00",
        lastOrder: new Date(Date.now() - 86400000),
        status: "Active"
      }
    ];

    return NextResponse.json(mockCustomers);
  } catch (error) {
    console.error("Seller customers fetch error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
