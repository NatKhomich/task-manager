import React, {ChangeEvent, FC} from 'react';
import {FilterValueType, TasksType} from '../App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import {ListItem} from '@mui/material';

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

type TodoListType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    filter: FilterValueType

    removeTask: (todoListID: string, taskID: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, newIsDone: boolean) => void
    changeTodoListFilter: (todoListID: string, filterValue: FilterValueType) => void
    addTask: (todoListsID: string, title: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void

    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

const TodoList: FC<TodoListType> = (props) => {

    const allOnClickHandler = () => {
        props.changeTodoListFilter(props.todoListID,'All')
    }
    const activeOnClickHandler = () => {
        props.changeTodoListFilter(props.todoListID,'Active')
    }
    const completedOnClickHandler = () => {
        props.changeTodoListFilter(props.todoListID,'Completed')
    }

    const updateTodoListTitleHandler = (newTitle: string) => {
        props.changeTodoListTitle(props.todoListID, newTitle)
    }

    const removeTodolistHandler = () => {
        props.removeTodoList(props.todoListID)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(props.todoListID, title)
    }

    return (
        <div>
            <Typography component={'h4'} variant="h5" align="center" fontWeight="bold" margin="10px 0">
                <EditableSpan oldTitle={props.title} callBack={updateTodoListTitleHandler}/>

                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>

            </Typography>

            <AddItemForm addItem={addTaskHandler}/>

            <div  style={{padding: '10px 0'}}>
                {props.tasks.map(el => {
                    console.log(props.tasks)

                    const removeTaskHandler = () => {
                        props.removeTask(props.todoListID, el.id)
                    }

                    const changeCheckedTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeTaskStatus(props.todoListID, el.id, newIsDone)
                    }

                    const updateTaskTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.todoListID, el.id, newTitle)
                    }

                    return (
                        <ListItem key={el.id}
                                  style={{padding: '3px', marginRight: "20px"}}
                                  className={el.isDone ? 'is-done' : ''}
                                  secondaryAction={
                                      <IconButton aria-label="delete" onClick={removeTaskHandler}>
                                      <DeleteIcon fontSize="small"/>
                                      </IconButton>
                                  }
                                  disablePadding>

                            <Checkbox {...label}
                                      checked={el.isDone}
                                      size="small"
                                      onChange={changeCheckedTaskHandler}/>

                            <EditableSpan oldTitle={el.title} callBack={updateTaskTitleHandler}/>

                        </ListItem>
                    );
                })}
            </div>

            <div className={'btn-container'}>
                <Button onClick={allOnClickHandler}
                        variant={props.filter === 'All' ? 'contained' : 'text'}
                        size="small"
                        color="secondary"
                        disableElevation>
                    All
                </Button>
                <Button onClick={activeOnClickHandler}
                        variant={props.filter === 'Active' ? 'contained' : 'text'}
                        size="small"
                        color="secondary">
                    Active
                </Button>
                <Button onClick={completedOnClickHandler}
                        variant={props.filter === 'Completed' ? 'contained' : 'text'}
                        size="small"
                        color="secondary">
                    Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;