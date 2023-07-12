import {combineReducers, createStore, legacy_createStore} from 'redux';
import {todoListsReducer} from './todoListsReducer';
import {tasksReducer} from './tasksReducer';

const rootReducer = combineReducers( {
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store