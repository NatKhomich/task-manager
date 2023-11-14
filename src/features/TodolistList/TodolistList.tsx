import React, {useCallback, useEffect} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {RequestStatusType} from 'app/appReducer';
import {TodolistType} from 'features/TodolistList/todolistsApi';
import {AddItemForm} from 'common/components';
import {useAppDispatch, useAppSelector} from "app/store";
import {selectTodolists} from "features/TodolistList/todolistSelectors";
import {selectTasks} from "features/TodolistList/tasksSelectors";
import {selectAuthIsLoggedIn} from "features/auth/authSelectors";
import {todolistsActions, todolistsThunks} from "features/TodolistList/todolistsReducer";
import {tasksThunks} from "features/TodolistList/tasksReducer";
import {TaskStatuses} from "common/enum";

export type TodolistCommonType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type FilterValueType = 'all' | 'active' | 'completed'

export const TodolistList = () => {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!isLoggedIn) {
            return
        }
        dispatch(todolistsThunks.fetchTodolists())
    }, [])

    //tasks
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(tasksThunks.removeTask({todolistId, taskId}))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(tasksThunks.addTask({todolistId, title}))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(tasksThunks.updateTask({todolistId: todolistId, taskId: taskId, domainModel: {status}}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(tasksThunks.updateTask({todolistId: todolistId, taskId: taskId, domainModel: {title}}))
    }, [dispatch])

    //todoLists
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(todolistsThunks.removeTodolist(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(todolistsThunks.addTodolist(title))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(todolistsThunks.updateTodolistTitle({todolistId, title}))
    }, [dispatch])
    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(todolistsActions.changeTodoListFilter({todolistId: todolistId, filter}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <Container fixed maxWidth="xl"  className='container'>
            <Grid container style={{padding: '20px 0'}}  >
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={6} >
                {todolists.map(el => {
                    return (
                        <Grid item key={el.id } style={{width: '400px'}}>
                            <Paper elevation={4} style={{padding: '15px'}}>
                                <Todolist
                                    todolist={el}
                                    tasks={tasks[el.id]}

                                    removeTask={removeTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    addTask={addTask}

                                    removeTodoList={removeTodolist}
                                    changeTodoListTitle={changeTodolistTitle}
                                    changeTodoListFilter={changeTodolistFilter}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}