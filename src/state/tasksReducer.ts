import {
    ResultCodeStatuses, TaskDomainType, TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType
} from '../api/todolists-api';
import {AppRootStateType, AppThunk} from './store';
import {appActions, RequestStatusType} from './appReducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {AxiosError} from 'axios';

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

let initialState: TasksStateType = {
    /*[todolistID1]: [
        {id: v1(), title: 'html', status: TaskStatuses.New, startDate: '', priority: 0, description: '',
        deadline: 0, todoListId: todolistID2, addedDate: '', order: 0, entityStatus: 'idle'},
        {id: v1(), title: 'css', status: TaskStatuses.New, startDate: '', priority: 0, description: '',
        deadline: 0, todoListId: todolistID2, addedDate: '', order: 0, entityStatus: 'idle'},
    ],
    [todolistID2]: [
        {id: v1(), title: 'react', status: TaskStatuses.New, startDate: '', priority: 0, description: '',
        deadline: 0, todoListId: todolistID2, addedDate: '', order: 0, entityStatus: 'idle'},
        ]*/
}

export const tasksReducer = (state = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            return {...state, [action.todoListId]: action.tasks.map((el: any) => ({...el, entityStatus: 'idle'}))}
        }
        case 'REMOVE-TASK' : {
            return {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId)}
        }
        case 'ADD-TASK' : {
            return {
                ...state, [action.task.todoListId]:
                    [action.task, ...state[action.task.todoListId]].map(el => ({...el, entityStatus: 'idle'}))
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map(el => el.id === action.taskId ? {...el, ...action.model} : el)
            }
        }
        case 'CHANGE-TASK-ENTITY-STATUS': {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map(el => el.id === action.taskId ? {
                        ...el,
                        entityStatus: action.status
                    } : el)
            }
        }
        case 'REMOVE-TODOLIST' : {
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState
        }
        case 'ADD-TODOLIST' : {
            return {...state, [action.todolist.id]: []}
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((el: any) => stateCopy[el.id] = [])
            return stateCopy;
        }
        case 'CLEAR-TODOLISTS-DATA': {
            return {}
        }
        default:
            return state
    }
}

export type TaskActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTaskAC> | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC> | any

export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE-TASK', todoListId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const setTaskAC = (todoListId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todoListId, tasks} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}
export const changeTaskEntityStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TASK-ENTITY-STATUS', todolistId, taskId, status} as const
}

export const setTasksTC = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(appActions.changeStatusLoading({status: 'loading'}))
    todolistsApi.getTasks(todoListId)
        .then(res => {
            dispatch(setTaskAC(todoListId, res.data.items))
            dispatch(appActions.changeStatusLoading({status: 'succeeded'}))
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(appActions.changeStatusLoading({status: 'loading'}))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
    todolistsApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(appActions.changeStatusLoading({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'idle'))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.changeStatusLoading({status: 'loading'}))
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(appActions.changeStatusLoading({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })

}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(el => el.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const model: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            ...domainModel
        }

        dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'loading'))
        dispatch(appActions.changeStatusLoading({status: 'loading'}))
        todolistsApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                    dispatch(updateTaskAC(todolistId, taskId, model))
                    dispatch(appActions.changeStatusLoading({status: 'succeeded'}))
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError<ErrorType>) => {
                handleServerNetworkError(error.message, dispatch)
                dispatch(changeTaskEntityStatusAC(todolistId, taskId, 'failed'))
            })
    }
}

export type ErrorType = {
    statusCode: number
    messages: [{
        message: string
        field: string
    }],
    error: string
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    completed?: boolean
}