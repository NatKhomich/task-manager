import React from "react"
import Button from "@mui/material/Button"
import { TodolistCommonType, todolistsActions } from "features/TodolistList/model/todolists/todolistsSlice"
import { useAppDispatch } from "app/model/store"
import Box from "@mui/material/Box"

export type FilterValueType = 'all' | 'active' | 'completed'

type Props = {
  todolist: TodolistCommonType
}
export const FilterTasksButtons = ({ todolist }: Props) => {

  const dispatch = useAppDispatch()

  const changeTodoListFilterHandler = (filter: FilterValueType) => () => {
    dispatch(todolistsActions.changeTodoListFilter({ todolistId: todolist.id, filter }))
  }

  return (
    <Box display={'flex'} justifyContent={'space-between'} maxWidth={'250px'}>
      <Button
        onClick={changeTodoListFilterHandler("all")}
        variant={todolist.filter === "all" ? "contained" : "text"}
        size="small"
        color="secondary"
        disableElevation
      >
        All
      </Button>
      <Button onClick={changeTodoListFilterHandler("active")}
              variant={todolist.filter === "active" ? "contained" : "text"}
              size="small"
              color="secondary"
              disableElevation
      >
        Active
      </Button>
      <Button onClick={changeTodoListFilterHandler("completed")}
              variant={todolist.filter === "completed" ? "contained" : "text"}
              size="small"
              color="secondary"
              disableElevation
      >
        Completed
      </Button>
    </Box>
  )
}

