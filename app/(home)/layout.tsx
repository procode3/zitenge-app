import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";

import { CustomizationProvider } from "@/contexts/Customization";
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import NavMobile from '@/components/NavMobile';


const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Zitenge",
    description: "Customized and collapsable shoe racks",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${quicksand.className} antialiased`}>
                <CustomizationProvider>
                    <Nav />
                    <NavMobile />
                    {children}
                    <Footer />
                </CustomizationProvider>
            </body>
        </html>
    );
}
