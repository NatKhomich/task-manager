import React from 'react';
import {FilterPropsType, TasksType} from '../App';

type TodoListType = {
    tasks: TasksType[]
    title: string
    deleteTask: (taskID: string)=> void
    filteredTasks: (buttonValue: FilterPropsType)=> void
}

const TodoList = (props: TodoListType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map( el => {

                    const deleteTaskHandler = () => {
                        props.deleteTask(el.id)
                    }

                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={deleteTaskHandler}> X </button>
                        </li>
                    )

                })}
            </ul>
            <div>
                <button onClick={ ()=> {props.filteredTasks('All')} }>All</button>
                <button onClick={ ()=> {props.filteredTasks('Active')} }>Active</button>
                <button onClick={ ()=> {props.filteredTasks('Completed')} }>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;