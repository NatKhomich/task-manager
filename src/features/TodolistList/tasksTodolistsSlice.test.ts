import {TasksInitialStateType, tasksSlice} from 'features/TodolistList/model/tasks/tasksSlice';
import {TodolistsInitialStateType, todolistsSlice, todolistsThunks} from 'features/TodolistList/model/todolists/todolistsSlice';


test('ids should be equals', () => {
    const startTasksState: TasksInitialStateType = {}
    const startTodoListsState: TodolistsInitialStateType = []

    const todolist = {id: 'todolistId', title: 'html', addedDate: '', order: 0}

    const action = todolistsThunks.addTodolist.fulfilled({todolist}, 'requestId', '')

    const endTasksState = tasksSlice(startTasksState, action)
    const endTodoListsState = todolistsSlice(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe('todolistId')
    expect(idFromTodoLists).toBe('todolistId')
})