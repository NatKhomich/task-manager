import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RequestStatus } from "app/model/appSlice"
import { todolistsActions, todolistsThunks } from "features/TodolistList/model/todolists/todolistsSlice"
import { ResultCodeStatuses } from "common/enum"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { tasksApi } from "features/TodolistList/api/tasks/tasksApi"
import { TaskDomainType, TaskType } from "features/TodolistList/api/todolists/types"
import { UpdateDomainTaskModelType, UpdateTaskModelType } from "features/TodolistList/api/tasks/types"

const fetchTasks = createAppAsyncThunk<
  { tasks: TaskType[], todolistId: string },
  string
>(`tasks/fetchTasks`, async (todolistId: string) => {
  const res = await tasksApi.getTasks(todolistId)
  const tasks = res.data.items
  return { tasks, todolistId }
})

const removeTask = createAppAsyncThunk<
  { todolistId: string, taskId: string },
  { todolistId: string, taskId: string }
>("tasks/removeTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(tasksActions.changeTaskEntityStatus({
    todolistId: arg.todolistId,
    taskId: arg.taskId,
    entityStatus: "loading"
  }))
  const res = await tasksApi.deleteTask(arg.todolistId, arg.taskId)
    .finally(() => {
      dispatch(tasksActions.changeTaskEntityStatus({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        entityStatus: "succeeded"
      }))
    })
  if (res.data.resultCode === ResultCodeStatuses.Succeeded) {
    return { todolistId: arg.todolistId, taskId: arg.taskId }
  } else {
    return rejectWithValue(res.data)
  }
})

const addTask = createAppAsyncThunk<
  { task: TaskType },
  { todolistId: string, title: string }
>("tasks/addTask", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await tasksApi.createTask(arg.todolistId, arg.title)
  if (res.data.resultCode === ResultCodeStatuses.Succeeded) {
    return { task: res.data.data.item }
  } else {
    return rejectWithValue(res.data)
  }
})

const updateTask = createAppAsyncThunk<
  { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType },
  { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }
>("tasks/updateTask", async (arg, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI

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

  dispatch(tasksActions.changeTaskEntityStatus({
    todolistId: arg.todolistId,
    taskId: arg.taskId,
    entityStatus: "loading"
  }))

  const res = await tasksApi.updateTask(arg.todolistId, arg.taskId, model)
    .finally(() => {
      dispatch(tasksActions.changeTaskEntityStatus({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        entityStatus: "succeeded"
      }))
    })
  if (res.data.resultCode === ResultCodeStatuses.Succeeded) {
    return { todolistId: arg.todolistId, taskId: arg.taskId, domainModel: arg.domainModel }
  } else {
    return rejectWithValue(res.data)
  }
})


const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    changeTaskEntityStatus: (state, action: PayloadAction<{
      todolistId: string,
      taskId: string,
      entityStatus: RequestStatus
    }>) => {
      const tasksCurrentTodo = state[action.payload.todolistId]
      const index = tasksCurrentTodo.findIndex(t => t.id === action.payload.taskId)
      tasksCurrentTodo[index] = { ...tasksCurrentTodo[index], entityStatus: action.payload.entityStatus }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((el) => ({
          ...el,
          entityStatus: "idle"
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
        const newTask: TaskDomainType = { ...action.payload.task, entityStatus: "idle" }
        state[action.payload.task.todoListId].unshift(newTask)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasksCurrentTodo = state[action.payload.todolistId]
        const index = tasksCurrentTodo.findIndex(t => t.id === action.payload.taskId)
        if (index !== -1) {
          tasksCurrentTodo[index] = { ...tasksCurrentTodo[index], ...action.payload.domainModel }
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

export const tasksSlice = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, removeTask, addTask, updateTask }

//types
export type TasksStateType = Record<string, TaskDomainType[]>
export type TasksInitialStateType = ReturnType<typeof slice.getInitialState>