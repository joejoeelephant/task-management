'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/hooks/storeHooks'

export default function Page() {
    const {boardNavList} = useAppSelector(state => state.boardNavList)
    const router = useRouter()
    useEffect(() => {
        boardNavList.length > 0 && router.push(`/board/${boardNavList[boardNavList.length - 1].id}`)
    }, [router,boardNavList])
    return (
        <div>
            
        </div>
    )
}
