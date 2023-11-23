import {AnyAction, combineReducers} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {todolistsSlice} from 'features/TodolistList/model/todolists/todolistsSlice';
import {tasksSlice} from 'features/TodolistList/model/tasks/tasksSlice';
import {appSlice} from 'app/model/appSlice';
import {authSlice} from 'features/auth/model/authSlice';
import {localStorageMiddleware} from "common/utils/localStorageMiddleware";


const rootReducer = combineReducers({
    todoLists: todolistsSlice,
    tasks: tasksSlice,
    app: appSlice,
    auth: authSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                ignoredPaths: ['payload.timestamp'],
            },
        }).concat(localStorageMiddleware),
});

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export type RootStateReducer = ReturnType<typeof rootReducer>