import { AppRootState } from "app/model/store"


export const selectAuthIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn
export const selectAuthCaptchaUrl= (state: AppRootState) => state.auth.captchaUrl