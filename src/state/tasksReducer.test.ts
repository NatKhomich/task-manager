import { TaskStatuses } from '../api/todolists-api';
import {TasksStateType} from '../App'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasksReducer';
import {addTodoListAC} from './todoListsReducer';

let startState: TasksStateType

beforeEach( () => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, startDate: '', priority: 0,
                description: '', deadline: '', todoListId: 'todolistId1', addedDate: '', completed: false, order: 0},
            {id: '2', title: 'JS', status: TaskStatuses.New, startDate: '', priority: 0,
                description: '', deadline: '', todoListId: 'todolistId1', addedDate: '', completed: false, order: 0},
            {id: '3', title: 'React', status: TaskStatuses.New, startDate: '', priority: 0,
                description: '', deadline: '', todoListId: 'todolistId1', addedDate: '', completed: false, order: 0}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, startDate: '', priority: 0,
                description: '', deadline: '', todoListId: 'todolistId2', addedDate: '', completed: false, order: 0},
            {id: '2', title: 'milk', status: TaskStatuses.New, startDate: '', priority: 0,
                description: '', deadline: '', todoListId: 'todolistId2', addedDate: '', completed: false, order: 0},
            {id: '3', title: 'tea', status: TaskStatuses.New, startDate: '', priority: 0,
                description: '', deadline: '', todoListId: 'todolistId2', addedDate: '', completed: false, order: 0}
        ]
    }
} )

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('todolistId2' ,'2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
        {id: '1', title: 'CSS', status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: 'todolistId1', addedDate: '', completed: false, order: 0},
        {id: '2', title: 'JS', status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: 'todolistId1', addedDate: '', completed: false, order: 0},
        {id: '3', title: 'React', status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: 'todolistId1', addedDate: '', completed: false, order: 0}
    ],
        'todolistId2': [
        {id: '1', title: 'bread', status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: 'todolistId2', addedDate: '', completed: false, order: 0},
        {id: '2', title: 'tea', status: TaskStatuses.New, startDate: '', priority: 0,
            description: '', deadline: 0, todoListId: 'todolistId2', addedDate: '', completed: false, order: 0}
    ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC({id: '5', title: 'New Task', status: TaskStatuses.New, startDate: '', priority: 0,
        description: '', deadline: '', todoListId: 'todolistId1', addedDate: '', completed: false, order: 0})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId1'][0].title).toBe('New Task')
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistId2','2', TaskStatuses.Completed)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {

    const newTitle = 'hi hi'

    const action = changeTaskTitleAC('todolistId2','2', newTitle)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('hi hi')
    expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC({id: 'todolistId', title: 'html', addedDate: '', order: 0})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})