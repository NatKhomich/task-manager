import React, { ChangeEvent, memo, useCallback } from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import { ListItem } from "@mui/material"
import { TaskStatuses } from "common/enum"
import { EditableSpan } from "common/components/EditableSpan"
import { useAppDispatch } from "app/model/store"
import { tasksThunks } from "features/TodolistList/model/tasks/tasksSlice"
import { TaskType } from "features/TodolistList/api/todolists/types"
import styles from 'features/TodolistList/ui/Todolist/Tasks/Task/Task.module.css'

export type Props = {
  task: TaskType
  disabled: boolean
}

export const Task = memo(({task, disabled}: Props) => {

  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(tasksThunks.removeTask({ todolistId: task.todoListId, taskId: task.id }))
  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(tasksThunks.updateTask({
      todolistId: task.todoListId, taskId: task.id,
      domainModel: { status }
    }))
  }
  const changeTaskTitleCallback = useCallback((title: string) => {
    dispatch(tasksThunks.updateTask({ todolistId: task.todoListId, taskId: task.id, domainModel: { title } }))
  }, [task.todoListId, task.id])

  return (
    <div>
      <ListItem sx={{ padding: "3px", marginRight: "20px" }}
                className={task.status === TaskStatuses.Completed ? styles.isDone : ""}
                secondaryAction={
                  <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={disabled}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
                disablePadding>
        <Checkbox {...{ inputProps: { "aria-label": "Checkbox demo" } }}
                  checked={task.status === TaskStatuses.Completed}
                  size="small"
                  onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title}
                      callBack={changeTaskTitleCallback}
                      disabled={disabled} />
      </ListItem>
    </div>
  )
})

