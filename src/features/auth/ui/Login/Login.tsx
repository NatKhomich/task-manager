import React from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Navigate } from "react-router-dom"
import { useLogin } from "features/auth/lib"


export const Login = () => {

  const { formik, isLoggedIn , captchaUrl} = useLogin()

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return <Grid container justifyContent={"center"}>
    <Grid item justifyContent={"center"}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormGroup>
            <TextField label="Email"
                       type="email"
                       margin="normal"
                       {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ?
              <div style={{ color: "red" }}>{formik.errors.email}</div> : null}
            <TextField type="password"
                       label="Password"
                       margin="normal"
                       {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ?
              <div style={{ color: "red" }}>{formik.errors.password}</div> : null}
            <FormControlLabel label={"Remember me"}
                              control={<Checkbox />}
                              {...formik.getFieldProps("rememberMe")}
            />


            {captchaUrl && <img  src={captchaUrl} alt={'captcha'}/>}
            {captchaUrl && <div>
              <TextField label="Enter the characters from the image"
                         margin="normal"
                         size='small'
                         style={{width: '100%'}}
                         {...formik.getFieldProps('captcha')} />
            </div>
            }


            <Button type={"submit"}
                    variant={"contained"}
                    color={"primary"}
                    disabled={!(formik.isValid && formik.dirty)}
            >
              Login
            </Button>

            <FormLabel>
              <p>To log in get registered
                <a href={"https://social-network.samuraijs.com/"}
                   target={"_blank"}> here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}