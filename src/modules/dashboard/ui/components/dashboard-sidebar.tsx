"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@daveyplate/better-auth-ui";
import {
  LayoutDashboardIcon,
  FolderIcon,
  BarChartIcon,
  UsersIcon,
  ListIcon,
  FileTextIcon,
  DatabaseIcon,
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
  ClipboardListIcon,
  FileIcon,
  FileCodeIcon,
  WatchIcon,
} from "lucide-react";
import { NavMain } from "./nav/main-nav";
import { NavDocuments } from "./nav/documents-nav";
import { NavSecondary } from "./nav/secondary-nav";

const data = {
  user: {
    name: "شخصی",
    email: "example@email.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "داشبورد",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "املاک",
      url: "/dashboard/property",
      icon: FolderIcon,
    },
    {
      title: "معاملات",
      url: "/dashboard/deal",
      icon: BarChartIcon,
    },
    {
      title: "مشتریان",
      url: "/dashboard/contact",
      icon: UsersIcon,
    },
    {
      title: "وظایف",
      url: "/dashboard/todo",
      icon: ListIcon,
    },
    {
      title: "بازدید",
      url: "/dashboard/meeting",
      icon: WatchIcon,
    },
  ],
  navClouds: [
    {
      title: "اسناد ملک",
      icon: FileTextIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "در حال استفاده",
          url: "#",
        },
        {
          title: "بایگانی‌شده",
          url: "#",
        },
      ],
    },
    {
      title: "قراردادها",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "قراردادهای فعال",
          url: "#",
        },
        {
          title: "بایگانی‌شده",
          url: "#",
        },
      ],
    },
    {
      title: "امور مالی",
      icon: DatabaseIcon,
      url: "#",
      items: [
        {
          title: "فاکتورها",
          url: "#",
        },
        {
          title: "رسیدها",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "تنظیمات",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "راهنما",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "جستجو",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "کتابخانه اسناد",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "گزارشات",
      url: "#",
      icon: FileIcon,
    },
    {
      name: "دستیار نوشتار",
      url: "#",
      icon: FileCodeIcon,
    },
  ],
};

export const DashbardSidebar = () => {
  return (
    <Sidebar collapsible="offcanvas" side="right" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span className="text-base font-semibold">زونکن</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserButton
          classNames={{
            trigger: {
              base: "bg-inherit border-none shadow-none outline-none flex-row-reverse",
              user: {
                p: "text-right",
              },
            },
          }}
          size="full"
        />
      </SidebarFooter>
    </Sidebar>
  );
};
