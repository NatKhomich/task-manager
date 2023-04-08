import React, {ChangeEvent} from 'react';
import {FilterValueType, TasksType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type TodolistPropsType = {
    tasks: TasksType[]
    title: string
    removeTask: (todolistID: string, taskID: string) => void
    filterValueTask: (todolistID: string, filterValue: FilterValueType) => void
    addTask: (todolistID: string, inputTitle: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, newIsDone: boolean) => void
    filter: FilterValueType
    todolistID: string
    removeTodolist: (todolistID: string) => void

    onChangeTaskEditableSpan: (todolistID: string, taskID: string, newTitle: string) => void

    onChangeTodolistEditableSpan: (todolistID: string, newTitle: string) => void
}

const Todolist = (props: TodolistPropsType) => {

    const onClickAllHandler = () => {
        props.filterValueTask(props.todolistID, 'All')
    }

    const onClickActiveHandler = () => {
        props.filterValueTask(props.todolistID, 'Active')
    }

    const onClickCompletedHandler = () => {
        props.filterValueTask(props.todolistID, 'Completed')
    }

    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskHandlerBroker = (inputTitle: string) => {
        props.addTask(props.todolistID, inputTitle)
    }

    const newTitleTodolistEditableSpanHandler = (newTitle: string) => {
        props.onChangeTodolistEditableSpan(props.todolistID, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} callBack={newTitleTodolistEditableSpanHandler}/>
                <button onClick={onClickRemoveTodolistHandler}> X</button>
            </h3>

            <AddItemForm callBack={addTaskHandlerBroker}/>
            <ul>

                {props.tasks.map(el => {

                    const onClickRemoveTaskHandler = () => {
                        props.removeTask(props.todolistID, el.id)
                    }

                    const onChangeCheckedHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        const newIsDone = event.currentTarget.checked
                        props.changeTaskStatus(props.todolistID, el.id, newIsDone)
                    }

                    const newTitleTaskEditableSpanHandler = (newTitle: string) => {
                        props.onChangeTaskEditableSpan(props.todolistID, el.id, newTitle)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={onChangeCheckedHandler}

                            />
                            <EditableSpan value={el.title} callBack={newTitleTaskEditableSpanHandler}/>
                            <button onClick={onClickRemoveTaskHandler}> X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active-filter' : ''} onClick={onClickAllHandler}> All
                </button>
                <button className={props.filter === 'Active' ? 'active-filter' : ''}
                        onClick={onClickActiveHandler}> Active
                </button>
                <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        onClick={onClickCompletedHandler}> Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;