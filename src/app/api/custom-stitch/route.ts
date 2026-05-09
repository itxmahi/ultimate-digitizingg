import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendCustomStitchEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const description = formData.get("description") as string;
    const stitchType = formData.get("stitchType") as string;
    const fabricType = formData.get("fabricType") as string;
    const size = formData.get("size") as string;
    const file = formData.get("file") as File;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Handle User Account (Create if not exists)
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split("@")[0],
          role: "BUYER",
        },
      });
    }

    // 2. Save Request to DB
    const request = await prisma.customStitchRequest.create({
      data: {
        userId: user.id,
        description,
        stitchType,
        fabricType,
        size,
        status: "PENDING",
      },
    });

    // 3. Prepare Email Attachment
    let imageAttachment;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      imageAttachment = {
        filename: file.name,
        content: buffer,
      };
    }

    // 4. Send Email to Admin
    await sendCustomStitchEmail({
      email,
      description,
      stitchType,
      fabricType,
      size,
      image: imageAttachment,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Protocol deployed successfully and email sent to admin.",
      requestId: request.id
    });

  } catch (error) {
    console.error("Custom stitch error:", error);
    return NextResponse.json({ error: "Failed to deploy protocol" }, { status: 500 });
  }
}
