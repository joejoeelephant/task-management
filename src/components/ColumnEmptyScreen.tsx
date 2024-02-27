import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import { useDialogs } from '@/context/useDialogsContext'
export default function ColumnEmptyScreen() {
    const {dispatch} = useDialogs()
    return (
        <>
            <div className='w-full h-full flex flex-col gap-6 justify-center items-center px-6'>
                <p className='text-heading-lg text-secondary-color dark:text-primary-dark-heading-color text-center'>
                    This board is empty. Create a new column to get started.
                </p>
                <div>
                    <PrimaryButton text='+ Add New Column' onClick={() => {dispatch({type: "OPEN_EDIT_BOARD_DIALOG"})}}/>
                </div>   
            </div>
        </>
    )
}
