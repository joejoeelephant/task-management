import { configureStore } from '@reduxjs/toolkit'
import boardInfoReducer from './features/boardInfo/boardInfo'
import tasksReducer from './features/tasks/tasksSlice'
import statusListReducer from './features/statusList/statusListSlice'
import boardNavListReducer from './features/boardNavigationList/boardNavigationListSlice'
export const makeStore = () => {
    return configureStore({
        reducer: {
            boardInfo: boardInfoReducer,
            tasks: tasksReducer,
            statusList: statusListReducer,
            boardNavList: boardNavListReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']