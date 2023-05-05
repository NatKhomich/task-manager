import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterPropsType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks, setTasks] = useState( [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false }
    ] )

    const [filter, setFilter] = useState<FilterPropsType>('All')

    let filterTask = tasks

    if (filter === 'Active') {
        filterTask =  tasks.filter( el => !el.isDone )
    }
    else if (filter === 'Completed') {
        filterTask = tasks.filter( el => el.isDone )
    }

    const filteredTasks = ( buttonValue: FilterPropsType ) => {
        setFilter(buttonValue)
    }

    const deleteTask = (taskID: string) => {
       setTasks( tasks.filter( el => el.id !== taskID ))
    }


    return (
        <div className={'App'}>
            <TodoList tasks={filterTask}
                      title={'What to learn'}
                      deleteTask={deleteTask}
                      filteredTasks={filteredTasks}

            />
        </div>

    );
}

export default App;
