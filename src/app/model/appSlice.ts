import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"

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
        (state) => {
          state.status = "failed"
      })
      .addMatcher(
        isFulfilled,
        (state) => {
          state.status = "succeeded"
      })
  }
})


export const appSlice = slice.reducer
export const appActions = slice.actions

//types
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type AppInitialState = ReturnType<typeof slice.getInitialState>


