import axios, {AxiosResponse} from 'axios'
import {RequestStatusType} from '../state/appReducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthResponseType>>(`/auth/me`)
    },
    login(loginData: LoginDataType) {
        return instance.post<ResponseType<{userId: number}>, AxiosResponse<ResponseType<{userId: number}>>, LoginDataType>('/auth/login', loginData)
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>(`/todo-lists`, {title})
    },
    deleteTodolist(todoListId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodolist(todoListId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`/todo-lists/${todoListId}`, {title})
    },
    getTasks(todolistID: string) {
        return instance.get<TasksResponseType>(`/todo-lists/${todolistID}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
    fieldsErrors: Array<string>
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

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum ResultCodeStatuses {
    succeeded,
    error,
    captcha_error = 10
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type AuthResponseType = {
    id: number
    email: string
    login: string
}