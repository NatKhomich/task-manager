import React, {Component, FC} from 'react';

export type FilterValuesType = 'All'|'Active'|'Completed'

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
}

const Todolist: FC <TodolistPropsType> = (props) => {

    let isAllTasksNoIsDone = true //все не выполненные
    for (let i = 0; i < props.tasks.length; i++) {
        if(props.tasks[i].isDone) {
            isAllTasksNoIsDone = false
        }
    }
    const todoClasses = isAllTasksNoIsDone ? "todolist-empty " : "todolist"

    const todolistItems = props.tasks.map( (el) => {
        return <li key={el.id}>
            <input type="checkbox" checked= {el.isDone} />
            <span>{el.title}</span>
            <button className={'btn'} onClick={ ()=> { props.removeTask(el.id) }}> ✖ </button>
        </li>
    })

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button> + </button>
            </div>
            <ul>
                {todolistItems}
            </ul>
            <div>
                <button onClick={ ()=> { props.changeTodolistFilter('All') }}>All</button>
                <button onClick={ ()=> { props.changeTodolistFilter('Active') }}>Active</button>
                <button onClick={ ()=> { props.changeTodolistFilter('Completed') }}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;