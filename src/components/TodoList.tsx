import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
               {/* <button onClick={removeTodolistHandler}> X</button>*/}
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon />
                </IconButton>

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

                         {/* <input type="checkbox" checked={el.isDone} onChange={changeCheckedTaskHandler}/>*/}

                            <Checkbox {...label}
                                      checked={el.isDone}
                                      size="small"
                                      onChange={changeCheckedTaskHandler}/>

                            <EditableSpan oldTitle={el.title} callBack={updateTaskTitleHandler}/>

                          {/*  <button onClick={removeTaskHandler}> X </button>*/}
                            <IconButton aria-label="delete" onClick={removeTaskHandler}  >
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button onClick={allOnClickHandler}
                        /*className={props.filter === 'All' ? 'active-filter' : ''}*/
                        variant={props.filter === 'All' ? "contained" : "text"}
                        size="small"
                        color="secondary">
                    All
                </Button>
                <Button onClick={activeOnClickHandler}
                       /* className={props.filter === 'Active' ? 'active-filter' : ''}*/
                        variant={props.filter === 'Active' ? "contained" : "text"}
                        size="small"
                        color="secondary">
                    Active
                </Button>
                <Button onClick={completedOnClickHandler}
                       /* className={props.filter === 'Completed' ? 'active-filter' : ''}*/
                        variant={props.filter === 'Completed' ? "contained" : "text"}
                        size="small"
                        color="secondary">
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;