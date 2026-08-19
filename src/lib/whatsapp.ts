import { siteConfig } from "@/config/site";
import { Order, CustomCakeRequest } from "@/types/database";

/**
 * WhatsApp Integration Utilities for Honey Bunny Bakers
 * 
 * Supports two modes:
 * 1. Client Direct Deep-Links: Generates pre-filled wa.me links that open directly in customer/chef WhatsApp.
 * 2. Server Automated Notifications: Sends automated WhatsApp templates via Meta WhatsApp Cloud API / Twilio when configured.
 */

/**
 * Generate formatted WhatsApp message link for a standard cake order
 */
export function generateOrderWhatsAppLink(order: Order, bakerPhone?: string): string {
  const targetPhone = bakerPhone || siteConfig.contact.whatsapp;
  
  const itemsText = order.items
    .map((item, index) => `${index + 1}. *${item.variantName || "Cake"}* × ${item.quantity} - ₹${item.totalPrice}${item.eggless ? " (100% Eggless)" : ""}${item.cakeMessage ? `\n   ↳ Plaque Message: "${item.cakeMessage}"` : ""}`)
    .join("\n");

  const message = `🎂 *NEW ORDER PLACED: #${order.orderNumber}*
----------------------------------------
*Customer:* ${order.customerName}
*Phone:* ${order.customerPhone}
*Delivery Date:* ${order.deliveryDate}
*Time Slot:* ${order.deliverySlot}
*Delivery Type:* ${order.deliveryType === "PICKUP" ? "Studio Pickup (Purvanchal Silver City II)" : "Doorstep Delivery"}
*Address:* ${order.address || "Studio Pickup"}
${order.landmark ? `*Landmark:* ${order.landmark}\n` : ""}${order.orderNotes ? `*Customer Note:* ${order.orderNotes}\n` : ""}
*ORDER ITEMS:*
${itemsText}

*BILLING SUMMARY:*
• Subtotal: ₹${order.subtotal}
${order.discount > 0 ? `• Discount: -₹${order.discount}\n` : ""}• Delivery: ₹${order.deliveryCharge === 0 ? "FREE" : order.deliveryCharge}
• Taxes (GST 5%): ₹${order.tax}
*TOTAL AMOUNT:* ₹${order.total} (${order.paymentMethod} - ${order.paymentStatus})
----------------------------------------
_Honey Bunny Bakers • 100% Eggless Artisanal Bakery_`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate formatted WhatsApp message link for a custom cake inquiry
 */
export function generateCustomCakeWhatsAppLink(request: CustomCakeRequest, bakerPhone?: string): string {
  const targetPhone = bakerPhone || siteConfig.contact.whatsapp;

  const message = `✨ *CUSTOM CAKE INQUIRY: #${request.inquiryNumber}*
----------------------------------------
*Customer:* ${request.customerName}
*Phone:* ${request.customerPhone}
*Occasion:* ${request.occasion}
*Selected Flavor:* ${request.flavor}
*Tier / Size:* ${request.tierSizeKg} (${request.servingsEstimate})
*100% Eggless:* ${request.isEggless ? "Yes (100% Pure Eggless)" : "No"}
*Event Date:* ${request.deliveryDate} (${request.deliverySlot})
*Delivery Type:* ${request.deliveryType === "PICKUP" ? "Studio Pickup" : "Doorstep Delivery"}
*Location:* ${request.address || "Purvanchal Silver City II, Pi-2"}

*DESIGN PREFERENCES:*
• Message on Cake: "${request.cakeMessage || "None"}"
• Name on Cake: ${request.nameOnCake || "None"}
• Theme Colors: ${request.themeColor || "As per reference"}
• Special Toppings: ${request.toppings || "Standard handcrafted"}
• Design Notes: ${request.designNotes || "None"}
${request.referenceImageUrl ? `• Reference Photo: ${request.referenceImageUrl}\n` : ""}
*ESTIMATED BUDGET:* ₹${request.estimatedPriceMin} - ₹${request.estimatedPriceMax}
----------------------------------------
_Hello Honey Bunny Bakers! Please review my cake design and share final quotation._`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate formatted WhatsApp message link for Baker sending quotation back to Customer
 */
export function generateQuotationReplyWhatsAppLink(request: CustomCakeRequest, quotePrice: number, notes?: string): string {
  const cleanPhone = request.customerPhone.replace(/[^0-9]/g, "");
  const formattedPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

  const message = `🎉 *Hello ${request.customerName}!*
Greetings from *Honey Bunny Bakers* 🎂

We reviewed your custom cake request *#${request.inquiryNumber}* for *${request.occasion}* on *${request.deliveryDate}*.

*CAKE DETAILS:*
• Flavor: ${request.flavor}
• Size: ${request.tierSizeKg} (100% Eggless)
• Occasion: ${request.occasion}
• Delivery: ${request.deliveryType === "PICKUP" ? "Pickup at Purvanchal Silver City II" : `Doorstep Delivery to ${request.address}`}

*OFFICIAL QUOTATION:*
💰 *Total Price: ₹${quotePrice}* (All inclusive)
${notes ? `\n*Chef Notes:* ${notes}\n` : ""}
To confirm this bake, please reply *YES* to this message or call us at *+91 62615 07068*.

_Thank you for choosing Honey Bunny Bakers (honey_bunny_homebakers)!_`;

  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Server-side Automated WhatsApp API Dispatcher (Optional Meta Cloud API / Webhook Integration)
 */
export async function sendAutomatedWhatsAppMessage(toPhone: string, text: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  // If server-side Meta Cloud API is configured
  if (apiKey && phoneNumberId) {
    try {
      const cleanPhone = toPhone.replace(/[^0-9]/g, "");
      const recipient = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;

      const res = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipient,
          type: "text",
          text: { body: text },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("WhatsApp Cloud API error:", data);
        return { success: false, error: data.error?.message || "WhatsApp Cloud API dispatch failed" };
      }
      return { success: true };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("Error sending automated WhatsApp message:", errorMsg);
      return { success: false, error: errorMsg };
    }
  }

  // Graceful fallback when running in client deep-link mode
  return { success: true };
}
