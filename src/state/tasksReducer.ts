import {addTodoListACType, removeTodoListACType, setTodolistsACType} from './todoListsReducer';
import {TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from '../api/todolists-api';
import {AppRootStateType, AppThunk} from './store';
import {TasksStateType} from '../features/TodolistList/TodolistList';
import {changeStatusLoadingAC} from './appReducer';

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
        case 'CHANGE-TASK-STATUS' : {
            return {
                ...state, [action.payload.todoListId]:
                    state[action.payload.todoListId].map(el => el.id === action.payload.taskId
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
    | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTaskAC>
    | removeTodoListACType | addTodoListACType | setTodolistsACType

export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE-TASK', todoListId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const setTaskAC = (todoListId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todoListId, tasks} as const)
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todoListId, taskId, status}} as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todoListId, taskId, newTitle}} as const
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
            dispatch(addTaskAC(res.data.data.item))
            dispatch(changeStatusLoadingAC('succeeded'))
        })
}
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(el => el.id === taskId)
        if(task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                deadline: task.deadline,
                completed: task.completed,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status
            }

            dispatch(changeStatusLoadingAC('loading'))
            todolistsApi.updateTask(todolistId, taskId, model)
                .then(() => {
                    dispatch(changeTaskStatusAC(todolistId, taskId, status))
                    dispatch(changeStatusLoadingAC('succeeded'))
                })
        }
    }
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(el => el.id === taskId)
        if(task) {
            const model: UpdateTaskModelType = {
                deadline: task.deadline,
                completed: task.completed,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                title
            }

            dispatch(changeStatusLoadingAC('loading'))
            todolistsApi.updateTask(todolistId, taskId, model)
                .then(() => {
                    dispatch(changeTaskTitleAC(todolistId, taskId, title))
                    dispatch(changeStatusLoadingAC('succeeded'))
                })
        }
    }
}