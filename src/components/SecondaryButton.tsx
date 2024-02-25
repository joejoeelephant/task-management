import React from 'react'

type Props = {
    text: string;
    onClick: () => void
}

export default function SecondaryButton({text, onClick}: Props) {
    return (
        <div onClick={onClick} className='text-paragraph-medium font-bold secondary-button'>
            {text}
        </div>
    )
}
