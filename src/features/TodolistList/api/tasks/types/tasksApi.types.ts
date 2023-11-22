import { TaskPriorities, TaskStatuses } from "common/enum";
import { TaskType } from "features/TodolistList/api/todolists/types";

export type TasksResponseType = {
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