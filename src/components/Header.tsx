'use client'
import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useDialogs } from '@/context/useDialogsContext'
import { getBoard } from "@/localAPI/BoardApi";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { updateBoardId, updateBoardName, setBoardIsLoaing, setErrorMessage } from "@/lib/features/boardInfo/boardInfo";
import { setTasks } from '@/lib/features/tasks/tasksSlice'
import { setStatusList } from '@/lib/features/statusList/statusListSlice'
import './Header.css'

type Props = {
    sidebarVisible: boolean;
    toggleSidebarVisible: () => void;
}

export default function Header({sidebarVisible, toggleSidebarVisible}: Props) {
    const [menuVisible, setMenuVisible] = useState(false)
    const {dispatch: dialogsDiapatch} = useDialogs()

    const {slug} = useParams<{slug: string}>()
    const storeDispatch = useAppDispatch()
    const statusListState = useAppSelector(state => state.statusList)
    useEffect(() => {
        try {
            storeDispatch(setBoardIsLoaing(true))
            const boardData = getBoard(slug)
            if(!boardData) throw new Error("board not found")
            storeDispatch(setBoardIsLoaing(false))
            storeDispatch(updateBoardId(boardData.id))
            storeDispatch(updateBoardName(boardData.name))
            storeDispatch(setTasks(boardData.tasks))
            storeDispatch(setStatusList(boardData.statusList))
            storeDispatch(setErrorMessage(""))
        } catch (error) {
            let errorMessage = 'An error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            storeDispatch(setErrorMessage(errorMessage))
        }

    }, [slug, storeDispatch])

    const showDeleteBoardAction = () => {
        setMenuVisible(false)
        dialogsDiapatch({type: "OPEN_DELETE_BOARD_DIALOG"})
    }

    const showEditBoardAction = () => {
        setMenuVisible(false)
        dialogsDiapatch({type: "OPEN_EDIT_BOARD_DIALOG"})
    }

    const showAddTaskDialogAction = useCallback(() => {
        if(statusListState.statusList.length < 1) return;
        dialogsDiapatch({type: "OPEN_ADD_TASK_DIALOG"})
    }, [statusListState, dialogsDiapatch])
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
                        <div onClick={showAddTaskDialogAction} className={` select-none ${(statusListState.statusList.length > 0) ? 'bg-primary-button-color cursor-pointer' : 'bg-primary-button-hover-color cursor-not-allowed'}  min-w-12 px-3 py-3 min-h-8 flex justify-center items-center rounded-3xl`}>
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
