import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValueType, TasksType} from '../App';

type TodolistPropsType = {
    tasks: TasksType[]
    title: string
    removeTask: (taskID: string) => void
    filterValueTask: (filterValue: FilterValueType) => void
    addTask: (inputTitle: string) => void
    changeTaskStatus: (taskID: string, newIsDone: boolean) => void
    filter: FilterValueType
}

const Todolist = (props: TodolistPropsType) => {

    const [inputTitle, setInputTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (inputTitle.trim() !== '') {
            props.addTask(inputTitle.trim())
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
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value)
    }

    const onClickAllHandler = () => {
        props.filterValueTask('All')
    }

    const onClickActiveHandler = () => {
        props.filterValueTask('Active')
    }

    const onClickCompletedHandler = () => {
        props.filterValueTask('Completed')
    }

    return (
        <div>
            <h3> {props.title} </h3>
            <div>
                <input value={inputTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}> +</button>
                { error && <div className = 'error-message'> {error} </div> }
            </div>
            <ul>

                {props.tasks.map(el => {

                    const onClickRemoveTaskHandler = () => {
                        props.removeTask(el.id)
                    }

                    const onChangeCheckedHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = event.currentTarget.checked
                        props.changeTaskStatus(el.id, newIsDone)
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