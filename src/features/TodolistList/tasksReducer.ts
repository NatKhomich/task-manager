import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskDomainType, TaskType, todolistsApi, UpdateTaskModelType} from 'features/TodolistList/todolistsApi';
import {appActions, RequestStatusType} from 'app/appReducer';
import {todolistsActions, todolistsThunks} from 'features/TodolistList/todolistsReducer';
import {ResultCodeStatuses, TaskPriorities, TaskStatuses} from 'common/enum';
import {handleServerAppError, handleServerNetworkError} from 'common/utils';
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";


const fetchTasks = createAppAsyncThunk<
    { tasks: TaskType[], todolistId: string }, //то что санка возвращает
    string//то что санка принимает todolistId: string
    //опциональные параметры, которые нужны протипизированы в utils
>(`tasks/fetchTasks`, async (todolistId: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await todolistsApi.getTasks(todolistId);
        const tasks = res.data.items;
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        return {tasks, todolistId};
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});

const removeTask = createAppAsyncThunk<
    { todolistId: string, taskId: string },
    { todolistId: string, taskId: string }
>('tasks/removeTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsApi.deleteTask(arg.todolistId, arg.taskId)
        if (res.data.resultCode === ResultCodeStatuses.succeeded) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {todolistId: arg.todolistId, taskId: arg.taskId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
})

const addTask = createAppAsyncThunk<
    {task: TaskType},
    {todolistId: string, title: string}
>('tasks/addTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsApi.createTask(arg.todolistId, arg.title)
        if (res.data.resultCode === ResultCodeStatuses.succeeded) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
})

const updateTask = createAppAsyncThunk<
    {todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType},
    {todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType}
>('tasks/updateTask', async (arg, thunkAPI) => {
    const {dispatch, getState ,rejectWithValue} = thunkAPI;

    try {
        const state = getState()
        const task = state.tasks[arg.todolistId].find(el => el.id === arg.taskId)
        if (!task) {
            return rejectWithValue(null)
        }

        const model: UpdateTaskModelType = {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            ...arg.domainModel
        }

        dispatch(tasksActions.changeTaskEntityStatus({todolistId: arg.todolistId, taskId: arg.taskId, entityStatus: 'loading'}))
        dispatch(appActions.setAppStatus({status: 'loading'}))

        const res = await todolistsApi.updateTask(arg.todolistId, arg.taskId, model)
        if (res.data.resultCode === ResultCodeStatuses.succeeded) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            dispatch(tasksActions.changeTaskEntityStatus({todolistId: arg.todolistId, taskId: arg.taskId, entityStatus: 'succeeded'}))
            return {todolistId: arg.todolistId, taskId: arg.taskId, domainModel: arg.domainModel}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        dispatch(tasksActions.changeTaskEntityStatus({todolistId: arg.todolistId, taskId: arg.taskId, entityStatus: 'failed'}))
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        changeTaskEntityStatus: (state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            entityStatus: RequestStatusType
        }>) => {
            const tasksCurrentTodo = state[action.payload.todolistId]
            const index = tasksCurrentTodo.findIndex(t => t.id === action.payload.taskId)
            tasksCurrentTodo[index] = {...tasksCurrentTodo[index], entityStatus: action.payload.entityStatus}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks.map((el: any) => ({
                    ...el,
                    entityStatus: 'idle'
                }))
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasksCurrentTodo = state[action.payload.todolistId]
                const index = tasksCurrentTodo.findIndex(el => el.id === action.payload.taskId)
                if (index > -1) {
                    tasksCurrentTodo.splice(index, 1)
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const newTask: TaskDomainType = {...action.payload.task, entityStatus: 'idle'}
                state[action.payload.task.todoListId].unshift(newTask)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasksCurrentTodo = state[action.payload.todolistId]
                const index = tasksCurrentTodo.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasksCurrentTodo[index] = {...tasksCurrentTodo[index], ...action.payload.domainModel}
                }
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => state[tl.id] = [])
            })
            .addCase(todolistsActions.clearTodolistsData, () => {
                return {}
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {fetchTasks, removeTask, addTask, updateTask}

//types
export type ErrorType = {
    statusCode: number
    messages: [{
        message: string
        field: string
    }],
    error: string
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    completed?: boolean
}

export type TasksStateType = {
    [key: string]: TaskDomainType[]
}

export type TasksInitialStateType = ReturnType<typeof slice.getInitialState>