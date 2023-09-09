import {v1} from 'uuid';
import {FilterValueType, TodolistCommonType} from '../App';
import {todolistsApi, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';

let initialState: TodolistCommonType[] = [
    /*{id: 'todolistId', title: 'html', addedDate: '', order: 0, filter: 'All'},
   {id: todolistId, title: 'css', addedDate: '', order: 0, filter: 'Active'},*/

]

export const todoListsReducer = (state = initialState, action: ActionsType): TodolistCommonType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(el => ({...el, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.todoListId)
        }
        case 'ADD-TODOLIST' : {
            let newTodoList: TodolistCommonType = {id: action.todoListId, title: action.title, addedDate: '', order: 0, filter: 'all'}
            return [newTodoList, ...state]
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

type ActionsType = removeTodoListACType
    | addTodoListACType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | setTodolistsACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>

export const removeTodoListAC = (todoListID: string) => {
    return {type: 'REMOVE-TODOLIST', todoListId: todoListID} as const
}
export const addTodoListAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()} as const
}
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListId, newTitle} as const
}
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListId, filter} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export const setTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}