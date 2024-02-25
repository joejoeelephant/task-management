import React from 'react'

type Props = {
    text: string;
    onClick: () => void
}

export default function AlertButton({text, onClick}: Props) {
    return (
        <div onClick={onClick} className='text-paragraph-medium font-bold alert-button'>
            {text}
        </div>
    )
}
