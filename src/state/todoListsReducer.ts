import {ResultCodeStatuses, todolistsApi, TodolistType} from '../api/todolists-api';
import {AppThunk} from './store';
import {FilterValueType, TodolistCommonType} from '../features/TodolistList/TodolistList';
import {changeStatusLoadingAC, setErrorAC} from './appReducer';

let initialState: TodolistCommonType[] = [
    /*{id: 'todolistId', title: 'html', addedDate: '', order: 0, filter: 'All'},
   {id: todolistId, title: 'css', addedDate: '', order: 0, filter: 'Active'},*/
]

export const todoListsReducer = (state = initialState, action: TodolistActionsType): TodolistCommonType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(el => ({...el, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.todoListId)
        }
        case 'ADD-TODOLIST' : {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.todoListId ? {...el, title: action.newTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.todoListId ? {...el, filter: action.filter} : el)
        }
        default:
            return state
    }
}

export type TodolistActionsType = removeTodoListACType | addTodoListACType
    | ReturnType<typeof changeTodoListTitleAC> | ReturnType<typeof changeTodoListFilterAC>
    | setTodolistsACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>

export const removeTodoListAC = (todoListID: string) => ({type: 'REMOVE-TODOLIST', todoListId: todoListID}as const)
export const addTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListId, newTitle} as const
}
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListId, filter} as const
}

export const setTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(changeStatusLoadingAC('succeeded'))
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    todolistsApi.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodoListAC(todolistId))
            dispatch(changeStatusLoadingAC('succeeded'))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(changeStatusLoadingAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(changeStatusLoadingAC('succeeded'))
            }
        })
}
export const updateTodolistTitleTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    todolistsApi.updateTodolist(todoListId, title)
        .then(() => {
            dispatch(changeTodoListTitleAC(todoListId, title))
            dispatch(changeStatusLoadingAC('succeeded'))
        })
}