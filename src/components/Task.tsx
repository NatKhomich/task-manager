import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from './EditableSpan';
import {ListItem} from '@mui/material';
import {TasksType} from '../App';

export type TaskPropsType = {
    task: TasksType
    changeTaskTitle: (taskID: string, newTitle: string) => void
    changeTaskStatus: (taskID: string, newIsDone: boolean) => void
    removeTask: (taskID: string) => void
}

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export const Task: FC<TaskPropsType> = memo(({
                                            task,
                                            changeTaskTitle,
                                            changeTaskStatus,
                                            removeTask
                                        }) => {
    console.log('Task')

    const removeTaskHandler = () => {
        removeTask(task.id)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDone)
    }
    const changeTaskTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }, [changeTaskTitle, task.id])

    return (
        <div>
            <ListItem style={{padding: '3px', marginRight: '20px'}}
                      className={task.isDone ? 'is-done' : ''}
                      secondaryAction={
                          <IconButton aria-label="delete" onClick={removeTaskHandler}>
                              <DeleteIcon fontSize="small"/>
                          </IconButton>
                      }
                      disablePadding>

                <Checkbox {...label}
                          checked={task.isDone}
                          size="small"
                          onChange={changeTaskStatusHandler}/>

                <EditableSpan oldTitle={task.title} callBack={changeTaskTitleHandler}/>

            </ListItem>
        </div>
    );
})

