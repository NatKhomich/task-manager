export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type appStateType = {
    status: RequestStatusType
    error: string | null
    isDarkMode: boolean
}

const initialState: appStateType = {
    status: 'idle',
    error: null,
    isDarkMode: true
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
        default: return state
    }
}

export type AppReducerActionsType = ChangeStatusLoadingActionType
    | SetErrorActionType | DarkLightModeActionType
export type ChangeStatusLoadingActionType = ReturnType<typeof changeStatusLoadingAC>
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type DarkLightModeActionType = ReturnType<typeof darkLightModeAC>

export const changeStatusLoadingAC = (status: RequestStatusType) => ({type: 'SET-STATUS-LOADING', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const darkLightModeAC = (mode: boolean) => ({type: 'DARK-LIGHT-MODE', mode} as const)



