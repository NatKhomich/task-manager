import React, {useCallback} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import AddItemForm from '../../components/AddItemForm';
import {TaskStatuses, TodolistType} from '../../api/todolists-api';
import {
    addTodolistTC,
    changeTodoListFilterAC,
    removeTodolistTC,
    updateTodolistTitleTC
} from '../../state/todoListsReducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from '../../state/tasksReducer';
import {RequestStatusType} from '../../state/appReducer';
import {useTodolists} from '../../hooks/useSetTodolists';

export type TodolistCommonType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type FilterValueType = 'all' | 'active' | 'completed'

export const TodolistList = () => {

   const {todolists, tasks, dispatch} = useTodolists()

    //tasks
    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskTC(todoListId, taskId))
    }, [dispatch])
    const addTask = useCallback((todoListsId: string, title: string) => {
        dispatch(addTaskTC(todoListsId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoListId, taskId, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todoListId, taskId, {title}))
    }, [dispatch])

    //todoLists
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistTC(todoListId))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todoListId, title))
    }, [dispatch])
    const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValueType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    }, [dispatch])

    return (
        <Container fixed maxWidth="xl">
            <Grid container style={{padding: '20px 0'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={5}>
                {todolists.map(el => {
                    return (
                        <Grid item key={el.id}>
                            <Paper elevation={4} style={{padding: '10px'}}>
                                <Todolist
                                    todolist={el}
                                    tasks={tasks[el.id]}

                                    removeTask={removeTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    addTask={addTask}

                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                    changeTodoListFilter={changeTodoListFilter}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
}

/*export type TaskType = {
    id: string
    title: string
    isDone: boolean
}*/
/*export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}*/