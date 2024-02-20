import React from 'react'

type Props = {
    text: string;
    onClick: () => void
}

export default function SecondaryButton({text, onClick}: Props) {
    return (
        <div onClick={onClick} className='select-none text-paragraph-medium font-bold text-accent-color bg-secondary-button-color dark:bg-white hover:bg-secondary-button-hover-color dark:hover:bg-white  p-[1em] rounded-3xl text-center cursor-pointer'>
            {text}
        </div>
    )
}
