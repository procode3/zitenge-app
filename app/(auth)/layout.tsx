import { SessionProvider } from "next-auth/react"
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
                    <div className="flex h-screen w-full">

                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            {children}
                        </div>

                    </div>
                </SessionProvider>
            </body>
        </html>
    )
}
