import { TaskType } from "features/TodolistList/api/todolists/types"
import { TaskPriorities, TaskStatuses } from "common/enum"

export type TasksResponseType = {
  items: TaskType[]
  totalCount: number
  error: string | null
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
export type UpdateTaskModelType = Required<Omit<UpdateDomainTaskModelType, 'completed'>>
