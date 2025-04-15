import { SessionProvider } from "next-auth/react"
import { headers } from "next/headers";

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Quicksand } from "next/font/google";
import "../globals.css";
import { LucideProps } from 'lucide-react';
import {
    Settings2,
    SquareTerminal,
    ListChecks,
    CreditCard,
    BarChart,
} from "lucide-react"


const navItems: NavItem[] = [
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
        url: "/dashboard/settings",
        icon: Settings2,
        items: [
            { title: "General", url: "#" },
            { title: "Team", url: "/dashboard/settings/team" },
            { title: "Billing", url: "#" },
            { title: "Configurator", url: "/dashboard/settings/configurator" },
            { title: "Integrations", url: "#" },

        ],
    },
]


const quicksand = Quicksand({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");

    const rawTrail = findTrail(navItems, pathname)
    const trail = [
        { title: "Dashboard", url: "/dashboard" },
        ...rawTrail.filter(item => item.url !== "/dashboard"),
    ]
    return (
        <html lang="en">
            <body
                className={`${quicksand.className}  antialiased `}
            >
                <SessionProvider>
                    <SidebarProvider>
                        <div className="flex h-screen w-full">
                            <AppSidebar />
                            <SidebarInset className="flex flex-1 flex-col w-full ">
                                <header className="flex h-16 shrink-0 items-center gap-2">
                                    <div className="flex items-center justify-center gap-2 px-4">
                                        <SidebarTrigger className="-ml-1" />
                                        <Separator orientation="vertical" className="mr-2 h-4" />
                                        <Breadcrumb>
                                            <BreadcrumbList>
                                                {trail.map((item, index) => (
                                                    <div key={item.title} className="flex items-center">
                                                        {index > 0 && <BreadcrumbSeparator className="hidden md:block mr-2 my-auto" />}
                                                        <BreadcrumbItem className={index < trail.length - 1 ? "hidden md:block" : ""}>
                                                            {index < trail.length - 1 ? (
                                                                <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
                                                            ) : (
                                                                <BreadcrumbPage>{item.title}</BreadcrumbPage>
                                                            )}
                                                        </BreadcrumbItem>
                                                    </div>
                                                ))}
                                            </BreadcrumbList>
                                        </Breadcrumb>
                                    </div>
                                </header>
                                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                                    {children}
                                </div>
                            </SidebarInset>
                        </div>
                    </SidebarProvider>
                </SessionProvider>
            </body>
        </html>
    )
}



type NavItem = {
    title: string
    url: string
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    isActive?: boolean
    items?: NavItem[]
}

function findTrail(items: NavItem[], path: string | null): NavItem[] {
    for (const item of items) {
        if (item.url === path) return [item]
        if (item.items) {
            const subTrail = findTrail(item.items, path)
            if (subTrail.length) return [item, ...subTrail]
        }
    }
    return []
}