import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BoardNav } from '@/lib/type';
import { getBoards } from '@/localAPI/BoardApi';

interface BoardNavListState {
    boardNavList: BoardNav[],
    isLoading: boolean,
    error: string | null
}

const initialState: BoardNavListState = {
    boardNavList: [],
    isLoading: true,
    error: ""
}

export const fetchBoardNavList = createAsyncThunk(
    'boardNavList/fetchBoardNavList',
    async (params, { rejectWithValue }) => {
        try {
            const data = getBoards();
            return data; // This will be the `action.payload` in the fulfilled action
        } catch (error) {
            let errorMessage = 'An error occurred';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const boardNavListSlice = createSlice({
    name: "boardNavList",
    initialState,
    reducers: {
        addBoardNav: (state, action: PayloadAction<BoardNav>) => {
            state.boardNavList = [...state.boardNavList, action.payload]
        },
        deleteBoardNav: (state, action: PayloadAction<string>) => {
            state.boardNavList = state.boardNavList.filter(item => item.id !== action.payload)
        },
        updateBoardNav: (state, action: PayloadAction<BoardNav>) => {
            const index = state.boardNavList.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.boardNavList[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchBoardNavList.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchBoardNavList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.boardNavList = action.payload
        })
        .addCase(fetchBoardNavList.rejected, (state, action) => {
            state.isLoading = false;
            if (typeof action.payload === 'string') {
                state.error = action.payload;
            } else {
                state.error = 'An unknown error occurred';
            }
        });
    }
})

export const { addBoardNav, deleteBoardNav, updateBoardNav  } = boardNavListSlice.actions;

export default boardNavListSlice.reducer;
