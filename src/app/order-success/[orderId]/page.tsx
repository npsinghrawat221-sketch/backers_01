import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { OrderSuccessClient } from "@/components/order/OrderSuccessClient";

interface OrderSuccessPageProps {
  params: Promise<{ orderId: string }>;
}

export const metadata: Metadata = {
  title: "Order Confirmed | Velvet & Crumb Bakery",
  description: "Thank you for your order. Your artisanal cake celebration is confirmed.",
};

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const { orderId } = await params;

  const order = await db.order.findUnique({
    where: orderId.startsWith("BAK-") ? { orderNumber: orderId } : { id: orderId },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-screen">
      <OrderSuccessClient order={order} />
    </div>
  );
}
