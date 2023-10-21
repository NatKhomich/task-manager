import {AppRootStateType} from '../../state/store';

export const selectAuthIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn