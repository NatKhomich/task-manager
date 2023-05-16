import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
    updateTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    updateTodoListTitle: (todoListID: string, newTitle: string) => void
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

    const addTask = (title: string) => {
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

    const callBackEditableSpanTodoListHandler = (newTitle: string) => {
        props.updateTodoListTitle(props.todoListID, newTitle)
    }

    const removeTodolistHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} callBack={callBackEditableSpanTodoListHandler} />
                <button onClick={removeTodolistHandler}> X </button>
            </h3>

            <AddItemForm addItem={ addTask} />

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

                    const callBackEditableSpanTaskHandler = (newTitle: string) => {
                        props.updateTaskTitle(props.todoListID, el.id, newTitle)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={changeCheckedTaskHandler}
                            />
                            {/*<span>{el.title}</span>*/}

                            <EditableSpan value={el.title} callBack={ callBackEditableSpanTaskHandler }/>

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