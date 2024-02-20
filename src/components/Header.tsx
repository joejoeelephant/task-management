'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useBoardData } from '@/context/useBoardDataContext'
import { useDialogs } from '@/context/useDialogsContext'
import './Header.css'

type Props = {
    sidebarVisible: boolean;
    toggleSidebarVisible: () => void;
}

export default function Header({sidebarVisible, toggleSidebarVisible}: Props) {
    const [menuVisible, setMenuVisible] = useState(false)
    const {state} = useBoardData()
    const {dispatch} = useDialogs()

    const showDeleteBoardAction = () => {
        setMenuVisible(false)
        dispatch({type: "OPEN_DELETE_BOARD_DIALOG"})
    }

    const showEditBoardAction = () => {
        setMenuVisible(false)
        dispatch({type: "OPEN_EDIT_BOARD_DIALOG"})
    }

    const showAddTaskDialogAction = () => {
        if(state && state.statusList.length < 1) return;
        dispatch({type: "OPEN_ADD_TASK_DIALOG"})

    }
    return (
        <>
            <header className='sticky w-full top-0 left-0 bg-white dark:bg-dark-grey z-20 flex items-center justify-between '>
                <div className='flex items-center self-stretch relative'  >
                    <div className='header-logo-wrapper pl-4 md:px-6 md:border-r border-line-color dark:border-line-dark-color self-stretch flex items-center duration-500'>
                        <Image src={'/images/logo-mobile.svg'} alt='logo' width={24} height={25} className='w-full md:hidden'></Image>
                        <Image src={'/images/logo-dark.svg'} alt='logo' width={24} height={25} className='w-40 hidden md:block dark:hidden'></Image>
                        <Image src={'/images/logo-light.svg'} alt='logo' width={24} height={25} className='w-40 hidden md:dark:block'></Image>
                    </div>
                </div>
                <div className='flex-1 self-stretch flex justify-between items-center px-4 md:px-6 md:border-b border-line-color dark:border-line-dark-color'>
                    <div className='relative flex items-center gap-1'>
                        <div className='logo-mask absolute left-0 top-0 w-full h-full md:hidden ' onClickCapture={toggleSidebarVisible}></div>
                        <h1 className='text-heading-lg md:text-heading-xl text-primary-heading-color dark:text-white'>
                            Platform Launch
                        </h1>
                        <div className='w-3 md:hidden'>
                            <Image src={`${sidebarVisible ? '/images/icon-chevron-up.svg' : '/images/icon-chevron-down.svg'}`} alt='up' width={10} height={7} className='w-full'></Image>
                        </div>
                    </div>
                    <div className='flex md:gap-1 items-center'>
                        <div onClick={showAddTaskDialogAction} className={` select-none ${(state && state.statusList.length > 0) ? 'bg-primary-button-color cursor-pointer' : 'bg-primary-button-hover-color cursor-not-allowed'}  min-w-12 px-3 py-3 min-h-8 flex justify-center items-center rounded-3xl`}>
                            <Image src={'/images/icon-add-task-mobile.svg'} alt='add' width={10} height={10} className='w-2 mt-1'></Image>
                            <span className='hidden md:block text-heading-medium text-white'> Add New Task</span>
                        </div>
                        <div className='w-5 self-stretch flex items-center justify-end text-center  cursor-pointer' onClickCapture={() => {setMenuVisible(prev => !prev)}}>
                            <Image src={'/images/icon-vertical-ellipsis.svg'} alt='ellipsis' width={5} height={20} className='w-1'></Image>
                        </div>
                    </div>
                </div>
                <div className={`absolute top-16 md:top-20 right-5 rounded-lg overflow-clip ${menuVisible ? '' : 'hidden'}`}>
                    <div className='text-paragraph-medium  !font-medium bg-white dark:bg-dark-grey p-5 md:w-48'>
                        <div className='text-secondary-color cursor-pointer' onClick={showEditBoardAction}>
                            Edit Board
                        </div>
                        <div className='text-alert-color mt-5 cursor-pointer' onClick={showDeleteBoardAction}>
                            Delete Board
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
