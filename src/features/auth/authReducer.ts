import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from 'app/store';
import {appActions} from 'app/appReducer';
import {authAPI} from 'features/auth/authApi';
import {ResultCodeStatuses} from 'common/enum';
import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils';
import {AxiosError} from 'axios';
import {ErrorType} from 'features/TodolistList/tasksReducer';
import {LoginDataType} from 'features/TodolistList/todolistsApi';
import {todolistsActions} from 'features/TodolistList/todoListsReducer';


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
    dispatch(appActions.setAppStatus({status: 'loading'}))
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
        .finally(() => {
            dispatch(appActions.setAppInitialized({isInitialized: true}))
        })
}
export const loginTC = (data: LoginDataType): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                dispatch(todolistsActions.clearTodolistsData())
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
