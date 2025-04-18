import { SessionProvider } from "next-auth/react"
import { Quicksand } from "next/font/google";
import "../globals.css";
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { CustomizationProvider } from "@/contexts/Customization";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {


    return (
        <html lang="en">
            <body
                className={`${quicksand.className}  antialiased `}
            >
                <SessionProvider>
                    <div className="flex flex-col h-screen w-full items-center scroll-smooth">
                        <div className='flex justify-between items-center content-center h-16 p-4 w-4/5 '>
                            <p className='text-lg font-semibold'>Zitenge Checkout</p>
                            <Link href="/cart"><ShoppingBag strokeWidth={0.75} size={20} /></Link>
                        </div>
                        <hr className=' w-full bg-slate-200 dark:bg-gray-700' />
                        <div className="flex flex-1 flex-col gap-4 pt-0 w-full">
                            <CustomizationProvider>
                                {children}
                            </CustomizationProvider>

                        </div>

                    </div>
                </SessionProvider>
            </body>
        </html>
    )
}
