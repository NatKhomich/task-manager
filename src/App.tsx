import React, { useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';
import {ButtonAppBar} from './components/ ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';

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

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false}


        ],
        [todolistID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Coffee', isDone: true},
            {id: v1(), title: 'Bread', isDone: false}

        ]
    })

    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    //tasks
    const removeTask = (todoListID: string, taskID: string) => { //удаление таски
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }
    const addTask = (todoListsID: string, title: string) => {//добавить таску
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListsID]: [newTask, ...tasks[todoListsID]]})
    }
    const changeTaskStatus = (todoListID: string, taskID: string, newIsDone: boolean) => {//изм статуса чекбокса
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone: newIsDone} : el)
        })
    }
    const changeTaskTitle = (todoListID: string, taskID: string, newTitle: string) => {//редактирование заголовка таски
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    //todoLists
    const removeTodoList = (todoListID: string) => {//удалить тудулист
        setTodoLists(todoLists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodoList = (title: string) => {//добавить тудулист
        let newTodoListID = v1()
        let newTodoList: TodoListsType = {id: newTodoListID, title: title, filter: 'All'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const changeTodoListTitle = (todoListID: string, newTitle: string) => {//редактирование заголовка тудулиста
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, title: newTitle} : el))
    }
    const changeTodoListFilter = (filter: FilterValueType, todoListID: string) => {//фильтр по кнопкам
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: filter} : el))
    }


    const getFilteredTasksForRender = (todoLists: TasksType[], filterValue: FilterValueType) => {
        if (filterValue === 'Active') {
            return todoLists.filter(el => !el.isDone)
        } else if (filterValue === 'Completed') {
            return todoLists.filter(el => el.isDone)
        } else return todoLists
    }

    //темная/светлая тема в зависимости от времени суток
   /* useEffect(()=> {
        const date = new Date()
        const hours = date.getHours()

        if (hours >= 8 && hours < 20) {
            setIsDarkMode(false)
        } else {
            setIsDarkMode(true)
        }
    }, [])*/

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

export default App;
