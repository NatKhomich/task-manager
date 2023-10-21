import {authAPI, LoginDataType, ResultCodeStatuses} from '../api/todolists-api';
import {AppThunk} from './store';
import {appActions} from './appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {AxiosError} from 'axios';
import {ErrorType} from './tasksReducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {todolistsActions} from './todoListsReducer';


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
