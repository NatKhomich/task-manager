import {tasksReducer, TasksStateType} from '../tasksReducer';
import {addTodoListAC, todoListsReducer} from '../todoListsReducer';
import {TodolistCommonType} from '../../features/TodolistList/TodolistList';


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodolistCommonType> = []

    const action = addTodoListAC({id: 'todolistId', title: 'html', addedDate: '', order: 0})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe('todolistId')
    expect(idFromTodoLists).toBe('todolistId')
})