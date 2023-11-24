import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { appActions } from "app/model/appSlice"
import { authAPI } from "features/auth/api/authApi"
import { ResultCodeStatuses } from "common/enum"
import { todolistsActions } from "features/TodolistList/model/todolists/todolistsSlice"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { LoginDataType } from "features/TodolistList/api/todolists/types"


const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(authThunks.login.fulfilled,
          authThunks.logout.fulfilled,
          authThunks.initializeApp.fulfilled),
        (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  }
})

const login = createAppAsyncThunk<
  { isLoggedIn: boolean },
  LoginDataType
>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
    const res = await authAPI.login(arg)
    if (res.data.resultCode === ResultCodeStatuses.succeeded) {
      return { isLoggedIn: true }
    } else {
      // handleServerAppError(res.data, dispatch)
      return rejectWithValue(res.data)
    }
})

const logout = createAppAsyncThunk<
  { isLoggedIn: boolean },
  undefined
>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }))
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCodeStatuses.succeeded) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }))
      dispatch(todolistsActions.clearTodolistsData())
      return { isLoggedIn: false }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})


const initializeApp = createAppAsyncThunk<
  { isLoggedIn: boolean },
  undefined
>("auth/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
    const res = await authAPI.me()
    //   .finally(() => {
    //   dispatch(appActions.setAppInitialized({ isInitialized: true }))
    // })
    if (res.data.resultCode === ResultCodeStatuses.succeeded) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
})

export const authSlice = slice.reducer
export const authThunks = { login, logout, initializeApp }

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>

