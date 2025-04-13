// "use client"
// import { usePathname } from "next/navigation"
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
// import { data } from "@/components/app-sidebar" // adjust import path

// type ItemProps = {
//     title: string,
//     url: string,
//     icon: string,
//     isActive: boolean | null,
//     items:
//     { title: string, url: string }[]
// }

// const DashboardBreadcrumb = () => {
//     const pathname = usePathname()

//     const findTrail = (items, path) => {
//         for (const item of items) {
//             if (item.url === path) return [item]
//             if (item.items) {
//                 const sub = findTrail(item.items, path)
//                 if (sub.length) return [item, ...sub]
//             }
//         }
//         return []
//     }

//     const trail = findTrail(data.navMain, pathname)

//     return (
//         <Breadcrumb>
//             <BreadcrumbList>
//                 {trail.map((item, index) => (
//                     <div key={item.title} className="flex items-center">
//                         {index !== 0 && <BreadcrumbSeparator className="hidden md:block" />}
//                         <BreadcrumbItem className={index < trail.length - 1 ? "hidden md:block" : ""}>
//                             {index < trail.length - 1 ? (
//                                 <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
//                             ) : (
//                                 <BreadcrumbPage>{item.title}</BreadcrumbPage>
//                             )}
//                         </BreadcrumbItem>
//                     </div>
//                 ))}
//             </BreadcrumbList>
//         </Breadcrumb>
//     )
// }

// export default DashboardBreadcrumb


import React from 'react'

function DashboardBreadcrumb() {
    return (
        <div>DashboardBreadcrumb</div>
    )
}

export default DashboardBreadcrumb
