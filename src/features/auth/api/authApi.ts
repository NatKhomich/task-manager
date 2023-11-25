import { AxiosResponse } from "axios"
import { instance } from "common/api"
import { BaseResponseType } from "common/types"
import { AuthResponseType } from "features/auth/api/types"
import { LoginDataType } from "features/auth/lib/useLogin"

export const authAPI = {
  me() {
    return instance.get<BaseResponseType<AuthResponseType>>(`/auth/me`)
  },
  login(loginData: LoginDataType) {
    return instance.post<BaseResponseType<{ userId: number }>, AxiosResponse<BaseResponseType<{
      userId: number
    }>>, LoginDataType>("/auth/login", loginData)
  },
  logout() {
    return instance.delete<BaseResponseType>(`/auth/login`)
  },
  getCaptcha() {
    return instance.get('/security/get-captcha-url')
  }
}

