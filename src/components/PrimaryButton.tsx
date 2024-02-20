import React from 'react'

type Props = {
    text: string;
    onClick: () => void
}

export default function PrimaryButton({text, onClick}: Props) {
    return (
        <div onClick={onClick} className='flex-1 select-none text-paragraph-medium font-bold text-white bg-primary-button-color  hover:bg-primary-button-hover-color p-[1em] rounded-3xl text-center cursor-pointer'>
            {text}
        </div>
    )
}
 