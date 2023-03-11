import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValuesType, TaskType} from './Todolist';


function App(): JSX.Element {
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'React', isDone: false},
            {id: 4, title: 'NodeJS', isDone: false}
        ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(el => el.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValuesType>('All')

    const changeTodolistFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender: Array<TaskType> = []

    if (filter === 'All') {
        tasksForRender = tasks
    }
    if (filter === 'Active') {
        tasksForRender = tasks.filter(el => el.isDone === false)
    }
    if (filter === 'Completed') {
        tasksForRender = tasks.filter(el => el.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeTodolistFilter={changeTodolistFilter}

            />
        </div>
    );
}

export default App;
