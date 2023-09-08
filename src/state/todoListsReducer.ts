import {v1} from 'uuid';
import {FilterValueType, TodolistCommonType} from '../App';
import {TodolistType} from '../api/todolists-api';

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
            return state.filter(el => el.id !== action.todoListID)
        }
        case 'ADD-TODOLIST' : {
            let newTodoList: TodolistCommonType = {id: action.todoListID, title: action.title, addedDate: '', order: 0, filter: 'all'}
            return [newTodoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.todoListID ? {...el, title: action.newTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.todoListID ? {...el, filter: action.filter} : el)
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
    return {type: 'REMOVE-TODOLIST', todoListID} as const
}
export const addTodoListAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todoListID: v1()} as const
}
export const changeTodoListTitleAC = (todoListID: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todoListID, newTitle} as const
}
export const changeTodoListFilterAC = (todoListID: string, filter: FilterValueType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todoListID, filter} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}