import {AnyAction, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {todolistsReducer} from 'features/TodolistList/todolistsReducer';
import {tasksReducer} from 'features/TodolistList/tasksReducer';
import {appReducer} from 'app/appReducer';
import {authReducer} from 'features/auth/authReducer';

export const store = configureStore({
    reducer: {
        todoLists: todolistsReducer,
        tasks: tasksReducer,
        app: appReducer,
        auth: authReducer
    }
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store