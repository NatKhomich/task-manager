import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilterValueType, TodolistCommonType} from 'features/TodolistList/ui/TodolistList';
import {todolistsApi} from 'features/TodolistList/api/todolists/todolistsApi';
import {RequestStatusType} from 'app/model/appSlice';
import {tasksThunks} from 'features/TodolistList/model/tasks/tasksSlice';
import {ResultCodeStatuses} from 'common/enum';
import {handleServerAppError} from 'common/utils';
import {createAppAsyncThunk} from "common/utils/createAppAsyncThunk";
import {thunkTryCatch} from "common/utils/thunkTryCatch";
import { TodolistType } from "features/TodolistList/api/todolists/types";


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

const fetchTodolists = createAppAsyncThunk<
    { todolists: TodolistType[] }
>(`todolists/fetchTodolists`, async (_, thunkAPI) => {
    const {dispatch} = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsApi.getTodolists()
        res.data.forEach(t => {
            dispatch(tasksThunks.fetchTasks(t.id))
        })
        return {todolists: res.data}
    })
});

const removeTodolist = createAppAsyncThunk<
    { todolistId: string },
    string
>(`todolists/removeTodolist`, async (todolistId: string, thunkAPI) => {
    const {dispatch} = thunkAPI;
    dispatch(todolistsActions.changeTodoListEntityStatus({todolistId, entityStatus: 'loading'}))
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsApi.deleteTodolist(todolistId)
        if (res.data.resultCode === ResultCodeStatuses.succeeded) {
            return {todolistId}
        } else {
            handleServerAppError(res.data, dispatch)
        }
        return {todolistId}
    })
        .finally(() => {
            dispatch(todolistsActions.changeTodoListEntityStatus({todolistId, entityStatus: 'succeeded'}))
        })
});

const addTodolist = createAppAsyncThunk<
    { todolist: TodolistType },
    string
>('todolists/addTodolist', async (title: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsApi.createTodolist(title)
        if (res.data.resultCode === ResultCodeStatuses.succeeded) {
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
})

const updateTodolistTitle = createAppAsyncThunk<
    { todolistId: string, title: string },
    { todolistId: string, title: string }
>('todolists/updateTodolistTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(todolistsActions.changeTodoListEntityStatus({todolistId: arg.todolistId, entityStatus: 'loading'}))
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistsApi.updateTodolist(arg.todolistId, arg.title)
        if (res.data.resultCode === ResultCodeStatuses.succeeded) {
            return {todolistId: arg.todolistId, title: arg.title}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
        .finally(() => {
            dispatch(todolistsActions.changeTodoListEntityStatus({
                todolistId: arg.todolistId,
                entityStatus: 'succeeded'
            }))
        })
})


export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodolists, removeTodolist, addTodolist, updateTodolistTitle}

export type TodolistsInitialStateType = ReturnType<typeof slice.getInitialState>