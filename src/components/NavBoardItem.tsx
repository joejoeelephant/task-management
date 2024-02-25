import React from 'react'
import Link from 'next/link'
import { CSSProperties } from 'react';
import { useParams } from 'next/navigation'
type Props = {
    id: string;
    name: string;
}

export default function NavBoardItem({id, name}: Props) {
    const {slug} = useParams<{slug: string}>()

    return (
        <li>
            <Link href={`/board/${id}`} className={
                    `board-nav-item 
                    ${id === slug ? 'bg-main-purple text-white' : ''} 
                    `
                    
                }
            >
                <div className={`${id === slug ? 'bg-white' : 'bg-medium-grey'} board-nav-icon`} style={{'--mask-image-url': 'url("/images/icon-board.svg")'} as CSSProperties}>
                </div>
                <div>
                    {name}
                </div>
            </Link>
        </li>
    )
}
