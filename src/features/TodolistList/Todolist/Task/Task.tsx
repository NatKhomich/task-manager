import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {ListItem} from '@mui/material';
import {TaskType} from 'features/TodolistList/todolistsApi';
import {TaskStatuses} from 'common/enum';
import {EditableSpan} from "common/components/EditableSpan";
import {useAppDispatch} from "app/store";
import {tasksThunks} from "features/TodolistList/tasksReducer";

export type PropsType = {
    task: TaskType
    disabled: boolean
}

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export const Task: FC<PropsType> = memo((props) => {
    const {task, disabled} = props

    const dispatch = useAppDispatch()

    const removeTask = useCallback(() => {
        dispatch(tasksThunks.removeTask({todolistId: task.todoListId, taskId: task.id}))
    }, [])

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(tasksThunks.updateTask({
            todolistId: task.todoListId, taskId: task.id,
            domainModel: {status}
        }))
    }, [])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(tasksThunks.updateTask({todolistId: task.todoListId, taskId: task.id, domainModel: {title}}))
    }, [])

    return (
        <div>
            <ListItem style={{padding: '3px', marginRight: '20px'}}
                      className={task.status ? 'is-done' : ''}
                      secondaryAction={
                          <IconButton aria-label="delete" onClick={removeTask} disabled={disabled}>
                              <DeleteIcon fontSize="small"/>
                          </IconButton>
                      }
                      disablePadding>
                <Checkbox {...label}
                          checked={task.status === TaskStatuses.Completed}
                          size="small"
                          onChange={changeTaskStatus}/>
                <EditableSpan value={task.title}
                              callBack={changeTaskTitle}
                              disabled={disabled}/>
            </ListItem>
        </div>
    )
})

