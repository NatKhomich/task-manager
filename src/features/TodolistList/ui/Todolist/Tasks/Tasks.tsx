import React from "react"
import { Task } from "features/TodolistList/ui/Todolist/Tasks/Task"
import { TaskDomainType } from "features/TodolistList/api/todolists/types"
import { TodolistCommonType } from "features/TodolistList/model/todolists/todolistsSlice"

type Props = {
  tasks: TaskDomainType[]
  todolist: TodolistCommonType
}
export const Tasks = ({tasks, todolist}: Props) => {

  let filterTasks = tasks
  if (todolist.filter === "active") {
    filterTasks = tasks.filter(el => !el.status)
  } else if (todolist.filter === "completed") {
    filterTasks = tasks.filter(el => el.status)
  }

  return (
    <div style={{ padding: "10px 0" }}>
      {filterTasks?.map(el => {
        return (
          <Task key={el.id}
                task={el}
                disabled={el.entityStatus === "loading"}
          />
        )
      })}
    </div>
  )
}
