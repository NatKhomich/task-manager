import {AnyAction, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {todoListsReducer} from 'features/TodolistList/todoListsReducer';
import {tasksReducer} from 'features/TodolistList/tasksReducer';
import {appReducer} from 'app/appReducer';
import {authReducer} from 'features/auth/authReducer';

const rootReducer = combineReducers( {
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof store.getState>
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store