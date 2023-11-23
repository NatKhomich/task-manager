import React, { useCallback } from "react"
import { EditableSpan } from "common/components/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Typography from "@mui/material/Typography"
import { TodolistCommonType, todolistsThunks } from "features/TodolistList/model/todolists/todolistsSlice"
import { useAppDispatch } from "app/model/store"

type Props = {
  todolist: TodolistCommonType
}
export const TodolistTitle = ({todolist}: Props) => {

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(todolistsThunks.removeTodolist(todolist.id))
  }
  const changeTodoListTitleCallback = useCallback((title: string) => {
    dispatch(todolistsThunks.updateTodolistTitle({todolistId: todolist.id, title}))
  }, [dispatch])

  return (
    <div>
      <Typography component={"h5"} variant="h6" align="left" fontWeight="bold"
                  margin="10px 50px 10px 10px">
        <EditableSpan value={todolist.title}
                      disabled={todolist.entityStatus === "loading"}
                      callBack={changeTodoListTitleCallback} />
        <IconButton aria-label="delete"
                    onClick={removeTodolistHandler}
                    disabled={todolist.entityStatus === "loading"}
                    style={{ position: "absolute", top: "-10px", right: "13px" }}>
          <DeleteIcon />
        </IconButton>
      </Typography>
    </div>
  )
}
