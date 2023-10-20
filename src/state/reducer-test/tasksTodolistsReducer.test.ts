import {TasksInitialStateType, tasksReducer} from '../tasksReducer';
import {todolistsActions, TodolistsInitialStateType, todoListsReducer} from '../todoListsReducer';


test('ids should be equals', () => {
    const startTasksState: TasksInitialStateType = {}
    const startTodoListsState: TodolistsInitialStateType = []

    const action = todolistsActions.addTodoList({todolist:
            {id: 'todolistId', title: 'html', addedDate: '', order: 0}})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe('todolistId')
    expect(idFromTodoLists).toBe('todolistId')
})