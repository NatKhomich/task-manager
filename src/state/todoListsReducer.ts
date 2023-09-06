import {v1} from 'uuid';
import {FilterValueType, TodoListsType} from '../App';

let initialState: TodoListsType[] = [
    /*{id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},*/
]

export const todoListsReducer = (state = initialState, action: ActionsType): TodoListsType[]  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.todoListID)
        }
        case 'ADD-TODOLIST' : {
            let newTodoList: TodoListsType = {id: action.todoListID, title: action.title, filter: 'All'}
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

type ActionsType = removeTodoListACType | addTodoListACType |
    ReturnType<typeof changeTodoListTitleAC> | ReturnType<typeof changeTodoListFilterAC>

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>

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