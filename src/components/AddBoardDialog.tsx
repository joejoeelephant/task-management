import React, { useState, CSSProperties, useCallback } from 'react'
import Dialog from './Dialog'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import { Board } from '@/lib/type'
import InputTextItem from './InputTextItem'
import { validateRequired } from '@/utils/FormValidate.utils'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { useBoardNavList } from '@/context/useBoardNavContext'
import { useEditBoardForm } from '@/hooks/useEditBoardForm'
import { addBoard as addBoardToLocal } from '@/localAPI/BoardApi'
type Props = {
    isVisible: boolean;
    closeDialog: () => void;
}


export default function AddBoardDialog({isVisible, closeDialog}: Props) {
    const router = useRouter()
    const {dispatch} = useBoardNavList()
    const {
        boardName, 
        columns,
        boardNameChange,
        notifyBoardName,
        notifyColumns,
        updateColumnById,
        validateColumns,
        validateColumn,
        addColumn,
        deleteColumnById 
    } = useEditBoardForm()

    const addBoard = () => {
        notifyBoardName()
        notifyColumns()
        if (!boardName.valid || !validateColumns()) return;
        const id = uuidv4()
        const initBoardData:Board = {
            id: id,
            name: boardName.value,
            statusList: columns.map(item => { return {id: item.id, value: item.value} }),
            tasks: []
        }
        addBoardToLocal(initBoardData)
        dispatch({type: "ADD_BOARD_NAV", payload: {id, name: boardName.value}})
        closeDialog()
        router.push('/board')
    }


    return (
        <Dialog isVisible={isVisible} closeDialog={closeDialog}>
            <div>
                <div className=' text-heading-lg'>Add New Board?</div>
                <div className='mt-6'>
                    <div>
                        <label className='text-paragraph-xs font-bold text-secondary-color'>Board Name</label>
                        <div className='mt-2'>
                            <InputTextItem 
                                id={boardName.id} 
                                value={boardName.value}
                                shouldValidate={boardName.shouldValidate}
                                validateFunc={validateRequired} 
                                onBlur={boardNameChange} 
                                placeholder='e.g WebDesign'
                            />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label className='text-paragraph-xs font-bold text-secondary-color'>Board Columns</label>
                        <div className='mt-2 max-h-48 overflow-auto scroller-decoration grid gap-3'>
                            {
                                columns.map(item => {
                                    return (
                                        <div key={item.id} className='flex items-center gap-4'>
                                            <div className='flex-1'>
                                                <InputTextItem 
                                                    id={item.id} 
                                                    value={item.value}
                                                    shouldValidate={item.shouldValidate}
                                                    validateFunc={validateColumn} 
                                                    onBlur={updateColumnById} 
                                                    placeholder='e.g todo'
                                                />
                                            </div>
                                            <div onClick={() => {deleteColumnById(item.id)}} className={`w-4 h-4  bg-medium-grey icon-box hover:bg-alert-color cursor-pointer`} style={{'--mask-image-url': 'url("/images/icon-cross.svg")'} as CSSProperties}>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='mt-6 grid lg:grid-cols-2 gap-6'>
                        <SecondaryButton text='+ Add New Column' onClick={addColumn} />
                        <PrimaryButton text='Create New Board' onClick={addBoard} />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
