import React, {useState} from 'react';
import './App.css';
import Todolist from './components/Todolist';
import {v1} from 'uuid';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState<TasksType[]>([
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false}
        ]
    )

    const [filter, setFilter] = useState<FilterValueType>('All')

    let filteredTask = tasks

    if (filter === 'Active') {
        filteredTask = tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        filteredTask = (tasks.filter(el => el.isDone))
    }

    const filterValueTask = (filterValue: FilterValueType) => {
        setFilter(filterValue)
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(el => el.id !== taskID))
    }

    const addTask = (inputTitle: string) => {
        let newTask: TasksType = {id: v1(), title: inputTitle, isDone: false}
        setTasks( [newTask, ...tasks] )
    }

    const changeTaskStatus = (taskID: string, newIsDone: boolean) => {
        setTasks( tasks.map(el => el.id === taskID ? {...el, isDone: newIsDone} : el) )
    }

    return (
        <div className="App">
            <Todolist tasks={filteredTask}
                      title={'What to learn'}
                      removeTask={removeTask}
                      filterValueTask={filterValueTask}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
