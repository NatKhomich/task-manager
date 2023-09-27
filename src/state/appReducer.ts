export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type appStateType = {
    status: RequestStatusType
    error: string | null
}

const initialState: appStateType = {
    status: 'loading',
    error: null
}

export const appReducer = (state= initialState, action: AppReducerActionsType): appStateType => {
    switch (action.type) {
        case 'SET-STATUS-LOADING' : {
            return {...state, status: action.status}
        }
        case 'SET-ERROR' : {
            return {...state, error: action.error}
        }
        default: return state
    }
}

export type AppReducerActionsType = ChangeStatusLoadingActionType | SetErrorACActionType
export type ChangeStatusLoadingActionType = ReturnType<typeof changeStatusLoadingAC>
export type SetErrorACActionType = ReturnType<typeof setErrorAC>
export const changeStatusLoadingAC = (status: RequestStatusType) => ({type: 'SET-STATUS-LOADING', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)



