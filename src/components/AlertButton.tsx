import React from 'react'

type Props = {
    text: string;
    onClick: () => void
}

export default function AlertButton({text, onClick}: Props) {
    return (
        <div onClick={onClick} className='select-none text-paragraph-medium font-bold text-white bg-alert-button-color hover:bg-alert-button-hover-color p-[1em] rounded-3xl text-center cursor-pointer'>
            {text}
        </div>
    )
}
