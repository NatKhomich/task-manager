import React, {useCallback, useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList';
import AddItemForm from './components/AddItemForm';
import {ButtonAppBar} from './components/ ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from './state/todoListsReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TasksStateType = {
    [key: string]: TasksType[]
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todoLists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    //tasks
    const removeTask = useCallback((todoListID: string, taskID: string) => { //удаление таски
        dispatch(removeTaskAC(todoListID, taskID))
    }, [dispatch])
    const addTask = useCallback((todoListsID: string, title: string) => {//добавить таску
        dispatch(addTaskAC(todoListsID, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((todoListID: string, taskID: string, newIsDone: boolean) => {//изм статуса чекбокса
        dispatch(changeTaskStatusAC(todoListID, taskID, newIsDone))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListID: string, taskID: string, newTitle: string) => {//редактирование заголовка таски
        dispatch(changeTaskTitleAC(todoListID, taskID, newTitle))
    }, [dispatch])

    //todoLists
    const removeTodoList = useCallback((todoListID: string) => {//удалить тудулист
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {//добавить тудулист
        dispatch(addTodoListAC(title))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {//редактирование заголовка тудулиста
        dispatch(changeTodoListTitleAC(todoListID, newTitle))
    }, [dispatch])
    const changeTodoListFilter = useCallback((todoListID: string, filter: FilterValueType) => {//фильтр по кнопкам
        dispatch(changeTodoListFilterAC(todoListID, filter))
    }, [dispatch])


    const mode = isDarkMode ? 'dark' : 'light'

    const customTheme = createTheme({
        palette: {
            primary: {
                main: '#1a237e',
            },
            secondary: {
                main: '#8c9eff',
            },
            mode: mode
        },
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
                    <Grid container spacing={4}>
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

export default AppWithRedux;
