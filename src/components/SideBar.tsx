import React, { CSSProperties, useEffect, useState } from 'react'
import Image from 'next/image'
import NavBoardItem from './NavBoardItem'
import { useDialogs } from '@/context/useDialogsContext'
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks'
import { fetchBoardNavList } from '@/lib/features/boardNavigationList/boardNavigationListSlice'
import './SideBar.css'

type SidebarProps = {
    toggleTheme: () => void;
    toggleSidebar: () => void;
    isVisible: boolean
}

export default function SideBar({toggleTheme, toggleSidebar, isVisible}: SidebarProps) {
    const {dispatch: dialogDispatch} = useDialogs()
    const dispatch = useAppDispatch()
    const boardNavState = useAppSelector(state => state.boardNavList)

    useEffect(() => {
        dispatch(fetchBoardNavList())
    }, [dispatch])

    const showAddBoardDialog = () => {
        dialogDispatch({type: "OPEN_ADD_BOARD_DIALOG"})
    }
    return (
        <>
            <div className={`${isVisible? '' : 'hidden'} overflow-x-clip fixed z-10 md:static top-0 left-0 w-full md:w-auto bg-[rgba(0,0,0,0.3)] md:border-r border-line-color dark:border-line-dark-color sidebar-wrapper`}>
                <div className='h-[60vh] md:h-full overflow-auto relative bg-white dark:bg-dark-grey rounded-lg md:rounded-none w-9/12 md:w-full flex flex-col justify-between mx-auto mt-20 md:mt-0 scroller-decoration'>
                    <div>
                        <div className='text-heading-sm text-secondary-color p-5 sticky top-0 left-0 z-10 w-full bg-white dark:bg-dark-grey'>
                            ALL BOARDS ({boardNavState.boardNavList.length})
                        </div>
                        <ul className='text-secondary-color pr-8'>
                            {
                                boardNavState.boardNavList.map(item => {
                                    return (
                                        <NavBoardItem key={item.id} id={item.id} name={item.name}/>
                                    )
                                })
                            }
                            <li className='text-primary-color cursor-pointer' onClickCapture={showAddBoardDialog}>
                                <div className={`board-nav-item `}>
                                    <div className={`board-nav-icon bg-primary-color`} style={{'--mask-image-url': 'url("/images/icon-board.svg")'} as CSSProperties}></div>
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
                                        <div className='rounded-xl w-10 h-5 bg-primary-color px-0.5 flex items-center theme-switch'>
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
                            mt-6 mr-8
                            text-secondary-color
                            board-nav-item'
                            onClickCapture={toggleSidebar}
                        >
                            <div className='w-5'>
                                <div className={`board-nav-icon bg-medium-grey `} style={{'--mask-image-url': 'url("/images/icon-hide-sidebar.svg")'} as CSSProperties}>
                                </div>
                            </div>
                            <div>
                                Hide Sidebar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
