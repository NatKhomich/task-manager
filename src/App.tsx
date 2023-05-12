import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {

const [tasks, setTasks] = useState<TasksType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false }
])

    const [filter, setFilter] = useState<FilterValueType>('All')

    const removeTask = (taskID: string) => {
    setTasks( tasks.filter( el => el.id !== taskID ) )
    }

    const changeCheckedTasks = (taskID: string, newIsDone: boolean) => {
        setTasks( tasks.map( el => el.id === taskID ? {...el, isDone: newIsDone} : el ) )
    }

    let filterTask = tasks

    if(filter === 'Active') {
        filterTask = tasks.filter( el => !el.isDone )
    }
    if(filter === 'Completed') {
        filterTask = tasks.filter( el => el.isDone )
    }

    const filteredTasks = (filterValue: FilterValueType) => {
        setFilter( filterValue )
    }

    const addNewTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks( [newTask, ...tasks] )

    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={filterTask}
                      removeTask={removeTask}
                      changeCheckedTasks={changeCheckedTasks}
                      filteredTasks={filteredTasks}
                      addNewTask={addNewTask}
                      filter={filter}

            />
        </div>
    );
}

export default App;
