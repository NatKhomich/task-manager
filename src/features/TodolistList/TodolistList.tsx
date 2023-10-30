import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist/Todolist';
import {useTodolistList} from 'common/hooks/useTodolistList';
import {Navigate} from 'react-router-dom';
import {RequestStatusType} from 'app/appReducer';
import {TodolistType} from 'features/TodolistList/todolistsApi';
import {AddItemForm} from 'common/components';

export type TodolistCommonType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}
export type FilterValueType = 'all' | 'active' | 'completed'

export const TodolistList = () => {

   const {todolists, tasks, removeTask, addTask, changeTaskStatus, changeTaskTitle,
       removeTodoList, addTodoList, changeTodoListTitle, changeTodoListFilter, isLoggedIn} = useTodolistList()

    if (!isLoggedIn) {
        return <Navigate to={'/todolist-practice/login'} />
    }

    return (
        <Container fixed maxWidth="xl">
            <Grid container style={{padding: '20px 0'}}  >
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={6}>
                {todolists.map(el => {
                    return (
                        <Grid item key={el.id } >
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
    )
}