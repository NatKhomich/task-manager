import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {selectTodolists} from 'features/TodolistList/todolistSelectors';
import {selectTasks} from 'features/TodolistList/tasksSelectors';
import {selectAuthIsLoggedIn} from 'features/auth/authSelectors';
import {
    todolistsActions, todolistsThunks,
   } from 'features/TodolistList/todolistsReducer';
import {tasksThunks} from 'features/TodolistList/tasksReducer';
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
        dispatch(todolistsThunks.fetchTodolists())
    }, [])

    //tasks
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(tasksThunks.removeTask({todolistId, taskId}))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(tasksThunks.addTask({todolistId, title}))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(tasksThunks.updateTask({todolistId: todolistId, taskId: taskId, domainModel: {status}}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(tasksThunks.updateTask({todolistId: todolistId, taskId: taskId, domainModel: {title}}))
    }, [dispatch])

    //todoLists
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(todolistsThunks.removeTodolist(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(todolistsThunks.addTodolist(title))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(todolistsThunks.updateTodolistTitle({todolistId, title}))
    }, [dispatch])
    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(todolistsActions.changeTodoListFilter({todolistId: todolistId, filter}))
    }, [dispatch])

    return {
        todolists, tasks, dispatch, removeTask, addTask, changeTaskStatus, changeTaskTitle,
        removeTodolist, addTodolist, changeTodolistTitle, changeTodolistFilter, isLoggedIn
    }
}
