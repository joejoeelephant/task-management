import React, { createContext, useContext, useReducer, useEffect} from 'react';
import { useBoardsNav } from '@/hooks/useBoardsNav';
// Types
import { BoardNav } from '@/lib/type';

// Actions
export type Action =
    | { type: 'RESET_BOARD_NAVS'; payload: BoardNav[] }
    | { type: 'UPDATE_BOARD_NAME'; payload: {id: string, name: string} }
    | { type: 'ADD_BOARD_NAV'; payload: BoardNav }
    | { type: 'DELETE_BOARD_NAV'; payload: {id: string} }

// Reducer
export const reducer = (state: BoardNav[], action: Action): BoardNav[] => {
    switch (action.type) {
        case 'RESET_BOARD_NAVS':
            return [...action.payload];
        case 'UPDATE_BOARD_NAME':
            return state.map(item => item.id === action.payload.id ? {...item, name: action.payload.name} : item);
        case 'ADD_BOARD_NAV':
            return [...state, action.payload];
        case 'DELETE_BOARD_NAV':
            return state.filter(item => item.id !== action.payload.id)
        // Implement other actions
        default:
            return state;
    }
};

const BoardNavListContext = createContext<{ state: BoardNav[]; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Provider
export const BoardNavListProvider: React.FC<{children: React.ReactNode }> = ({ children }) => {
    const boardsNav = useBoardsNav()
    const [state, dispatch] = useReducer(reducer, boardsNav);
    useEffect(() => {
        dispatch({ type: 'RESET_BOARD_NAVS', payload: boardsNav });
      }, [boardsNav]);
    return (
        <BoardNavListContext.Provider value={{ state, dispatch }}>
            {children}
        </BoardNavListContext.Provider>
    );
};

// Custom Hook
export const useBoardNavList = () => {
    const context = useContext(BoardNavListContext);
    if (!context) throw new Error('useBoardNavList must be used within a BoardDataProvider');
    return context;
};
