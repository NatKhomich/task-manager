import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksType} from '../App';
import AddItemForm from './AddItemForm';

type TodoListType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    removeTask: (todoListID: string, taskID: string) => void
    changeCheckedTasks: (todoListID: string, taskID: string, newIsDone: boolean) => void
    filteredTasks: (filterValue: FilterValueType, todoListID: string) => void
    addNewTask: (todoListsID: string ,title: string)=> void
    filter: FilterValueType
    removeTodoList: (todoListID: string) => void
}

const TodoList = (props: TodoListType) => {

    /*const [title, setTitle] = useState('')

    const [error, setError] = useState<string | null>(null)*/

    /*const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
    }*/

    /*const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addNewTask(props.todoListID ,title.trim())
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
    }*/

    const addTaskHandler = (title: string) => {
        props.addNewTask(props.todoListID, title)
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
            <h3>{props.title} <button onClick={ ()=> {props.removeTodoList(props.todoListID)} }> X </button> </h3>

            <AddItemForm addItem={ addTaskHandler} />

           {/* <div>
                <input value={title}
                       onChange={ onChangeTitleHandler }
                       onKeyDown={ onKeyDownHandler }
                       className={ error ? 'error' : '' }
                />
                <button onClick={ addTaskHandler }> + </button>
                {error && <div className={'error-message'}> {error} </div>}
            </div>*/}
            <ul>
                {props.tasks.map(el => {

                    const removeTaskHandler = () => {
                        props.removeTask(props.todoListID, el.id)
                    }

                    const changeCheckedTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeCheckedTasks(props.todoListID ,el.id, newIsDone)
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