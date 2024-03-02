import React from 'react'
import Dialog from './Dialog'

export default function LoadingDialog() {
    return (
        <Dialog isVisible={true} closeDialog={() => {}}>
            <div className=' min-h-32 flex justify-center items-center'>
                Loading...
            </div>
        </Dialog>
    )
}
