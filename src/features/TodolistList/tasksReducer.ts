import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskDomainType, TaskType, todolistsApi, UpdateTaskModelType} from 'features/TodolistList/todolistsApi';
import {appActions, RequestStatusType} from 'app/appReducer';
import {todolistsActions} from 'features/TodolistList/todoListsReducer';
import {AppRootStateType, AppThunk} from 'app/store';
import {handleServerAppError, handleServerNetworkError} from 'common/utils/errorUtils';
import {ResultCodeStatuses, TaskPriorities, TaskStatuses} from 'common/enum';



const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        setTask: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks.map((el: any) => ({...el, entityStatus: 'idle'}))
        },
        removeTask: (state, action: PayloadAction<{ todolistId: string, taskId: string }>) => {
            const tasksCurrentTodo = state[action.payload.todolistId]
            const index = tasksCurrentTodo.findIndex(el => el.id === action.payload.taskId)
            if (index > -1) {
                tasksCurrentTodo.splice(index, 1)
            }
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            const newTask: TaskDomainType = {...action.payload.task, entityStatus: 'idle'}
            state[action.payload.task.todoListId].unshift(newTask)
        },
        updateTask: (state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            model: UpdateDomainTaskModelType
        }>) => {
            const tasksCurrentTodo = state[action.payload.todolistId]
            const index = tasksCurrentTodo.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
                tasksCurrentTodo[index] = {...tasksCurrentTodo[index], ...action.payload.model}
            }
        },
        changeTaskEntityStatus: (state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            entityStatus: RequestStatusType
        }>) => {
            const tasksCurrentTodo = state[action.payload.todolistId]
            const index = tasksCurrentTodo.findIndex(t => t.id === action.payload.taskId)
            tasksCurrentTodo[index] = {...tasksCurrentTodo[index], entityStatus: action.payload.entityStatus}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.removeTodoList, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsActions.addTodoList, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach(tl => state[tl.id] = [])
            })
            .addCase(todolistsActions.clearTodolistsData, () => {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

export const setTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistsApi.getTasks(todolistId)
        .then(res => {
            dispatch(tasksActions.setTask({todolistId, tasks: res.data.items}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    dispatch(tasksActions.changeTaskEntityStatus({todolistId, taskId, entityStatus: 'loading'}))
    todolistsApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(tasksActions.removeTask({todolistId, taskId}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(tasksActions.changeTaskEntityStatus({todolistId, taskId, entityStatus: 'idle'}))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(tasksActions.addTask({task: res.data.data.item}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
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

        dispatch(tasksActions.changeTaskEntityStatus({todolistId, taskId, entityStatus: 'loading'}))
        dispatch(appActions.setAppStatus({status: 'loading'}))
        todolistsApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                    dispatch(tasksActions.updateTask({todolistId, taskId, model}))
                    dispatch(appActions.setAppStatus({status: 'succeeded'}))
                    dispatch(tasksActions.changeTaskEntityStatus({todolistId, taskId, entityStatus: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError<ErrorType>) => {
                handleServerNetworkError(error.message, dispatch)
                dispatch(tasksActions.changeTaskEntityStatus({todolistId, taskId, entityStatus: 'failed'}))
            })
    }
}

//types
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

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export type TasksInitialStateType = ReturnType<typeof slice.getInitialState>