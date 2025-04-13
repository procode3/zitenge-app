import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import { headers } from "next/headers";

import Nav from "@/components/Nav";
import NavMobile from "@/components/NavMobile";
import Footer from "@/components/Footer";
import { CustomizationProvider } from "@/contexts/Customization";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Zitenge Dashboard",
	description: "Manage your orders and shoe racks",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headerList = await headers();
	const pathname = headerList.get("referer");
	const isDashboard =
		pathname?.includes("/dashboard") || pathname?.startsWith("/login");
	return (
		<html lang="en">
			<body className={`${quicksand.className} w-full antialiased `}>
				{" "}
				<CustomizationProvider>
					{!isDashboard && <Nav />}
					{!isDashboard && <NavMobile />}
					{children}
					{!isDashboard && <Footer />}
				</CustomizationProvider>
			</body>
		</html>
	);
}
