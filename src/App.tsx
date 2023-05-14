import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';

export type TasksStateType = {
    [key: string] : TasksType[]
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
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTask = (todoListID: string, taskID: string) => {
        //setTasks(tasks.filter(el => el.id !== taskID))
        setTasks( {...tasks, [todoListID] : tasks[todoListID].filter( el => el.id !== taskID )})
    }

    const changeCheckedTasks = (todoListID: string, taskID: string, newIsDone: boolean) => {
        //setTasks(tasks.map(el => el.id === taskID ? {...el, isDone: newIsDone} : el))
        setTasks( {...tasks, [todoListID]: tasks[todoListID].map( el => el.id === taskID ? {...el, isDone: newIsDone} : el ) } )
    }

    const filteredTasks = (filterValue: FilterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(el => el.id === todoListID ? {...el, filter: filterValue} : el))
    }

    const addNewTask = (todoListsID: string ,title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks( {...tasks, [todoListsID]: [newTask, ...tasks[todoListsID]] } )
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists( todoLists.filter( el => el.id !== todoListID ) )
        delete tasks[todoListID]
    }

    return (
        <div className="App">

            {todoLists.map(el => {

                let filterTask = tasks[el.id]

                if (el.filter === 'Active') {
                    filterTask = tasks[el.id].filter(el => !el.isDone)
                }
                if (el.filter === 'Completed') {
                    filterTask = tasks[el.id].filter(el => el.isDone)
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
                        removeTodoList={removeTodoList}
                    />
                )
            })}


        </div>
    );
}

export default App;
