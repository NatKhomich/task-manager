import {AnyAction, combineReducers} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {todolistsReducer} from 'features/TodolistList/todolistsReducer';
import {tasksReducer} from 'features/TodolistList/tasksReducer';
import {appReducer} from 'app/appReducer';
import {authReducer} from 'features/auth/authReducer';
import {localStorageMiddleware} from "common/utils/localStorageMiddleware";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
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

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type RootStateReducer = ReturnType<typeof rootReducer>





// @ts-ignore
window.store = store