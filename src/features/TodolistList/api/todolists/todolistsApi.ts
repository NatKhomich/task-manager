import { AxiosResponse } from "axios";
import { instance } from "common/api";
import { BaseResponseType } from "common/types";
import { TodolistType } from "features/TodolistList/api/todolists/types";


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
}


