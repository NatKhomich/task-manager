import React, {useState} from 'react';
import './App.css';
import Todolist from './components/Todolist';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStatePropsType = {
    [todolistID: string]: TasksType[]
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState<TaskStatePropsType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const filterValueTask = (todolistID: string, filterValue: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: filterValue} : el))
    }

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }

    const addTask = (todolistID: string, inputTitle: string) => {
        let newTask: TasksType = {id: v1(), title: inputTitle, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    const changeTaskStatus = (todolistID: string, taskID: string, newIsDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone: newIsDone} : el)
        })
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
    }

    const addTodolist = (inputTitle: string) => {
        const newTodolistID = v1()
        const newTodolist: TodolistsType = {id: newTodolistID, title: inputTitle, filter: 'All'}
        setTodolists( [newTodolist, ...todolists ] )
        setTasks( {...tasks, [newTodolistID]: [] } )
    }

    const onChangeTaskEditableSpan = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    const onChangeTodolistEditableSpan = (todolistID: string, newTitle: string) => {
        setTodolists( todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el ))
    }

    return (
        <div className="App">

            <AddItemForm callBack={addTodolist}/>

            {todolists.map(el => {

                let filteredTask = tasks[el.id]

                if (el.filter === 'Active') {
                    filteredTask = tasks[el.id].filter(el => !el.isDone)
                }
                if (el.filter === 'Completed') {
                    filteredTask = (tasks[el.id].filter(el => el.isDone))
                }

                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        tasks={filteredTask}
                        title={el.title}
                        removeTask={removeTask}
                        filterValueTask={filterValueTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}

                        onChangeTaskEditableSpan={onChangeTaskEditableSpan}

                        onChangeTodolistEditableSpan={onChangeTodolistEditableSpan}

                    />
                )
            })}
        </div>
    );
}

export default App;
