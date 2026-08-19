import React from "react";
import { db } from "@/lib/db";
import { CustomCakesManagerClient } from "@/components/admin/CustomCakesManagerClient";

export const revalidate = 0;

export default async function AdminCustomCakesPage() {
  const inquiries = await db.customCakeRequest.findMany();

  return <CustomCakesManagerClient initialInquiries={inquiries} />;
}
