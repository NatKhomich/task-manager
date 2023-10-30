import {TasksInitialStateType, tasksReducer} from 'features/TodolistList/tasksReducer';
import {todolistsActions, TodolistsInitialStateType, todolistsReducer} from 'features/TodolistList/todolistsReducer';


test('ids should be equals', () => {
    const startTasksState: TasksInitialStateType = {}
    const startTodoListsState: TodolistsInitialStateType = []

    const action = todolistsActions.addTodoList({todolist:
            {id: 'todolistId', title: 'html', addedDate: '', order: 0}})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe('todolistId')
    expect(idFromTodoLists).toBe('todolistId')
})