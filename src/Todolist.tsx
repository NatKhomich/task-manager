import React, {Component, FC} from 'react';
import {TaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

const Todolist: FC <TodolistPropsType> = (props) => {

    let isAllTasksNoIsDone = true //все не выполненные
    for (let i = 0; i < props.tasks.length; i++) {
        if(props.tasks[i].isDone) {
            isAllTasksNoIsDone = false
        }
    }
    const todoClasses = isAllTasksNoIsDone ? "todolist-empty " : "todolist"

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;