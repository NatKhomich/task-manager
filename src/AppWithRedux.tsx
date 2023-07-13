import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';
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
    todoListsReducer
} from './state/todoListsReducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasksReducer';
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

    const todoLists = useSelector<AppRootStateType, TodoListsType[]>( state => state.todoLists)

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    //tasks
    const removeTask = (todoListID: string, taskID: string) => { //удаление таски
        dispatch(removeTaskAC(todoListID, taskID))
    }
    const addTask = (todoListsID: string, title: string) => {//добавить таску
        dispatch(addTaskAC(todoListsID, title))
    }
    const changeTaskStatus = (todoListID: string, taskID: string, newIsDone: boolean) => {//изм статуса чекбокса
        dispatch(changeTaskStatusAC(todoListID, taskID, newIsDone))
    }
    const changeTaskTitle = (todoListID: string, taskID: string, newTitle: string) => {//редактирование заголовка таски
        dispatch(changeTaskTitleAC(todoListID, taskID, newTitle))
    }

    //todoLists
    const removeTodoList = (todoListID: string) => {//удалить тудулист
        dispatch(removeTodoListAC(todoListID))

    }
    const addTodoList = (title: string) => {//добавить тудулист
        dispatch( addTodoListAC(title))

    }
    const changeTodoListTitle = (todoListID: string, newTitle: string) => {//редактирование заголовка тудулиста
        dispatch(changeTodoListTitleAC(todoListID, newTitle))
    }
    const changeTodoListFilter = (todoListID: string, filter: FilterValueType) => {//фильтр по кнопкам
        dispatch(changeTodoListFilterAC(todoListID, filter))
    }


    const getFilteredTasksForRender = (todoLists: TasksType[], filterValue: FilterValueType) => {
        if (filterValue === 'Active') {
            return todoLists.filter(el => !el.isDone)
        } else if (filterValue === 'Completed') {
            return todoLists.filter(el => el.isDone)
        } else return todoLists
    }

    const mode = isDarkMode ? "dark" : "light"

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

        <ThemeProvider theme={customTheme} >
            <CssBaseline></CssBaseline>

        <div className="App">

            <ButtonAppBar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode}/>

            <Container fixed maxWidth="xl" >

                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={4}  >

                    {todoLists.map(el => {

                        const tasksForRender: TasksType[] =  getFilteredTasksForRender(tasks[el.id], el.filter)

                        return (
                            <Grid item key={el.id} >

                                <Paper elevation={4} style={{padding: '10px'}}>

                                <TodoList
                                    todoListID={el.id}
                                    title={el.title}
                                    tasks={tasksForRender}
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
