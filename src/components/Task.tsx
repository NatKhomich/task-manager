import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from './EditableSpan';
import {ListItem} from '@mui/material';
import { TaskType} from '../api/todolists-api';
import {TaskStatuses} from '../App';

export type TaskPropsType = {
    task: TaskType
    todoListID: string
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, status: TaskStatuses) => void
    removeTask: (todolistID: string, taskID: string) => void
}

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export const Task: FC<TaskPropsType> = memo(({
                                                 task,
                                                 todoListID,
                                                 changeTaskTitle,
                                                 changeTaskStatus,
                                                 removeTask
                                             }) => {

    const removeTaskHandler = () => {
        removeTask(todoListID, task.id)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListID, task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(todoListID,task.id, newTitle)
    }, [changeTaskTitle, task.id])

    return (
        <div>
            <ListItem style={{padding: '3px', marginRight: '20px'}}
                      className={task.status ? 'is-done' : ''}
                      secondaryAction={
                          <IconButton aria-label="delete" onClick={removeTaskHandler}>
                              <DeleteIcon fontSize="small"/>
                          </IconButton>
                      }
                      disablePadding>
                <Checkbox {...label}
                          checked={task.status === TaskStatuses.Completed}
                          size="small"
                          onChange={changeTaskStatusHandler}/>
                <EditableSpan oldTitle={task.title} callBack={changeTaskTitleHandler}/>
            </ListItem>
        </div>
    );
})

