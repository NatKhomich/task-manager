import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "app/model/appSlice";
import { authAPI } from "features/auth/api/authApi";
import { ResultCodeStatuses } from "common/enum";
import { todolistsActions } from "features/TodolistList/model/todolists/todolistsSlice";
import { handleServerAppError, handleServerNetworkError } from "common/utils";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { LoginDataType } from "features/TodolistList/api/todolists/types";


const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  }
});

const login = createAppAsyncThunk<
  { isLoggedIn: boolean },
  LoginDataType
>("auth/login", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCodeStatuses.succeeded) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: true };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }

});

const logout = createAppAsyncThunk<
  { isLoggedIn: boolean },
  undefined
>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCodeStatuses.succeeded) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      dispatch(todolistsActions.clearTodolistsData());
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});


const initializeApp = createAppAsyncThunk<
  { isLoggedIn: boolean },
  undefined
>("auth/initializeApp", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCodeStatuses.succeeded) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: true };
    } else {
      dispatch(appActions.setAppStatus({ status: "failed" }));
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppInitialized({ isInitialized: true }));
  }
});

// types
export type AuthStateType = ReturnType<typeof slice.getInitialState>

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp };