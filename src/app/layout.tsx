import { Plus_Jakarta_Sans } from "next/font/google";
import BoardLayout from "@/components/BoardLayout";
import "./globals.scss";

const Plus_Jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    return (
        <html lang="en">
            <body className={`${Plus_Jakarta.className}`}>
                <BoardLayout >
                    {children}
                </BoardLayout>
            </body>
        </html>
    );
}
