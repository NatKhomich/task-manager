import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilterValueType, TodolistCommonType} from 'features/TodolistList/TodolistList';
import {todolistsApi, TodolistType} from 'features/TodolistList/todolistsApi';
import {appActions, RequestStatusType} from 'app/appReducer';
import {tasksThunks} from 'features/TodolistList/tasksReducer';
import {ResultCodeStatuses} from 'common/enum';
import {handleServerAppError, handleServerNetworkError} from 'common/utils';
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";


const fetchTodolists = createAppAsyncThunk<
    { todolists: TodolistType[] }
>(`todolists/fetchTodolists`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsApi.getTodolists()
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        res.data.forEach(t => {
            dispatch(tasksThunks.fetchTasks(t.id))
        })
        return {todolists: res.data}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
});

const removeTodolist = createAppAsyncThunk<
    { todolistId: string },
    string
>(`todolists/removeTodolist`, async (todolistId: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        dispatch(todolistsActions.changeTodoListEntityStatus({todolistId, entityStatus: 'loading'}))
        const res = await todolistsApi.deleteTodolist(todolistId)

        if (res.data.resultCode === ResultCodeStatuses.succeeded) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            dispatch(todolistsActions.changeTodoListEntityStatus({todolistId, entityStatus: 'succeeded'}))
            return {todolistId}
        } else {
            handleServerAppError(res.data, dispatch)
        }
        return {todolistId}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        dispatch(todolistsActions.changeTodoListEntityStatus({todolistId, entityStatus: 'failed'}))
        return rejectWithValue(null)
    }
});

const addTodolist = createAppAsyncThunk<
    { todolist: TodolistType },
    string
>('todolists/addTodolist', async (title: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsApi.createTodolist(title)

        if (res.data.resultCode === ResultCodeStatuses.succeeded) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})

const updateTodolistTitle = createAppAsyncThunk<
    { todolistId: string, title: string },
    { todolistId: string, title: string }
>('todolists/updateTodolistTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsApi.updateTodolist(arg.todolistId, arg.title)

        if (res.data.resultCode === ResultCodeStatuses.succeeded) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {todolistId: arg.todolistId, title: arg.title}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }

    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistCommonType[],
    reducers: {
        changeTodoListFilter: (state, action: PayloadAction<{ todolistId: string, filter: FilterValueType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.todolistId)
            if (todo) todo.filter = action.payload.filter
        },
        changeTodoListEntityStatus: (state, action: PayloadAction<{
            todolistId: string,
            entityStatus: RequestStatusType
        }>) => {
            const todo = state.find((todo) => todo.id === action.payload.todolistId)
            if (todo) todo.entityStatus = action.payload.entityStatus
        },
        clearTodolistsData: () => {
            return []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => state.push({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(el => el.id === action.payload.todolistId)
                if (index > -1) state.splice(index, 1)
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                const newTodo: TodolistCommonType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
                state.unshift(newTodo)
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const todo = state.find((todo) => todo.id === action.payload.todolistId)
                if (todo) todo.title = action.payload.title
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodolists, removeTodolist, addTodolist, updateTodolistTitle}

export type TodolistsInitialStateType = ReturnType<typeof slice.getInitialState>