import React, {FC, memo, useCallback, useEffect} from 'react';
import {FilterValueType, TaskStatuses} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ButtonProps} from '@mui/material/Button/Button';
import {TaskType} from '../api/todolists-api';
import {Task} from './Task';
import {useDispatch} from 'react-redux';
import {setTaskAC} from '../state/tasksReducer';

type TodoListType = {
    todoListID: string
    title: string
    tasks: TaskType[]
    filter: FilterValueType

    removeTask: (todoListID: string, taskID: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, status: TaskStatuses) => void
    changeTodoListFilter: (todoListID: string, filterValue: FilterValueType) => void
    addTask: (todoListsID: string, title: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void

    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList: FC<TodoListType> = memo((props) => {

    const dispatch = useDispatch()

    let tasks = props.tasks
    if (props.filter === 'active') {
        tasks = tasks.filter(el => !el.status)
    } else if (props.filter === 'completed') {
        tasks = tasks.filter(el => el.status)
    }

   /* useEffect(() => {
        dispatch(setTaskAC(props.todoListID, tasks))
    })*/

    const changeTodoListFilterHandler = useCallback((filter: FilterValueType) => () => {
        props.changeTodoListFilter(props.todoListID, filter)
    }, [props.todoListID])


    const changeTodoListTitleHandler = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle)
    }, [props.changeTodoListTitle, props.todoListID])

    const removeTodolistHandler = useCallback(() => {
        props.removeTodoList(props.todoListID)
    }, [props.removeTodoList, props.todoListID])

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todoListID, title)
    }, [props.addTask, props.todoListID])

    return (
        <div>
            <Typography component={'h4'} variant="h5" align="center" fontWeight="bold" margin="10px 0">
                <EditableSpan oldTitle={props.title} callBack={changeTodoListTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTaskHandler}/>
            <div style={{padding: '10px 0'}}>

                {tasks.map(el => {
                    return (
                        <Task key={el.id}
                              task={el}
                              todoListID={props.todoListID}
                              changeTaskStatus={props.changeTaskStatus}
                              removeTask={props.removeTask}
                              changeTaskTitle={props.changeTaskTitle}
                        />
                    );
                })}
            </div>
            <div className={'btn-container'}>
                <ButtonWitchMemo title={'All'}
                                 onClick={changeTodoListFilterHandler('all')}
                                 variant={props.filter === 'all' ? 'contained' : 'text'}
                                 size="small"
                                 color="secondary"
                                 disableElevation
                />
                <ButtonWitchMemo title={'Active'}
                                 onClick={changeTodoListFilterHandler('active')}
                                 variant={props.filter === 'active' ? 'contained' : 'text'}
                                 size="small"
                                 color="secondary"
                                 disableElevation
                />
                <ButtonWitchMemo title={'Completed'}
                                 onClick={changeTodoListFilterHandler('completed')}
                                 variant={props.filter === 'completed' ? 'contained' : 'text'}
                                 size="small"
                                 color="secondary"
                                 disableElevation
                />
            </div>
        </div>
    )
})

const ButtonWitchMemo = memo((props: ButtonProps) => {
    return (
        <Button onClick={props.onClick}
                variant={props.variant}
                size={props.size}
                color={props.color}
                disableElevation>
            {props.title}
        </Button>
    )
})