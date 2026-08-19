import React from "react";
import { db } from "@/lib/db";
import { CouponsManagerClient } from "@/components/admin/CouponsManagerClient";

export const revalidate = 0;

export default async function AdminCouponsPage() {
  const coupons = await db.coupon.findMany();
  return <CouponsManagerClient initialCoupons={coupons} />;
}
