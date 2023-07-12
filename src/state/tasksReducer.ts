import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodoListACType, removeTodoListACType} from './todoListsReducer';

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: actionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todoListID]:
                    state[action.payload.todoListID].filter(el => el.id !== action.payload.taskID)
            }
        }

        case 'ADD-TASK' : {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]]}
        }

        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state,
                [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                        ? {...el, isDone: action.payload.newIsDone}
                        : el)
            }
        }

        case 'CHANGE-TASK-TITLE' : {
            return {
                ...state,
                [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                        ? {...el, title: action.payload.newTitle}
                        : el)
            }
        }

        case 'REMOVE-TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.payload.todoListID]
            return copyState
        }

        case 'ADD-TODOLIST' : {
            return {...state, [action.payload.todoListID]: []}
        }

        default:
            return state
    }
}

type actionsType = removeTaskACType | addTaskACType |
    changeTaskStatusACType | changeTaskTitleACType |
    removeTodoListACType | addTodoListACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListID,
            taskID
        }
    } as const
}

export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListID,
            title
        }
    } as const
}

export const changeTaskStatusAC = (todoListID: string, taskID: string, newIsDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListID,
            taskID,
            newIsDone
        }
    } as const
}

export const changeTaskTitleAC = (todoListID: string, taskID: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoListID,
            taskID,
            newTitle
        }
    } as const
}
