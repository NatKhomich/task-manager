import {AxiosResponse} from 'axios';
import {instance} from 'common/api';
import {LoginDataType} from 'features/TodolistList/todolistsApi';
import {BaseResponseType} from 'common/types';

export const authAPI = {
    me() {
        return instance.get<BaseResponseType<AuthResponseType>>(`/auth/me`)
    },
    login(loginData: LoginDataType) {
        return instance.post<BaseResponseType<{userId: number}>, AxiosResponse<BaseResponseType<{userId: number}>>, LoginDataType>('/auth/login', loginData)
    },
    logout() {
        return instance.delete<BaseResponseType>(`/auth/login`)
    }
}

type AuthResponseType = {
    id: number
    email: string
    login: string
}