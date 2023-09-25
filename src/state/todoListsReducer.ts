import {todolistsApi, TodolistType} from '../api/todolists-api';
import {AppThunk} from './store';
import {FilterValueType, TodolistCommonType} from '../features/TodolistList/TodolistList';

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
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsApi.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodoListAC(todolistId))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistsApi.createTodolist(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const updateTodolistTitleTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    todolistsApi.updateTodolist(todoListId, title)
        .then(() => {
            dispatch(changeTodoListTitleAC(todoListId, title))
        })
}