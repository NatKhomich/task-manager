export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type appStateType = {
    status: RequestStatusType
    error: string | null
    isDarkMode: boolean
    isInitialized: boolean
}

const initialState: appStateType = {
    status: 'idle',
    error: null,
    isDarkMode: true,
    isInitialized: false // проинициализировано ли приложение.
    // будет крутилка пока приложение не поймет что показать туду или логин
}

export const appReducer = (state= initialState, action: AppReducerActionsType): appStateType => {
    switch (action.type) {
        case 'SET-STATUS-LOADING' : {
            return {...state, status: action.status}
        }
        case 'SET-ERROR' : {
            return {...state, error: action.error}
        }
        case 'DARK-LIGHT-MODE' : {
            return {...state, isDarkMode: action.mode}
        }
        case 'IS-INITIALIZED' : {
            return {...state, isInitialized: action.isInitialized}
        }
        default: return state
    }
}

export type AppReducerActionsType = ChangeStatusLoadingActionType
    | SetErrorActionType | DarkLightModeActionType | IsInitializedActionType
export type ChangeStatusLoadingActionType = ReturnType<typeof changeStatusLoadingAC>
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type DarkLightModeActionType = ReturnType<typeof darkLightModeAC>
export type IsInitializedActionType = ReturnType<typeof isInitializedAC>

export const changeStatusLoadingAC = (status: RequestStatusType) => ({type: 'SET-STATUS-LOADING', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const darkLightModeAC = (mode: boolean) => ({type: 'DARK-LIGHT-MODE', mode} as const)
export const isInitializedAC = (isInitialized: boolean) => ({type: 'IS-INITIALIZED', isInitialized} as const)



