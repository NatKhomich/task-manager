import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksType} from '../App';

type TodoListType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    removeTask: (taskID: string) => void
    changeCheckedTasks: (taskID: string, newIsDone: boolean) => void
    filteredTasks: (filterValue: FilterValueType, todoListID: string) => void
    addNewTask: (newTitle: string)=> void
    filter: FilterValueType
}

const TodoList = (props: TodoListType) => {

    const [title, setTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addNewTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if( e.key === 'Enter' ) {
            addTaskHandler()
        }
    }

    const allOnClickHandler = () => {
        props.filteredTasks('All', props.todoListID)
    }

    const activeOnClickHandler = () => {
        props.filteredTasks('Active', props.todoListID)
    }

    const completedOnClickHandler = () => {
        props.filteredTasks('Completed', props.todoListID)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={ onChangeTitleHandler }
                       onKeyDown={ onKeyDownHandler }
                       className={ error ? 'error' : '' }
                />
                <button onClick={ addTaskHandler }> + </button>
                {error && <div className={'error-message'}> {error} </div>}
            </div>
            <ul>
                {props.tasks.map(el => {

                    const removeTaskHandler = () => {
                        props.removeTask(el.id)
                    }

                    const changeCheckedTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeCheckedTasks(el.id, newIsDone)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={changeCheckedTaskHandler}
                            />
                            <span>{el.title}</span>
                            <button onClick={removeTaskHandler}> X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={ allOnClickHandler } className={props.filter === 'All' ? 'active-filter' : ''}>All</button>
                <button onClick={ activeOnClickHandler } className={props.filter === 'Active' ? 'active-filter' : ''}>Active</button>
                <button onClick={ completedOnClickHandler } className={props.filter === 'Completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )


}

export default TodoList;