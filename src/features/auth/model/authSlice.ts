import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { authAPI } from "features/auth/api/authApi"
import { ResultCodeStatuses } from "common/enum"
import { todolistsActions } from "features/TodolistList/model/todolists/todolistsSlice"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { LoginDataType } from "features/auth/lib/useLogin"


const login = createAppAsyncThunk<
  { isLoggedIn: boolean },
  LoginDataType
>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  const res = await authAPI.login(arg)
  if (res.data.resultCode === ResultCodeStatuses.Succeeded) {
    return { isLoggedIn: true }
  } else {
    if(res.data.resultCode === ResultCodeStatuses.Captcha_error) {
      dispatch(getCaptchaUrl())
    }
    return rejectWithValue(res.data)
  }
})

const logout = createAppAsyncThunk<
  { isLoggedIn: boolean },
  undefined
>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCodeStatuses.Succeeded) {
      dispatch(todolistsActions.clearTodolistsData())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
})

const initializeApp = createAppAsyncThunk<
  { isLoggedIn: boolean },
  undefined
>("auth/initializeApp", async (_, { rejectWithValue }) => {
  const res = await authAPI.me()
  if (res.data.resultCode === ResultCodeStatuses.Succeeded) {
    return { isLoggedIn: true }
  } else {
    return rejectWithValue(res.data)
  }
})

const getCaptchaUrl = createAppAsyncThunk<
  string,
  undefined
>('auth/captchaUrl', async (_) => {
  const res = await authAPI.getCaptcha()
  return res.data.url
})


const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    captchaUrl: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
          state.captchaUrl = action.payload
      })
      .addMatcher(
        (action) => action.type.endsWith("login/fulfilled"),
        (state) => {
          state.captchaUrl = ""
        },
      )
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

