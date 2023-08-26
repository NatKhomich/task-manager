import React, {ChangeEvent, memo} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import EditableSpan from './EditableSpan';
import {ListItem} from '@mui/material';
import {TasksType} from '../AppWithRedux';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasksReducer';

export type TaskPropsType = {
    task: TasksType
    todoListID: string
}

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

export const TaskWithRedux = memo(({
                                       task,
                                       todoListID
                                   }: TaskPropsType) => {
    console.log('Task')

    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(todoListID, task.id))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todoListID, task.id, newIsDone))
    }

    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListID, task.id, newTitle))
    }

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

