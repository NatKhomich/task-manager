import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { authAPI } from "features/auth/api/authApi"
import { ResultCodeStatuses } from "common/enum"
import { todolistsActions } from "features/TodolistList/model/todolists/todolistsSlice"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { LoginDataType } from "features/TodolistList/api/todolists/types"

const login = createAppAsyncThunk<
  { isLoggedIn: boolean },
  LoginDataType
>("auth/login", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await authAPI.login(arg)
  if (res.data.resultCode === ResultCodeStatuses.succeeded) {
    return { isLoggedIn: true }
  } else {
    return rejectWithValue(res.data)
  }
})

const logout = createAppAsyncThunk<
  { isLoggedIn: boolean },
  undefined
>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCodeStatuses.succeeded) {
      dispatch(todolistsActions.clearTodolistsData())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
})

const initializeApp = createAppAsyncThunk<
  { isLoggedIn: boolean },
  undefined
>("auth/initializeApp", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await authAPI.me()
  if (res.data.resultCode === ResultCodeStatuses.succeeded) {
    return { isLoggedIn: true }
  } else {
    return rejectWithValue(res.data)
  }
})


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


export const authSlice = slice.reducer
export const authThunks = { login, logout, initializeApp }

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>

