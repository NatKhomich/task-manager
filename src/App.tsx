import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';
import {ButtonAppBar} from './components/ ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


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

    const removeTask = (todoListID: string, taskID: string) => { //удаление таски
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== taskID)})
    }

    const changeCheckedTasks = (todoListID: string, taskID: string, newIsDone: boolean) => {//изм статуса чекбокса
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone: newIsDone} : el)
        })
    }

    const filteredTasks = (filterValue: FilterValueType, todoListID: string) => {//фильтер по кнопкам
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: filterValue} : el))
    }

    const addNewTask = (todoListsID: string, title: string) => {//добавить таску
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListsID]: [newTask, ...tasks[todoListsID]]})
    }

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

    const updateTaskTitle = (todoListID: string, taskID: string, newTitle: string) => {//редактирование заголовка таски
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    const updateTodoListTitle = (todoListID: string, newTitle: string) => {//редактирование заголовка тудулиста
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, title: newTitle} : el))
    }

    return (
        <div className="App">

            <ButtonAppBar/>

            <Container fixed maxWidth="xl" >

                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={3}  >

                    {todoLists.map(el => {

                        let filterTask = tasks[el.id]
                        if (el.filter === 'Active') {
                            filterTask = tasks[el.id].filter(el => !el.isDone)
                        }
                        if (el.filter === 'Completed') {
                            filterTask = tasks[el.id].filter(el => el.isDone)
                        }

                        return (
                            <Grid item key={el.id} >

                                <Paper elevation={2} style={{padding: '10px'}}>

                                <TodoList
                                    todoListID={el.id}
                                    title={el.title}
                                    tasks={filterTask}
                                    filter={el.filter}

                                    removeTask={removeTask}
                                    changeCheckedTasks={changeCheckedTasks}
                                    filteredTasks={filteredTasks}
                                    addNewTask={addNewTask}
                                    updateTaskTitle={updateTaskTitle}

                                    removeTodoList={removeTodoList}
                                    updateTodoListTitle={updateTodoListTitle}
                                />

                                </Paper>

                            </Grid>

                        )
                    })}
                </Grid>

            </Container>

        </div>
    );
}

export default App;
