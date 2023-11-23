import { useAppDispatch, useAppSelector } from "app/model/store"
import { selectTodolists } from "features/TodolistList/model/todolists/todolistSelectors"
import { selectTasks } from "features/TodolistList/model/tasks/tasksSelectors"
import { selectAuthIsLoggedIn } from "features/auth/model/authSelectors"
import { useCallback, useEffect } from "react"
import { todolistsThunks } from "features/TodolistList/model/todolists/todolistsSlice"

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

  const addTodolistCallback = useCallback((title: string) => {
   return dispatch(todolistsThunks.addTodolist(title)).unwrap()
  }, [dispatch])

  return {
    todolists, tasks, addTodolistCallback, isLoggedIn
  }
}