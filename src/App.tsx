import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import AddItemForm from './components/AddItemForm';
import {ButtonAppBar} from './components/ ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {
    addTodolistTC,
    changeTodoListFilterAC,
    removeTodolistTC,
    setTodolistsTC,
    updateTodolistTitleTC,
} from './state/todoListsReducer';
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from './state/tasksReducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store';
import {TaskStatuses, TaskType, TodolistType} from './api/todolists-api';

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TodolistCommonType = TodolistType & {
    filter: FilterValueType
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

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const todoLists = useSelector<AppRootStateType, TodolistCommonType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
       dispatch(setTodolistsTC())
    }, [])

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    //tasks
    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskTC(todoListId, taskId))
    }, [dispatch])
    const addTask = useCallback((todoListsId: string, title: string) => {
        dispatch(addTaskTC(todoListsId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
       dispatch(updateTaskStatusTC(todoListId, taskId, status))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleTC(todoListId, taskId, title))
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

    const mode = isDarkMode ? 'dark' : 'light'
    const customTheme = createTheme({
        palette: {
            primary: {main: '#1a237e'},
            secondary: {main: '#8c9eff'},
            mode: mode
        }
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline></CssBaseline>
            <div className="App">
                <ButtonAppBar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>
                <Container fixed maxWidth="xl">
                    <Grid container style={{padding: '20px 0'}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={5}>
                        {todoLists.map(el => {
                            return (
                                <Grid item key={el.id}>
                                    <Paper elevation={4} style={{padding: '10px'}}>
                                        <TodoList
                                            todoListID={el.id}
                                            title={el.title}
                                            tasks={tasks[el.id]}
                                            filter={el.filter}

                                            removeTask={removeTask}
                                            changeTaskStatus={changeTaskStatus}
                                            addTask={addTask}
                                            changeTaskTitle={changeTaskTitle}

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
            </div>
        </ThemeProvider>
    );
}

export default App;
