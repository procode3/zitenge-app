import { SessionProvider } from "next-auth/react"
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


const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {


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
                                    <div className="flex items-center gap-2 px-4">
                                        <SidebarTrigger className="-ml-1" />
                                        <Separator orientation="vertical" className="mr-2 h-4" />
                                        <Breadcrumb>
                                            <BreadcrumbList>
                                                <BreadcrumbItem className="hidden md:block">
                                                    <BreadcrumbLink href="#">{'Building Your Application'}</BreadcrumbLink>
                                                </BreadcrumbItem>
                                                <BreadcrumbSeparator className="hidden md:block" />
                                                <BreadcrumbItem>
                                                    <BreadcrumbPage>{'Data Fetching'}</BreadcrumbPage>
                                                </BreadcrumbItem>
                                                <BreadcrumbSeparator className="hidden md:block" />
                                                <BreadcrumbItem>
                                                    <BreadcrumbPage>{'Data Fetching'}</BreadcrumbPage>
                                                </BreadcrumbItem>
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
