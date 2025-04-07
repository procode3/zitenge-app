"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
  ListChecks,
  CreditCard,
  BarChart,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Erick Barasa",
    email: "eb@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Zitenge Handcrafts",
      logo: GalleryVerticalEnd,
      plan: "Utawala",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Orders",
      url: "#",
      icon: ListChecks,
      isActive: true,
      items: [
        { title: "All Orders", url: "/dashboard/orders" },
        { title: "Pending", url: "#" },
        { title: "Completed", url: "#" },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: CreditCard,
      items: [
        { title: "Transactions", url: "#" },
        { title: "Pending Payments", url: "#" },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: BarChart,
      items: [
        { title: "Sales", url: "#" },
        { title: "Inventory", url: "#" },
        { title: "Customers", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Billing", url: "#" },
        { title: "Configurator", url: "/dashboard/settings/configurator" },
        { title: "Integrations", url: "#" },

      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
