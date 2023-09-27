import {addTodoListACType, removeTodoListACType, setTodolistsACType} from './todoListsReducer';
import {
    ResultCodeStatuses,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsApi,
    UpdateTaskModelType
} from '../api/todolists-api';
import {AppRootStateType, AppThunk} from './store';
import {TasksStateType} from '../features/TodolistList/TodolistList';
import {changeStatusLoadingAC, setErrorAC} from './appReducer';

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

export const tasksReducer = (state = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId)
            }
        }
        case 'ADD-TASK' : {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK': {
            return {...state, [action.todolistId]:
                    state[action.todolistId].map(el => el.id === action.taskId ? {...el, ...action.model} : el)}
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
            action.todolists.forEach((el) => stateCopy[el.id] = [])
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {...state, [action.todoListId]: action.tasks}
        }
        default:
            return state
    }
}

export type TaskActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTaskAC> | ReturnType<typeof updateTaskAC>
    | removeTodoListACType | addTodoListACType | setTodolistsACType

export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE-TASK', todoListId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const setTaskAC = (todoListId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todoListId, tasks} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model} as const
}

export const setTasksTC = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    todolistsApi.getTasks(todoListId)
        .then(res => {
            dispatch(setTaskAC(todoListId, res.data.items))
            dispatch(changeStatusLoadingAC('succeeded'))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    todolistsApi.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
            dispatch(changeStatusLoadingAC('succeeded'))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(changeStatusLoadingAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(changeStatusLoadingAC('succeeded'))
            }
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
            completed: task.completed,
            ...domainModel
        }

        dispatch(changeStatusLoadingAC('loading'))
        todolistsApi.updateTask(todolistId, taskId, model)
            .then(() => {
                dispatch(updateTaskAC(todolistId, taskId, model))
                dispatch(changeStatusLoadingAC('succeeded'))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    completed?:boolean
}