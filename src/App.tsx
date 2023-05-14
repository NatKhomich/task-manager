import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';

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

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'All'},
            {id: v1(), title: 'What to buy', filter: 'All'},
        ]
    )


    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false}
    ])

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(el => el.id !== taskID))
    }

    const changeCheckedTasks = (taskID: string, newIsDone: boolean) => {
        setTasks(tasks.map(el => el.id === taskID ? {...el, isDone: newIsDone} : el))
    }

    const filteredTasks = (filterValue: FilterValueType, todoListID: string) => {
        setTodoLists( todoLists.map( el => el.id === todoListID ? {...el, filter: filterValue} : el ))
    }

    const addNewTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
        <div className="App">

            {todoLists.map(el => {

                let filterTask = tasks

                if (el.filter === 'Active') {
                    filterTask = tasks.filter(el => !el.isDone)
                }
                if (el.filter === 'Completed') {
                    filterTask = tasks.filter(el => el.isDone)
                }

                return (
                    <TodoList
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={filterTask}
                        removeTask={removeTask}
                        changeCheckedTasks={changeCheckedTasks}
                        filteredTasks={filteredTasks}
                        addNewTask={addNewTask}
                        filter={el.filter}
                    />
                )
            })}


        </div>
    );
}

export default App;
