import React, { useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Navigate } from "react-router-dom";
import { RequestStatusType } from "app/model/appSlice";
import { useAppDispatch, useAppSelector } from "app/model/store";
import { selectTodolists } from "features/TodolistList/model/todolists/todolistSelectors";
import { selectTasks } from "features/TodolistList/model/tasks/tasksSelectors";
import { selectAuthIsLoggedIn } from "features/auth/model/authSelectors";
import { todolistsActions, todolistsThunks } from "features/TodolistList/model/todolists/todolistsSlice";
import { tasksThunks } from "features/TodolistList/model/tasks/tasksSlice";
import { AddItemForm } from "common/components/AddItemForm";
import { Todolist } from "features/TodolistList/ui/Todolist";
import { TodolistType } from "features/TodolistList/api/todolists/types";

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
    // const removeTask = useCallback((todolistId: string, taskId: string) => {
    //     dispatch(tasksThunks.removeTask({todolistId, taskId}))
    // }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(tasksThunks.addTask({todolistId, title}))
    }, [dispatch])
    // const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    //     dispatch(tasksThunks.updateTask({todolistId: todolistId, taskId: taskId, domainModel: {status}}))
    // }, [dispatch])
    // const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    //     dispatch(tasksThunks.updateTask({todolistId: todolistId, taskId: taskId, domainModel: {title}}))
    // }, [dispatch])

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