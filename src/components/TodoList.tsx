import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button} from '@mui/material';

type TodoListType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    filter: FilterValueType

    removeTask: (todoListID: string, taskID: string) => void
    changeCheckedTasks: (todoListID: string, taskID: string, newIsDone: boolean) => void
    filteredTasks: (filterValue: FilterValueType, todoListID: string) => void
    addNewTask: (todoListsID: string, title: string) => void
    updateTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void

    removeTodoList: (todoListID: string) => void
    updateTodoListTitle: (todoListID: string, newTitle: string) => void
}

const TodoList = (props: TodoListType) => {

    const allOnClickHandler = () => {
        props.filteredTasks('All', props.todoListID)
    }
    const activeOnClickHandler = () => {
        props.filteredTasks('Active', props.todoListID)
    }
    const completedOnClickHandler = () => {
        props.filteredTasks('Completed', props.todoListID)
    }

    const updateTodoListTitleHandler = (newTitle: string) => {
        props.updateTodoListTitle(props.todoListID, newTitle)
    }

    const removeTodolistHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const addTaskHandler = (title: string) => {
        props.addNewTask(props.todoListID, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={updateTodoListTitleHandler}/>
                {/*<button onClick={removeTodolistHandler}> X</button>*/}
                <Button variant="outlined" onClick={removeTodolistHandler}> X </Button>
            </h3>

            <AddItemForm addItem={addTaskHandler}/>

            <ul>
                {props.tasks.map(el => {

                    const removeTaskHandler = () => {
                        props.removeTask(props.todoListID, el.id)
                    }

                    const changeCheckedTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeCheckedTasks(props.todoListID, el.id, newIsDone)
                    }

                    const updateTaskTitleHandler = (newTitle: string) => {
                        props.updateTaskTitle(props.todoListID, el.id, newTitle)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={changeCheckedTaskHandler}
                            />

                            <EditableSpan oldTitle={el.title} callBack={updateTaskTitleHandler}/>

                            <button onClick={removeTaskHandler}> X </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={allOnClickHandler} className={props.filter === 'All' ? 'active-filter' : ''}>All</button>
                <button onClick={activeOnClickHandler} className={props.filter === 'Active' ? 'active-filter' : ''}>Active</button>
                <button onClick={completedOnClickHandler} className={props.filter === 'Completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList;