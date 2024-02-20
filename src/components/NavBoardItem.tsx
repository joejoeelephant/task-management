import React from 'react'
import Link from 'next/link'
import { CSSProperties } from 'react';
import { useParams } from 'next/navigation'

import './NavBoardItem.css'
type Props = {
    id: string;
    name: string;
}

export default function NavBoardItem({id, name}: Props) {
    const {slug} = useParams<{slug: string}>()

    return (
        <li>
            <Link href={`/board/${id}`} className={
                    `flex gap-4 
                    items-center text-heading-medium 
                    px-5 py-4 
                    rounded-tl-none rounded-bl-none rounded-tr-full rounded-br-full
                    ${id === slug ? 'bg-main-purple text-white' : ''} 
                    hover:bg-secondary-button-hover-color hover:text-accent-color nav-board-item
                    dark:hover:bg-white
                    `
                    
                }
            >
                <div className={`w-4 h-4 ${id === slug ? 'bg-white' : 'bg-medium-grey'} board-icon`} style={{'--mask-image-url': 'url("/images/icon-board.svg")'} as CSSProperties}>
                </div>
                <div>
                    {name}
                </div>
            </Link>
        </li>
    )
}
