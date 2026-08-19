import { NextRequest, NextResponse } from "next/server";
import { sendAutomatedWhatsAppMessage } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, message, type } = body;

    const recipient = to || siteConfig.contact.whatsapp;
    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message content is required" },
        { status: 400 }
      );
    }

    const result = await sendAutomatedWhatsAppMessage(recipient, message);
    return NextResponse.json({
      success: true,
      delivered: result.success,
      type: type || "NOTIFICATION",
    });
  } catch (error) {
    console.error("WhatsApp API notification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
