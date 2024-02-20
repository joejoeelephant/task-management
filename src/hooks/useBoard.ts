import { useEffect, useState } from "react";
import { Board } from "@/lib/type";
import { getBoard } from "@/localAPI/BoardApi";
export function useBoard(id: string) {
    const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function fetchBoard() {
            setLoading(true);
            // Since localStorage is synchronous and does not require async operations,
            // the async keyword here is more for illustrating a pattern that you might use for API calls.
            try {
                const board = getBoard(id)
                board && setCurrentBoard(board);
            } catch (error: any) {
                setErrorMessage(error.message);
                setCurrentBoard(null); // Ensure the state is explicitly set to null if no board is found or on error.
            } finally {
                setLoading(false);
            }
        }

        fetchBoard();
    }, [id]);

    return { currentBoard, loading, errorMessage };
}
