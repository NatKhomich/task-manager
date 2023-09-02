import React, {FC, memo, useCallback} from 'react';
import {FilterValueType, TasksType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ButtonProps} from '@mui/material/Button/Button';
import {TaskWithRedux} from './TaskWithRedux';

type TodoListType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    filter: FilterValueType

    removeTask: (todoListID: string, taskID: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, newIsDone: boolean) => void
    changeTodoListFilter: (todoListID: string, filterValue: FilterValueType) => void
    addTask: (todoListsID: string, title: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void

    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList: FC<TodoListType> = memo((props) => {

    let tasks = props.tasks
    if (props.filter === 'Active') {
        tasks = tasks.filter(el => !el.isDone)
    } else if (props.filter === 'Completed') {
        tasks = tasks.filter(el => el.isDone)
    }

    const allOnClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.todoListID, 'All')
    }, [props.todoListID])
    const activeOnClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.todoListID, 'Active')
    }, [props.todoListID])
    const completedOnClickHandler = useCallback(() => {
        props.changeTodoListFilter(props.todoListID, 'Completed')
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
                        <TaskWithRedux key={el.id}
                                       task={el}
                                       todoListID={props.todoListID}/>
                    );
                })}
            </div>
            <div className={'btn-container'}>
                <ButtonWitchMemo title={'All'}
                                 onClick={allOnClickHandler}
                                 variant={props.filter === 'All' ? 'contained' : 'text'}
                                 size="small"
                                 color="secondary"
                                 disableElevation
                />
                <ButtonWitchMemo title={'Active'}
                                 onClick={activeOnClickHandler}
                                 variant={props.filter === 'Active' ? 'contained' : 'text'}
                                 size="small"
                                 color="secondary"
                                 disableElevation
                />
                <ButtonWitchMemo title={'Completed'}
                                 onClick={completedOnClickHandler}
                                 variant={props.filter === 'Completed' ? 'contained' : 'text'}
                                 size="small"
                                 color="secondary"
                                 disableElevation
                />
            </div>
        </div>
    )
})

const ButtonWitchMemo = memo((props: ButtonProps) => {
    console.log('ButtonWitchMemo')
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