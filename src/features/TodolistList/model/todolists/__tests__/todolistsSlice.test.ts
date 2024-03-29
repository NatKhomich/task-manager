import {
    todolistsActions,
    TodolistsInitialStateType,
    todolistsSlice,
    todolistsThunks
} from 'features/TodolistList/model/todolists/todolistsSlice';
import {v1} from 'uuid';
import { FilterValueType } from "features/TodolistList/ui/Todolist/FilterTasksButtons/FilterTasksButtons"


let todolistId1: string
let todolistId2: string

let startState: TodolistsInitialStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsSlice(startState, todolistsThunks.removeTodolist.fulfilled(
        {todolistId: todolistId1}, //то что санка возвращает
        'requestId',
        todolistId1 //то что санка принимает
    ))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const todolist = {
        id: 'todolistId',
        title: 'New Todolist',
        addedDate: '',
        order: 0
    }

    let newTodolistTitle = 'New Todolist'
    const endState = todolistsSlice(startState, todolistsThunks.addTodolist.fulfilled(
        {todolist}, 'requestId', 'New Todolist'
    ))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist'
    const endState =
        todolistsSlice(startState, todolistsThunks.updateTodolistTitle.fulfilled({
            todolistId: todolistId2,
            title: newTodolistTitle
        }, '', { todolistId: todolistId2, title: newTodolistTitle}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = 'completed'
    const endState = todolistsSlice(startState, todolistsActions.changeTodoListFilter(
        {todolistId: todolistId2, filter: newFilter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
