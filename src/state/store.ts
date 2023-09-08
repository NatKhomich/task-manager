import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {todoListsReducer} from './todoListsReducer';
import {tasksReducer} from './tasksReducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers( {
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatchType>()

// @ts-ignore
window.store = store