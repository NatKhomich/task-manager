import React, { memo, useCallback } from "react"
import { AddItemForm } from "common/components/AddItemForm"
import { TaskDomainType } from "features/TodolistList/api/todolists/types"
import { TodolistTitle } from "features/TodolistList/ui/Todolist/TodolistTitle/TodolistTitle"
import { Tasks } from "features/TodolistList/ui/Todolist/Tasks/Tasks"
import { FilterTasksButtons } from "features/TodolistList/ui/Todolist/FilterTasksButtons/FilterTasksButtons"
import { tasksThunks } from "features/TodolistList/model/tasks/tasksSlice"
import { useAppDispatch } from "app/model/store"
import { TodolistCommonType } from "features/TodolistList/model/todolists/todolistsSlice"
import Box from "@mui/material/Box"

type Props = {
  todolist: TodolistCommonType
  tasks: TaskDomainType[]
}

export const Todolist = memo(({todolist, tasks}: Props) => {

  const dispatch = useAppDispatch()

  const addTaskHandler = useCallback((title: string) => {
   return dispatch(tasksThunks.addTask({todolistId: todolist.id, title})).unwrap()
  }, [dispatch])

  return (
    <Box position={'relative'}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <Tasks tasks={tasks} todolist={todolist} />
      <FilterTasksButtons todolist={todolist}/>
    </Box>
  )
})
