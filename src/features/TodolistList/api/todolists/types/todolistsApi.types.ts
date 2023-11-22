import { RequestStatusType } from "app/model/appSlice";
import { TaskPriorities, TaskStatuses } from "common/enum";

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

export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}