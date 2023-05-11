import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

function App() {

const [tasks, setTasks] = useState<TasksType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Rest API", isDone: false }
])



    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasks}

            />
        </div>
    );
}

export default App;
