import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodoListACType, removeTodoListACType, setTodolistsACType} from './todoListsReducer';
import {TaskStatuses, TaskType} from '../api/todolists-api';

let initialState: TasksStateType = {
    /*[todolistID1]: [
        {id: v1(), title: 'html', status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: todolistID2, addedDate: '', completed: false, order: 0},
        {id: v1(), title: 'css', status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: todolistID2, addedDate: '', completed: false, order: 0},
    ],
    [todolistID2]: [
        {id: v1(), title: 'react', status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: todolistID2, addedDate: '', completed: false, order: 0},
        {id: v1(), title: 'rest api', status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: todolistID2, addedDate: '', completed: false, order: 0},
        ]*/
}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state, [action.todoListID]:
                    state[action.todoListID].filter(el => el.id !== action.taskID)
            }
        }
        case 'ADD-TASK' : {
            const newTask: TaskType = {
                id: v1(), title: action.title, status: TaskStatuses.New, startDate: '', priority: 0,
                description: '', deadline: 0, todoListId: action.todoListID, addedDate: '', completed: false, order: 0
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        }
        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                        ? {...el, status: action.payload.status} : el)
            }
        }
        case 'CHANGE-TASK-TITLE' : {
            return {
                ...state, [action.payload.todoListID]:
                    state[action.payload.todoListID].map(el => el.id === action.payload.taskID
                        ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case 'REMOVE-TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        case 'ADD-TODOLIST' : {
            return {...state, [action.todoListID]: []}
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((el) => {
                stateCopy[el.id] = []
            })
            return stateCopy;
        }

        /*case 'SET-TASKS': {
            return {...state, [action.todoListID]: action.tasks}
        }*/
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTaskAC>
    | removeTodoListACType
    | addTodoListACType
    | setTodolistsACType

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
export const setTaskAC = (todoListID: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todoListID, tasks} as const
}
