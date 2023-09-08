import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodoListACType, removeTodoListACType} from './todoListsReducer';
import {TaskStatuses, TaskType} from '../api/todolists-api';

let initialState: TasksStateType = {
    /*[todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
    ],
    [todolistID2]: [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Coffee', isDone: true},
        {id: v1(), title: 'Bread', isDone: false}

    ]*/
}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {...state, [action.todoListID]:
                    state[action.todoListID].filter(el => el.id !== action.taskID)}
        }
        case 'ADD-TASK' : {
            const newTask: TaskType = {id: v1(), title: action.title, status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: action.todoListID, addedDate: '', completed: false, order: 0}
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        }
        case 'CHANGE-TASK-STATUS' : {
            return {...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                        ? {...el, isDone: action.payload.status} : el)}
        }
        case 'CHANGE-TASK-TITLE' : {
            return {...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                        ? {...el, title: action.payload.newTitle} : el)}
        }
        case 'REMOVE-TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        case 'ADD-TODOLIST' : {
            return {...state, [action.todoListID]: []}
        }
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTaskTitleAC> |
    removeTodoListACType | addTodoListACType

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {type: 'REMOVE-TASK', todoListID, taskID} as const
}

export const addTaskAC = (todoListID: string, title: string) => {
    return {type: 'ADD-TASK', todoListID, title} as const
}

export const changeTaskStatusAC = (todoListID: string, taskID: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todoListID, taskID, status}} as const
}

export const changeTaskTitleAC = (todoListID: string, taskID: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todoListID, taskID, newTitle}} as const
}
