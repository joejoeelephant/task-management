import React, { CSSProperties, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useBoardNavList } from '@/context/useBoardNavContext'
import NavBoardItem from './NavBoardItem'
import AddBoardDialog from './AddBoardDialog'
import { useDialogs } from '@/context/useDialogsContext'
import './SideBar.css'

type SidebarProps = {
    toggleTheme: () => void;
    toggleSidebar: () => void;
    isVisible: boolean
}

export default function SideBar({toggleTheme, toggleSidebar, isVisible}: SidebarProps) {
    const {state: boardNavList} = useBoardNavList()
    const {dispatch} = useDialogs()
    const showAddBoardDialog = () => {
        dispatch({type: "OPEN_ADD_BOARD_DIALOG"})
    }
    return (
        <>
            <div className={`${isVisible? '' : 'hidden'} overflow-x-clip fixed z-10 md:static top-0 left-0 w-full md:w-auto bg-[rgba(0,0,0,0.3)] md:border-r border-line-color dark:border-line-dark-color sidebar-wrapper`}>
                <div className='h-[60vh] md:h-full overflow-auto relative bg-white dark:bg-dark-grey rounded-lg md:rounded-none w-9/12 md:w-full flex flex-col justify-between mx-auto mt-20 md:mt-0 scroller-decoration'>
                    <div>
                        <div className='text-heading-sm text-secondary-color p-5 sticky top-0 left-0 z-10 w-full bg-white dark:bg-dark-grey'>
                            ALL BOARDS ({boardNavList.length})
                        </div>
                        <ul className='text-secondary-color pr-8'>
                            {
                                boardNavList.map(item => {
                                    return (
                                        <NavBoardItem key={item.id} id={item.id} name={item.name}/>
                                    )
                                })
                            }
                            <li className='text-accent-color cursor-pointer' onClickCapture={showAddBoardDialog}>
                                <div className={`flex gap-4 items-center text-heading-medium px-5 py-4 `}>
                                    <div className={`w-4 h-4 board-icon bg-main-purple`} style={{'--mask-image-url': 'url("/images/icon-board.svg")'} as CSSProperties}></div>
                                    <div>
                                        + Create New Noard
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='sticky bottom-0 w-full bg-white dark:bg-dark-grey py-5'>
                        <div className='px-3'>   
                            <div className='rounded-md bg-light-grey dark:bg-very-dark-grey flex justify-center gap-4 p-5'>
                                <div className='w-5'>
                                    <Image src={'/images/icon-light-theme.svg'} alt='dark' width={16} height={16} className='w-full'></Image>
                                </div>
                                <div>
                                    <label onChangeCapture={toggleTheme} className='cursor-pointer'>
                                        <input type="checkbox" className='theme-checkbox hidden'/>
                                        <div className='rounded-xl w-10 h-5 bg-main-purple px-0.5 flex items-center theme-switch'>
                                            <div className='w-3 h-3 rounded-full bg-white transition-all'></div>
                                        </div>
                                    </label>
                                </div>
                                <div className='w-5'>
                                    <Image src={'/images/icon-dark-theme.svg'} alt='dark' width={16} height={16} className='w-full'></Image>
                                </div>
                            </div>
                        </div>
                        <div className='
                            hidden md:flex 
                            gap-4 items-center 
                            px-5 py-4 
                            mt-2
                            rounded-tl-none rounded-bl-none rounded-tr-full rounded-br-full
                            hover:bg-secondary-button-hover-color text-secondary-color
                            mr-8 hover:text-accent-color dark:hover:bg-white
                            cursor-pointer nav-board-item'
                            onClickCapture={toggleSidebar}
                        >
                            <div className='w-5'>
                                <div className={`w-4 h-4 board-icon bg-medium-grey `} style={{'--mask-image-url': 'url("/images/icon-hide-sidebar.svg")'} as CSSProperties}>
                                </div>
                            </div>
                            <div className='text-heading-medium  ' >
                                Hide Sidebar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
