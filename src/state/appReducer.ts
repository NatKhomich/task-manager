import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType, //делается ли запрос на сервер, если да LinearProgress
        error: null as null | string, //если ошибка текст запишется сюда
        isDarkMode: true, //светлая или темная тема
        isInitialized: false // проиниц ли приложение(me запрос). будет крутилка пока прилож не поймет что показать туду или логин
    },
    reducers: {
        setAppStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        darkLightAppMode: (state, action: PayloadAction<{mode: boolean}>) => {
            state.isDarkMode = action.payload.mode
        },
        setAppInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const appActions = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>


