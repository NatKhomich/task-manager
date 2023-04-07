import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TasksType} from '../App';
import AddItemForm from './AddItemForm';

type TodolistPropsType = {
    tasks: TasksType[]
    title: string
    removeTask: (todolistID: string, taskID: string) => void
    filterValueTask: (todolistID: string ,filterValue: FilterValueType) => void
    addTask: (todolistID: string, inputTitle: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, newIsDone: boolean) => void
    filter: FilterValueType
    todolistID: string
    removeTodolist: (todolistID: string)=> void
}

const Todolist = (props: TodolistPropsType) => {

    /*const [inputTitle, setInputTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (inputTitle.trim() !== '') {
            props.addTask(props.todolistID, inputTitle.trim())
            setInputTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }*/

    /*const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value)
    }*/

    const onClickAllHandler = () => {
        props.filterValueTask( props.todolistID,'All')
    }

    const onClickActiveHandler = () => {
        props.filterValueTask(props.todolistID,'Active')
    }

    const onClickCompletedHandler = () => {
        props.filterValueTask(props.todolistID,'Completed')
    }

    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskHandlerBroker = (inputTitle: string) => {
        props.addTask(props.todolistID, inputTitle)
    }

    return (
        <div>
            <h3> {props.title}
                <button onClick={ onClickRemoveTodolistHandler }> X </button>
            </h3>

            <AddItemForm callBack={ addTaskHandlerBroker } />
            {/*<div>
                <input value={inputTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}> +</button>
                { error && <div className = 'error-message'> {error} </div> }
            </div>*/}
            <ul>

                {props.tasks.map(el => {

                    const onClickRemoveTaskHandler = () => {
                        props.removeTask(props.todolistID ,el.id)
                    }

                    const onChangeCheckedHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = event.currentTarget.checked
                        props.changeTaskStatus(props.todolistID ,el.id, newIsDone)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={onChangeCheckedHandler}

                            />
                            <span> {el.title} </span>
                            <button onClick={onClickRemoveTaskHandler}> X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onClickAllHandler}> All</button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''} onClick={onClickActiveHandler}> Active</button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''} onClick={onClickCompletedHandler}> Completed</button>
            </div>
        </div>
    );
};

export default Todolist;