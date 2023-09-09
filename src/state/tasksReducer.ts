import {TasksStateType} from '../App';
import {addTodoListACType, removeTodoListACType, setTodolistsACType} from './todoListsReducer';
import {TaskStatuses, TaskType, todolistsApi} from '../api/todolists-api';
import {Dispatch} from 'redux';

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
                ...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId)
            }
        }
        case 'ADD-TASK' : {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state, [action.payload.todoListId]:
                    state[action.payload.todoListId].map(el => el.id === action.payload.taskID
                        ? {...el, status: action.payload.status} : el)
            }
        }
        case 'CHANGE-TASK-TITLE' : {
            return {
                ...state, [action.payload.todoListId]:
                    state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                        ? {...el, title: action.payload.newTitle} : el)
            }
        }
        case 'REMOVE-TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        case 'ADD-TODOLIST' : {
            return {...state, [action.todoListId]: []}
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((el) => {
                stateCopy[el.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {...state, [action.todoListId]: action.tasks}
        }
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTaskAC>
    | removeTodoListACType | addTodoListACType | setTodolistsACType

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todoListId: todoListId, taskId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todoListId, taskID: taskId, status}} as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todoListId, taskId: taskId, newTitle}} as const
}
export const setTaskAC = (todoListId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todoListId, tasks} as const
}

export const setTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    todolistsApi.getTasks(todoListId)
        .then(res => {
            dispatch(setTaskAC(todoListId, res.data.items))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}