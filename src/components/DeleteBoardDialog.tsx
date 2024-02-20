import React, {useEffect, useState} from 'react'
import Dialog from './Dialog'
import SecondaryButton from './SecondaryButton'
import AlertButton from './AlertButton'
import { deleteBoard } from '@/localAPI/BoardApi'
import { useParams, useRouter } from 'next/navigation'
import { useBoardNavList } from '@/context/useBoardNavContext'
type Props = {
    isVisible: boolean;
    closeDialog: () => void;
}

export default function DeleteBoardDialog({isVisible, closeDialog}: Props) {
    const {slug} = useParams<{slug: string}>()
    const {dispatch} = useBoardNavList()
    const router = useRouter()

    const deleteBoardHandle = () => {
        deleteBoard(slug)
        dispatch({type: 'DELETE_BOARD_NAV', payload: {id: slug}})
        closeDialog()
        router.push(`/board`)
    }

    return (
        <Dialog isVisible={isVisible} closeDialog={closeDialog}>
            <div className=''>
                <div className='text-alert-color text-heading-lg'>Delete this board?</div>
                <div className='text-secondary-color text-paragraph-medium mt-6'>
                    Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.
                </div>
                <div className='mt-6 grid md:grid-cols-2 gap-6'>
                    <AlertButton text='Delete' onClick={deleteBoardHandle} />
                    <SecondaryButton text='Cancle' onClick={closeDialog} />
                </div>
            </div>
        </Dialog>
    )
}
