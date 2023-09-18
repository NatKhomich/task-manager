import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TodolistActionsType, todoListsReducer} from './todoListsReducer';
import {TaskActionsType, tasksReducer} from './tasksReducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers( {
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()

export type AppActionsType = TodolistActionsType | TaskActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store