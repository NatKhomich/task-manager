import {v1} from 'uuid';
import {FilterValueType, TodoListsType} from '../App';

let initialState: TodoListsType[] = [
    /*{id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},*/
]

export const todoListsReducer = (state = initialState, action: actionsType): TodoListsType[]  => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(el => el.id !== action.payload.todoListID)
        }

        case 'ADD-TODOLIST' : {
            let newTodoList: TodoListsType = {id: action.payload.todoListID, title: action.payload.title, filter: 'All'}
            return [newTodoList, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.payload.todoListID ? {...el, title: action.payload.newTitle} : el)
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            return state.map(el => el.id === action.payload.todoListID ? {...el, filter: action.payload.filter} : el)
        }

        default:
            return state
    }
}

type actionsType = removeTodoListACType | addTodoListACType |
    changeTodoListTitleACType | changeTodoListFilterACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>


export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListID
        }
    } as const
}

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todoListID: v1()
        }
    } as const
}

export const changeTodoListTitleAC = (todoListID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListID,
            newTitle
        }
    } as const
}

export const changeTodoListFilterAC = (todoListID: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListID,
            filter
        }
    } as const
}