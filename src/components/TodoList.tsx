import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterPropsType, TasksType} from '../App';

type TodoListType = {
    tasks: TasksType[]
    title: string
    deleteTask: (taskID: string)=> void
    filteredTasks: (buttonValue: FilterPropsType)=> void
    addTask: (taskTitle: string)=> void
    onChangeTaskStatus: (taskID: string, isDone: boolean)=> void
}

const TodoList = (props: TodoListType) => {

    let [taskTitle, setTaskTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if(taskTitle.trim() !== '') {
            props.addTask(taskTitle.trim())
            setTaskTitle('')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={ onChangeHandler }
                       onKeyDown={ onKeyDownHandler }

                />
                <button onClick={ addTaskHandler }> + </button>
            </div>
            <ul>
                {props.tasks.map( el => {

                    const deleteTaskHandler = () => {
                        props.deleteTask(el.id)
                    }

                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = e.currentTarget.checked
                        props.onChangeTaskStatus(el.id, newIsDone)
                    }

                    return (
                        <li key={el.id}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={ onChangeTaskStatusHandler }

                            />
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