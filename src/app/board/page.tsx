'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBoardNavList } from '@/context/useBoardNavContext'

export default function Page() {
    const {state} = useBoardNavList()
    const router = useRouter()
    useEffect(() => {
        state.length > 0 && router.push(`/board/${state[state.length - 1].id}`)
    }, [router,state])
    return (
        <div>
            
        </div>
    )
}
