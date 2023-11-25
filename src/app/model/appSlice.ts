import { createSlice, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { AnyAction } from "redux"
import { authThunks } from "features/auth/model/authSlice"

export const loadDarkLightModeFromLocalStorage = (): boolean => {
  const storedMode = localStorage.getItem("darkLightMode")
  return storedMode ? JSON.parse(storedMode) : true
}


const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatus,
    error: null as null | string,
    isDarkLightMode: loadDarkLightModeFromLocalStorage(),
    isInitialized: false
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    darkLightAppMode: (state, action: PayloadAction<{ mode: boolean }>) => {
      state.isDarkLightMode = action.payload.mode
      localStorage.setItem("darkLightMode", JSON.stringify(action.payload.mode))
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isPending,
        (state) => {
          state.status = "loading"
        })
      .addMatcher(
        isRejected,
        (state, action: AnyAction) => {

          state.status = "failed"
          if (action.payload) {
            if (action.type.includes("addTodolist")) return;
            if (action.type.includes("addTask")) return;
            if (action.type.includes("initializeApp")) return;
            state.error = action.payload.messages[0]
          } else {
            state.error = action.error.message
              ? action.error.message
              : "Some error occurred"
          }
        })
      .addMatcher(
        isFulfilled,
        (state) => {
          state.status = "succeeded"
        })
      .addMatcher(
        isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected),
        (state) => {
          state.isInitialized = true
        })
  }
})


export const appSlice = slice.reducer
export const appActions = slice.actions

//types
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type AppInitialState = ReturnType<typeof slice.getInitialState>


