import React from "react";
import { Metadata } from "next";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const metadata: Metadata = {
  title: "Admin Dashboard | Velvet & Crumb Bakery",
  description: "Bakery management portal for orders, custom cake inquiries, menu, and analytics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
