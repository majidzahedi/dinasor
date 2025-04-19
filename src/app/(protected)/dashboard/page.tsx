import ProtectedRoute from "@/components/protected-route";
import { UserButton } from "@daveyplate/better-auth-ui";
import {
  Building2,
  Map,
  Tags,
  ListTodo,
  Settings,
  AreaChart,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

function Page() {
  return (
    <aside
      className="flex h-screen w-64 flex-col justify-between border-l border-gray-200 bg-white shadow-md"
      dir="rtl"
    >
      {/* Top Logo */}
      <div>
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-right text-xl font-bold text-indigo-700">
            زونکن
          </h2>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1 px-4">
          <SidebarItem icon={<Building2 size={20} />} label="بنگاه من" />
          <SidebarItem icon={<LayoutDashboard size={20} />} label="داشبورد" />
          <SidebarItem icon={<Map size={20} />} label="نقشه" />
          <SidebarItem icon={<Tags size={20} />} label="هشتگ" />
          <SidebarItem icon={<ListTodo size={20} />} label="وظایف" />
          <SidebarItem icon={<Settings size={20} />} label="تنظیمات" />
          <SidebarItem icon={<AreaChart size={20} />} label="گزارشات" />
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-4 py-4">
        <button className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-red-600">
          <UserButton size="full" classNames={{ base: "m-0" }} />
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition hover:bg-indigo-50 hover:text-indigo-700">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
export default function Route() {
  return (
    <ProtectedRoute>
      <Page />
    </ProtectedRoute>
  );
}
