import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {selectTodolists} from 'features/TodolistList/todolistSelectors';
import {selectTasks} from 'features/TodolistList/tasksSelectors';
import {selectAuthIsLoggedIn} from 'features/auth/authSelectors';
import {
    addTodolistTC,
    removeTodolistTC,
    setTodolistsTC, todolistsActions,
    updateTodolistTitleTC
} from 'features/TodolistList/todoListsReducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from 'features/TodolistList/tasksReducer';
import {TaskStatuses} from 'common/enum';
import {FilterValueType} from 'features/TodolistList/TodolistList';

export const useTodolistList = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!isLoggedIn) {
            return
        }
        dispatch(setTodolistsTC())
    }, [])

    //tasks
    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(removeTaskTC(todoListId, taskId))
    }, [dispatch])
    const addTask = useCallback((todoListsId: string, title: string) => {
        dispatch(addTaskTC(todoListsId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todoListId, taskId, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todoListId, taskId, {title}))
    }, [dispatch])

    //todoLists
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistTC(todoListId))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todoListId, title))
    }, [dispatch])
    const changeTodoListFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(todolistsActions.changeTodoListFilter({todolistId: todolistId, filter}))
    }, [dispatch])

    return {
        todolists, tasks, dispatch, removeTask, addTask, changeTaskStatus, changeTaskTitle,
        removeTodoList, addTodoList, changeTodoListTitle, changeTodoListFilter, isLoggedIn
    }
}
