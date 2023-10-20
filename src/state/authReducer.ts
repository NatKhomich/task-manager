import {authAPI, LoginDataType, ResultCodeStatuses} from '../api/todolists-api';
import {AppThunk} from './store';
import {changeStatusLoadingAC, isInitializedAC} from './appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {AxiosError} from 'axios';
import {ErrorType} from './tasksReducer';
import {clearTodolistsDataAC} from './todoListsReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// thunks
export const meTC = (): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                dispatch(changeStatusLoadingAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(isInitializedAC(true))
        })
}
export const loginTC = (data: LoginDataType): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                dispatch(changeStatusLoadingAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(changeStatusLoadingAC('succeeded'))
                dispatch(clearTodolistsDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>
