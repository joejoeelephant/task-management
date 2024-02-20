// Import necessary hooks and components
'use client'
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import ShowSidebarButton from "@/components/ShowSidebarButton";
import { useTheme } from "@/hooks/useTheme";
import { useIsWindowWide } from "@/hooks/useIsWindowWide";
import React, { useEffect, useState } from "react";
import { BoardNavListProvider } from "@/context/useBoardNavContext";
import { BoardDataProvider } from "@/context/useBoardDataContext";
import { DialogsProvider } from "@/context/useDialogsContext";
// Initialize the font
const Plus_Jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

// The component function
export default function BoardLayout({ children }: {children: React.ReactNode}) {
    const {theme, setTheme} = useTheme()
    const [isSideShow, setIsSideShow] = useState(true)
    const isWindowWide = useIsWindowWide()
    const [sidebarVisible, setSidebarVisible] = useState(isWindowWide)

    useEffect(() => {
        setSidebarVisible(isWindowWide)
    },[isWindowWide])

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? '' : 'dark');
    }
    const toggleSidebar = () => {
        setIsSideShow(prev => !prev);
    }

    const toggleSidebarVisible = () => {
        setSidebarVisible(prev => !prev);
    }

    return (
        <div className={`${Plus_Jakarta.className} ${isSideShow ? '' : 'sidebar-collapes'} ${theme} min-h-screen body-wrapper`}>
            <BoardNavListProvider>
                <BoardDataProvider>
                    <DialogsProvider>
                        <Header sidebarVisible={sidebarVisible} toggleSidebarVisible={toggleSidebarVisible} />
                        <div className={`main-wrapper transition-all duration-500`}>
                            <SideBar toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} isVisible={sidebarVisible} />
                            <main className="relative bg-light-grey dark:bg-very-dark-grey col-start-2">
                                {children}
                                <ShowSidebarButton isVisible={!isSideShow} toggleSidebar={toggleSidebar}/>
                            </main>
                        </div>
                    </DialogsProvider>
                </BoardDataProvider>
            </BoardNavListProvider>
        </div>
    );
}
