import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../state/store';
import {
    addTodolistTC,
    changeTodoListFilterAC,
    removeTodolistTC,
    setTodolistsTC,
    updateTodolistTitleTC
} from '../state/todoListsReducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from '../state/tasksReducer';
import {TaskStatuses} from '../api/todolists-api';
import {FilterValueType} from '../features/TodolistList/TodolistList';

export const useTodolistList = () => {
    const todolists = useAppSelector(state => state.todoLists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
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
    const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValueType) => {
        dispatch(changeTodoListFilterAC(todoListId, filter))
    }, [dispatch])

    return {
        todolists, tasks, dispatch, removeTask, addTask, changeTaskStatus, changeTaskTitle,
        removeTodoList, addTodoList, changeTodoListTitle, changeTodoListFilter, isLoggedIn
    }
}
