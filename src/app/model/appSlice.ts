import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loadDarkLightModeFromLocalStorage = (): boolean => {
    const storedMode = localStorage.getItem('darkLightMode');
    return storedMode ? JSON.parse(storedMode) : true;
};


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as null | string,
        isDarkLightMode: loadDarkLightModeFromLocalStorage(),
        isInitialized: false
    },
    reducers: {
        setAppStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        darkLightAppMode: (state, action: PayloadAction<{mode: boolean}>) => {
            state.isDarkLightMode = action.payload.mode
            localStorage.setItem('darkLightMode', JSON.stringify(action.payload.mode))
        },
        setAppInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})


export const appSlice = slice.reducer
export const appActions = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = ReturnType<typeof slice.getInitialState>


