import {AppRootStateType} from 'app/store';


export const selectAuthIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn