import React, {FC, memo, useCallback} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ButtonProps} from '@mui/material/Button/Button';
import {FilterValueType, TodolistCommonType} from '../TodolistList';
import {TaskDomainType} from 'features/TodolistList/todolistsApi';
import {EditableSpan} from "common/components/EditableSpan";
import {AddItemForm} from "common/components/AddItemForm";
import {Task} from "features/TodolistList/Todolist/Task";

type TodoListType = {
    todolist: TodolistCommonType
    tasks: TaskDomainType[]

    changeTodoListFilter: (todoListID: string, filterValue: FilterValueType) => void
    addTask: (todoListsID: string, title: string) => void

    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const Todolist: FC<TodoListType> = memo((props) => {

    let tasks = props.tasks
    if (props.todolist.filter === 'active') {
        tasks = tasks.filter(el => !el.status)
    } else if (props.todolist.filter === 'completed') {
        tasks = tasks.filter(el => el.status)
    }

    const changeTodoListFilterHandler = useCallback((filter: FilterValueType) => () => {
        props.changeTodoListFilter(props.todolist.id, filter)
    }, [props.todolist.id])


    const changeTodoListTitleHandler = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props.changeTodoListTitle, props.todolist.id])

    const removeTodolistHandler = useCallback(() => {
        props.removeTodoList(props.todolist.id)
    }, [props.removeTodoList, props.todolist.id])

    const addTaskHandler = useCallback((title: string) => {
        props.addTask(props.todolist.id, title)
    }, [props.addTask, props.todolist.id])

    return (
        <div style={{maxWidth: '100%', position: 'relative'}}>
            <Typography component={'h5'} variant="h6" align="left" fontWeight="bold"
                        margin="10px 50px 10px 10px" >
                <EditableSpan value={props.todolist.title}
                              disabled={props.todolist.entityStatus === 'loading'}
                              callBack={changeTodoListTitleHandler}/>
                <IconButton aria-label="delete"
                            onClick={removeTodolistHandler}
                            disabled={props.todolist.entityStatus === 'loading'}
                            style={{position: 'absolute', top: '-10px', right: '13px'}}>
                    <DeleteIcon/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'}/>
            <div style={{padding: '10px 0'}}>

                {tasks?.map(el => {
                    return (
                        <Task key={el.id}
                              task={el}
                              disabled={el.entityStatus === 'loading'}
                        />
                    )
                })}
            </div>
            <div className={'btn-container'}>
                <ButtonWitchMemo title={'All'}
                                 onClick={changeTodoListFilterHandler('all')}
                                 variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                                 size="small"
                                 color="secondary"
                                 disableElevation
                />
                <ButtonWitchMemo title={'Active'}
                                 onClick={changeTodoListFilterHandler('active')}
                                 variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                                 size="small"
                                 color="secondary"
                                 disableElevation
                />
                <ButtonWitchMemo title={'Completed'}
                                 onClick={changeTodoListFilterHandler('completed')}
                                 variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
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