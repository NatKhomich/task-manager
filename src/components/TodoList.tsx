import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksType} from '../App';

type TodoListType = {
    title: string
    tasks: TasksType[]
    removeTask: (taskID: string) => void
    changeCheckedTasks: (taskID: string, newIsDone: boolean) => void
    filteredTasks: (filterValue: FilterValueType) => void
}

const TodoList = (props: TodoListType) => {

    const allOnClickHandler = () => {
        props.filteredTasks('All')
    }

    const activeOnClickHandler = () => {
        props.filteredTasks('Active')
    }

    const completedOnClickHandler = () => {
        props.filteredTasks('Completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button> +</button>
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
                        <li key={el.id}>
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
                <button onClick={ allOnClickHandler }>All</button>
                <button onClick={ activeOnClickHandler }>Active</button>
                <button onClick={ completedOnClickHandler }>Completed</button>
            </div>
        </div>
    )


}

export default TodoList;