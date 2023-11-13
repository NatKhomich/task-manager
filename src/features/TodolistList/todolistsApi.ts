import {AxiosResponse} from 'axios';
import {instance} from 'common/api';
import {BaseResponseType} from 'common/types';
import {RequestStatusType} from 'app/appReducer';
import {TaskPriorities, TaskStatuses} from 'common/enum';


export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<BaseResponseType<{ item: TodolistType }>, AxiosResponse<BaseResponseType<{ item: TodolistType }>>, { title: string }>(`/todo-lists`, {title})
    },
    deleteTodolist(todoListId: string) {
        return instance.delete<BaseResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodolist(todoListId: string, title: string) {
        return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, { title: string }>(`/todo-lists/${todoListId}`, {title})
    },
    getTasks(todolistID: string) {
        return instance.get<TasksResponseType>(`/todo-lists/${todolistID}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<BaseResponseType<{ item: TaskType }>, AxiosResponse<BaseResponseType<{ item: TaskType }>>, { title: string }>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<BaseResponseType<{ item: TaskType }>, AxiosResponse<BaseResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type TasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}
