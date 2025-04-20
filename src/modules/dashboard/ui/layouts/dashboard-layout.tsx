import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashbardSidebar } from "../components/dashboard-sidebar";
import { DashbardNavbar } from "../components/dashboard-navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <DashbardSidebar />
      <SidebarInset>
        <DashbardNavbar />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
