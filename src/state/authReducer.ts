import { Dispatch } from 'redux'
import {authAPI, LoginDataType, ResultCodeStatuses, todolistsApi} from '../api/todolists-api';
import {AppThunk} from './store';
import {changeStatusLoadingAC} from './appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {AxiosError} from 'axios/index';
import {changeTaskEntityStatusAC, ErrorType, removeTaskAC} from './tasksReducer';

const initialState: AuthStateType = {
    //залогинены или нет
    isLoggedIn: false
}
type AuthStateType = {
    isLoggedIn: boolean
}

export const authReducer = (state = initialState, action: AuthActionsType): AuthStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginDataType): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(setIsLoggedInAC(true))
                dispatch(changeStatusLoadingAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
