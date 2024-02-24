import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusItem } from '@/lib/type';

interface StatusListState {
    statusList: StatusItem[]
}

const initialState: StatusListState = {
    statusList: []
}


export const statusListSlice = createSlice({
    name: 'statusList',
    initialState,
    reducers: {
        setStatusList: (state, action: PayloadAction<StatusItem[]>) => {
            state.statusList = action.payload;
        },

        addStatusItem: (state, action: PayloadAction<StatusItem>) => {
            state.statusList = [...state.statusList, action.payload]
        },

        deleteStatusItem: (state, action: PayloadAction<string>) => {
            state.statusList = state.statusList.filter(item => item.id !== action.payload);
        },

        updateStatusItem: (state, action: PayloadAction<StatusItem>) => {
            const index = state.statusList.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.statusList[index] = action.payload;
            }
        },

    },
});

export const { setStatusList, addStatusItem, deleteStatusItem, updateStatusItem } = statusListSlice.actions;
export default statusListSlice.reducer;
