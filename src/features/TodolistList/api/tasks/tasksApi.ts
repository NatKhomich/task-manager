import { instance } from "common/api";
import { BaseResponseType } from "common/types";
import { AxiosResponse } from "axios";
import { TasksResponseType, UpdateTaskModelType } from "features/TodolistList/api/tasks/types";
import { TaskType } from "features/TodolistList/api/todolists/types";

export const tasksApi = {
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

