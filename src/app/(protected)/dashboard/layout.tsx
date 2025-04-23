import { DashboardLayout } from "@/modules/dashboard/ui/layouts/dashboard-layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
