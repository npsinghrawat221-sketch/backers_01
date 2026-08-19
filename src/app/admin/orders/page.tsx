import React from "react";
import { db } from "@/lib/db";
import { OrdersManagerClient } from "@/components/admin/OrdersManagerClient";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany();

  return <OrdersManagerClient initialOrders={orders} />;
}
