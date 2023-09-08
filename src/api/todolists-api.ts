import axios, {AxiosResponse} from 'axios'
import {TaskStatuses} from '../App';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<TodolistsResponseType<{ item: TodolistType }>, AxiosResponse<TodolistsResponseType<{ item: TodolistType }>>, { title: string }>(`/todo-lists`, {title})
    },
    deleteTodolist(todoListId: string) {
        return instance.delete<TodolistsResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodolist(todoListId: string, title: string) {
        return instance.put<TodolistsResponseType, AxiosResponse<TodolistsResponseType>, { title: string }>(`/todo-lists/${todoListId}`, {title})
    },
    getTasks(todolistID: string) {
        return instance.get<TasksResponseType[]>(`/todo-lists/${todolistID}/tasks`)
    },
    createTasks(todoListId: string, title: string) {
        return instance.post(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<TodolistsResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<TodolistsResponseType<{ item: TaskType }>, AxiosResponse<TodolistsResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


type TodolistsResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: number
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

type UpdateTaskModelType = {
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