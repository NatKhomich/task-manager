import {ResultCodeStatuses, todolistsApi, TodolistType} from '../api/todolists-api';
import {AppThunk} from './store';
import {FilterValueType, TodolistCommonType} from '../features/TodolistList/TodolistList';
import {appActions, RequestStatusType} from './appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {AxiosError} from 'axios';
import {ErrorType, setTasksTC} from './tasksReducer';

let initialState: TodolistCommonType[] = [
    /*{id: 'todolistId', title: 'html', addedDate: '', order: 0, filter: 'All'},
   {id: todolistId, title: 'css', addedDate: '', order: 0, filter: 'Active'},*/
]

export const todoListsReducer = (state = initialState, action: TodolistActionsType): TodolistCommonType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        }
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.todoListId)
        }
        case 'ADD-TODOLIST' : {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.todoListId ? {...el, title: action.newTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.todoListId ? {...el, filter: action.filter} : el)
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map(el => el.id === action.todoListId ? {...el, entityStatus: action.status} : el)
        }
        case 'CLEAR-TODOLISTS-DATA': {
            return []
        }
        default: return state
    }
}

export type TodolistActionsType = RemoveTodoListActionType | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC> | ReturnType<typeof changeTodoListFilterAC>
    | SetTodolistsActionType | ChangeTodoListEntityStatusActionType | ClearTodolistsDataActionType

export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodoListEntityStatusActionType = ReturnType<typeof changeTodoListEntityStatusAC>
export type ClearTodolistsDataActionType = ReturnType<typeof clearTodolistsDataAC>

export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListId: todoListID}as const)
export const addTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const clearTodolistsDataAC = () => ({type: 'CLEAR-TODOLISTS-DATA'} as const)

export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListId, newTitle} as const
}
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListId, filter} as const
}
export const changeTodoListEntityStatusAC = (todoListId: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', todoListId, status} as const
}

export const setTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.changeStatusLoading({status: 'loading'}))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(appActions.changeStatusLoading({status: 'succeeded'}))
            return res.data
        })
        .then((todos) => {
            todos.forEach(t => {
                dispatch(setTasksTC(t.id))
            })
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.changeStatusLoading({status: 'loading'}))
    dispatch(changeTodoListEntityStatusAC(todolistId, 'loading'))
    todolistsApi.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(removeTodoListAC(todolistId))
                dispatch(appActions.changeStatusLoading({status: 'succeeded'}))
                dispatch(changeTodoListEntityStatusAC(todolistId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(changeTodoListEntityStatusAC(todolistId, 'failed'))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(appActions.changeStatusLoading({status: 'loading'}))
    todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(addTodoListAC(res.data.data.item))
               // dispatch(setTodolistsTC()) если задиспатчить сразу санку кейс и AC 'ADD-TODOLIST' не нужны
                dispatch(appActions.changeStatusLoading({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const updateTodolistTitleTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.changeStatusLoading({status: 'loading'}))
    todolistsApi.updateTodolist(todoListId, title)
        .then((res) => {
            if(res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(changeTodoListTitleAC(todoListId, title))
                dispatch(appActions.changeStatusLoading({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}