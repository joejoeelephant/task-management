import { useEffect, useState } from "react";
import { getBoards } from "@/localAPI/BoardApi";
import { BoardNav } from "@/lib/type";

export function useBoardsNav() {
    const [boardsNav, setBoardsNav] = useState<BoardNav[]>([])
    useEffect(() => {
        const boards = getBoards()
        const nav = boards.map(item => {
            const {id, name} = item;
            return {id, name}
        })
        setBoardsNav(nav)
    }, [])
    return boardsNav
}