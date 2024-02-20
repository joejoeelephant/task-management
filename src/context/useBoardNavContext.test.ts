import { reducer, Action } from './useBoardNavContext';
import { BoardNav } from '@/lib/type';; // Adjust the import path

describe('boardNavs Reducer', () => {
    const initialState: BoardNav[] = [
        {
            id: "1",
            name: "board1"
        },
        {
            id: "2",
            name: "board2"
        },
        {
            id: "3",
            name: "board3"
        }
    ]

    it('should handle reset boardnavs', () => {
        const action: Action = { type: 'RESET_BOARD_NAVS', payload: initialState };
        const result =  reducer([], action);
        expect(result).toEqual(action.payload);
    });

    it('should handle update boardnav name', () => {
        const navId = '2';
        const updatedName = 'updated board2';
        const action: Action = { type: 'UPDATE_BOARD_NAME', payload: {id: navId, name: updatedName} };
        const result =  reducer(initialState, action);
        const navWithUpdatedStatus = result?.find(nav => nav.id === navId);
        expect(navWithUpdatedStatus?.name).toEqual(updatedName);
    });

    it('should handle add a boardnav', () => {
        const newNav: BoardNav = {id: '4', name: 'board4'}
        const action: Action = { type: 'ADD_BOARD_NAV', payload: newNav};
        const result =  reducer(initialState, action);
        expect(result).toContainEqual(newNav)
    });

    it('should handle delete a boardnav by id', () => {
        const action: Action = { type: 'DELETE_BOARD_NAV', payload: {id: "1"}};
        const result =  reducer(initialState, action);
        expect(result.length).toBe(2)
    });
})