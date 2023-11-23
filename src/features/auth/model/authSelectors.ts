import { AppRootState } from "app/model/store"


export const selectAuthIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn