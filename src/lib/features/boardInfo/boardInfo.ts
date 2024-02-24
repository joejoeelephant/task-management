import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    id: '',
    name: "",
    isLoading: true,
    errorMessage: ""
};


export const boardInfoSlice = createSlice({
    name: 'boardInfo',
    initialState,
    reducers: {
        updateBoardId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },

        updateBoardName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },

        setBoardIsLoaing: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

        setErrorMessage:(state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const {updateBoardId, updateBoardName, setBoardIsLoaing, setErrorMessage} = boardInfoSlice.actions

export default boardInfoSlice.reducer