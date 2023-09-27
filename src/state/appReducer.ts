export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type appStateType = {
    status: RequestStatusType
}

const initialState: appStateType = {
    status: 'loading'
}

export const appReducer = (state= initialState, action: AppReducerActionsType): appStateType => {
    switch (action.type) {
        case 'CHANGE-STATUS-LOADING' : {
            return {...state, status: action.status}
        }
        default: return state
    }
}

export type AppReducerActionsType = ReturnType<typeof changeStatusLoadingAC>
export const changeStatusLoadingAC = (status: RequestStatusType) => ({type: 'CHANGE-STATUS-LOADING', status} as const)



