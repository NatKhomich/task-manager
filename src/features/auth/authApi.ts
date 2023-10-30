import {AxiosResponse} from 'axios';
import {instance} from 'common/api';
import {LoginDataType} from 'features/TodolistList/todolistsApi';
import {ResponseType} from 'common/types';

export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthResponseType>>(`/auth/me`)
    },
    login(loginData: LoginDataType) {
        return instance.post<ResponseType<{userId: number}>, AxiosResponse<ResponseType<{userId: number}>>, LoginDataType>('/auth/login', loginData)
    },
    logout() {
        return instance.delete<ResponseType>(`/auth/login`)
    }
}

type AuthResponseType = {
    id: number
    email: string
    login: string
}