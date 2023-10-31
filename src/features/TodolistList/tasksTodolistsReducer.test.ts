import {TasksInitialStateType, tasksReducer} from 'features/TodolistList/tasksReducer';
import {TodolistsInitialStateType, todolistsReducer, todolistsThunks} from 'features/TodolistList/todolistsReducer';


test('ids should be equals', () => {
    const startTasksState: TasksInitialStateType = {}
    const startTodoListsState: TodolistsInitialStateType = []

    const todolist = {id: 'todolistId', title: 'html', addedDate: '', order: 0}

    const action = todolistsThunks.addTodolist.fulfilled({todolist}, 'requestId', '')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe('todolistId')
    expect(idFromTodoLists).toBe('todolistId')
})