import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilterValueType, TodolistCommonType} from 'features/TodolistList/TodolistList';
import {todolistsApi, TodolistType} from 'features/TodolistList/todolistsApi';
import {appActions, RequestStatusType} from 'app/appReducer';
import {AppThunk} from 'app/store';
import {ErrorType, tasksThunks} from 'features/TodolistList/tasksReducer';
import {ResultCodeStatuses} from 'common/enum';
import {handleServerAppError, handleServerNetworkError} from 'common/utils';

const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistCommonType[],
    reducers: {
        setTodolists: (state, action: PayloadAction<{todolists: TodolistType[]}>) => {
           // return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
            action.payload.todolists.forEach(tl => state.push({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        removeTodoList: (state, action: PayloadAction<{todolistId: string}>) => {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index > -1) state.splice(index, 1)
        },
        addTodoList: (state, action: PayloadAction<{todolist: TodolistType}>) => {
            const newTodo: TodolistCommonType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
            state.unshift(newTodo)
        },
        changeTodoListTitle: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
            const todo = state.find((todo) => todo.id === action.payload.todolistId)
            if (todo) todo.title = action.payload.title
        },
        changeTodoListFilter: (state, action: PayloadAction<{todolistId: string, filter: FilterValueType}>) => {
            const todo = state.find((todo) => todo.id === action.payload.todolistId)
            if (todo) todo.filter = action.payload.filter
        },
        changeTodoListEntityStatus: (state, action: PayloadAction<{todolistId: string, entityStatus: RequestStatusType}>) => {
            const todo = state.find((todo) => todo.id === action.payload.todolistId)
            if (todo) todo.entityStatus = action.payload.entityStatus
        },
        clearTodolistsData: () => {
            return []
        }
    }
})


export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

export const setTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(todolistsActions.setTodolists({todolists: res.data}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return res.data
        })
        .then((todos) => {
            todos.forEach(t => {
                // dispatch(setTasksTC(t.id))
                dispatch(tasksThunks.fetchTasks(t.id))
            })
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    dispatch(todolistsActions.changeTodoListEntityStatus({todolistId, entityStatus: 'loading'}))
    todolistsApi.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(todolistsActions.removeTodoList({todolistId}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                dispatch(todolistsActions.changeTodoListEntityStatus({todolistId,entityStatus: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
            dispatch(todolistsActions.changeTodoListEntityStatus({todolistId, entityStatus: 'failed'}))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistsApi.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(todolistsActions.addTodoList({todolist: res.data.data.item}))
               // dispatch(setTodolistsTC()) если задиспатчить сразу санку кейс и AC 'ADD-TODOLIST' не нужны
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const updateTodolistTitleTC = (todoListId: string, title: string): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistsApi.updateTodolist(todoListId, title)
        .then((res) => {
            if(res.data.resultCode === ResultCodeStatuses.succeeded) {
                dispatch(todolistsActions.changeTodoListTitle({todolistId: todoListId, title}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export type TodolistsInitialStateType = ReturnType<typeof slice.getInitialState>