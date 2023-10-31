import {TasksInitialStateType, tasksReducer, tasksThunks} from 'features/TodolistList/tasksReducer';
import {TaskStatuses} from 'common/enum';
import {todolistsActions} from 'features/TodolistList/todolistsReducer';
import {TaskType} from "features/TodolistList/todolistsApi";


let startState: TasksInitialStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, startDate: '', priority: 0, description: '',
                deadline: '', todoListId: 'todolistId1', addedDate: '', order: 0, entityStatus: 'idle'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.New, startDate: '', priority: 0, description: '',
                deadline: '', todoListId: 'todolistId1', addedDate: '', order: 0, entityStatus: 'idle'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, startDate: '', priority: 0, description: '',
                deadline: '', todoListId: 'todolistId1', addedDate: '', order: 0, entityStatus: 'idle'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, startDate: '', priority: 0, description: '',
                deadline: '', todoListId: 'todolistId2', addedDate: '', order: 0, entityStatus: 'idle'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.New, startDate: '', priority: 0, description: '',
                deadline: '', todoListId: 'todolistId2', addedDate: '', order: 0, entityStatus: 'idle'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, startDate: '', priority: 0, description: '',
                deadline: '', todoListId: 'todolistId2', addedDate: '', order: 0, entityStatus: 'idle'
            }
        ]
    }
})

test("tasks should be added for todolist", () => {
    //1 variant
    // const _action = tasksThunks.fetchTasks.fulfilled(
    //   { tasks: startState["todolistId1"], todolistId: "todolistId1" }, "requestId", "todolistId1");

    //2 variant
    type FetchTasksAction = {
        type: string
        payload: {
            tasks: TaskType[]
            todolistId: string
        }
    }

    const action: FetchTasksAction = {
        type: tasksThunks.fetchTasks.fulfilled.type,
        payload: {
            tasks: startState["todolistId1"],
            todolistId: "todolistId1"
        }
    };

    const endState = tasksReducer(
        {
            todolistId2: [],
            todolistId1: []
        },
        action
    );

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});

test('correct task should be deleted from correct array', () => {

    const action = tasksThunks.removeTask.fulfilled({todolistId: 'todolistId2', taskId: '2'},
        'requestId', {todolistId: 'todolistId2', taskId: '2'})
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                startDate: '',
                priority: 0,
                description: '',
                deadline: '',
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.New,
                startDate: '',
                priority: 0,
                description: '',
                deadline: '',
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                startDate: '',
                priority: 0,
                description: '',
                deadline: '',
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                startDate: '',
                priority: 0,
                description: '',
                deadline: '',
                todoListId: 'todolistId2',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                startDate: '',
                priority: 0,
                description: '',
                deadline: '',
                todoListId: 'todolistId2',
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            }
        ]
    })
})

test('correct task should be added to correct array', () => {
    const task = {
        id: '5', title: 'New Task', status: TaskStatuses.New, startDate: '', priority: 0,
        description: '', deadline: '', todoListId: 'todolistId1', addedDate: '', order: 0
    }

    const action = tasksThunks.addTask.fulfilled(
        {task: task}, //то что санка возврашает
        'requestId',
        {todolistId: 'todolistId1', title: 'New Task'}) //то что принимает санка

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4)
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId1'][0].title).toBe('New Task')
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const payload = {
        todolistId: 'todolistId2',
        taskId: '2',
        domainModel: {status: TaskStatuses.Completed}
    }

    const action = tasksThunks.updateTask.fulfilled(payload, 'requestId', payload)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {

    const newTitle = 'hi hi'

    const payload = {
        todolistId: 'todolistId2',
        taskId: '2',
        domainModel: {title: newTitle}
    }

    const action = tasksThunks.updateTask.fulfilled(payload, 'requestId', payload)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('hi hi')
    expect(endState['todolistId2'][0].title).toBe('bread')
})

test('new array should be added when new todolist is added', () => {

    const action = todolistsActions.addTodoList({
        todolist: {
            id: 'todolistId',
            title: 'html',
            addedDate: '',
            order: 0
        }
    })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})