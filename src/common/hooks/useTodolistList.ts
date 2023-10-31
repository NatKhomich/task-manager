import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'app/store';
import {selectTodolists} from 'features/TodolistList/todolistSelectors';
import {selectTasks} from 'features/TodolistList/tasksSelectors';
import {selectAuthIsLoggedIn} from 'features/auth/authSelectors';
import {
    addTodolistTC,
    removeTodolistTC,
    setTodolistsTC,
    todolistsActions,
    updateTodolistTitleTC
} from 'features/TodolistList/todolistsReducer';
import {tasksThunks, updateTaskTC} from 'features/TodolistList/tasksReducer';
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
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(tasksThunks.removeTask({todolistId, taskId}))
    }, [dispatch])
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(tasksThunks.addTask({todolistId, title}))
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [dispatch])

    //todoLists
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistTitleTC(todolistId, title))
    }, [dispatch])
    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterValueType) => {
        dispatch(todolistsActions.changeTodoListFilter({todolistId: todolistId, filter}))
    }, [dispatch])

    return {
        todolists, tasks, dispatch, removeTask, addTask, changeTaskStatus, changeTaskTitle,
        removeTodolist, addTodolist, changeTodolistTitle, changeTodolistFilter, isLoggedIn
    }
}
