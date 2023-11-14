import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {ListItem} from '@mui/material';
import {TaskType} from 'features/TodolistList/todolistsApi';
import {TaskStatuses} from 'common/enum';
import {EditableSpan} from 'common/components';

export type TaskPropsType = {
    task: TaskType
    todoListId: string
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, status: TaskStatuses) => void
    removeTask: (todolistID: string, taskID: string) => void
    disabled: boolean
}

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export const Task: FC<TaskPropsType> = memo(({
                                                 task,
                                                 todoListId,
                                                 changeTaskTitle,
                                                 changeTaskStatus,
                                                 removeTask,
                                                 disabled
                                             }) => {

    const removeTaskHandler = () => {
        removeTask(todoListId, task.id)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListId, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(todoListId,task.id, newTitle)
    }, [changeTaskTitle, task.id])

    return (
        <div>
            <ListItem style={{padding: '3px', marginRight: '20px'}}
                      className={task.status ? 'is-done' : ''}
                      secondaryAction={
                          <IconButton aria-label="delete" onClick={removeTaskHandler} disabled={disabled}>
                              <DeleteIcon fontSize="small"/>
                          </IconButton>
                      }
                      disablePadding>
                <Checkbox {...label}
                          checked={task.status === TaskStatuses.Completed}
                          size="small"
                          onChange={changeTaskStatusHandler}/>
                <EditableSpan oldTitle={task.title}
                              callBack={changeTaskTitleHandler}
                              disabled={disabled}/>
            </ListItem>
        </div>
    )
})

