import React from 'react'

export type DialogProps = {
    isVisible: boolean;
    closeDialog: () => void;
    children: React.ReactNode
}

export default function Dialog({isVisible, closeDialog, children}: DialogProps) {
    return (
        <div className={`fixed top-0 left-0 z-30 w-full min-h-svh bg-[rgba(0,0,0,0.3)] flex justify-center items-center ${isVisible ? '' : 'hidden'}`}>
            <div className='absolute top-0 left-0 w-full min-h-svh' onClickCapture={closeDialog}></div>
            <div className='absolute rounded-lg bg-white dark:bg-dark-grey p-6 w-11/12 md:w-8/12 max-w-[30rem] text-primary-heading-color dark:text-white'>
                {children}
            </div>
        </div>
    )
}
