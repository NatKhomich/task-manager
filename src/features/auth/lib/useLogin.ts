import { useAppDispatch, useAppSelector } from "app/model/store"
import { FormikHelpers, useFormik } from "formik"
import { authThunks } from "features/auth/model/authSlice"
import { selectAuthIsLoggedIn } from "features/auth/model/authSelectors"
import { BaseResponseType } from "common/types"

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
export type FormikErrorType = Partial<Omit<LoginParamsType, 'captcha'>>

export const useLogin = () => {

  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Required"
      } else {
        if (values.password.length < 4) {
          errors.password = "Password must be at least 4 characters long"
        }
        if (!/^[a-zA-Z0-9]+$/.test(values.password)) {
          errors.password = "Password must contain only English letters and numbers"
        }
      }
      return errors
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      dispatch(authThunks.login(values))
        .unwrap()
        .catch((reason: BaseResponseType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    }
  })

  return {
    formik, isLoggedIn
  }
}