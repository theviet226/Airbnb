<<<<<<< HEAD

import css from './login.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/redux/config-store'
import { useFormik } from 'formik'
import { authLogin } from 'src/services/auth.service'
import { setLocalStorage } from 'src/utils'
import { AUTH_LOGIN } from 'src/constants'
import { authLoginn } from 'src/redux/authReduceLogin'
export type TSignin ={
  email:string,
  password:string,
}
=======
import React ,{useState,useEffect} from "react";
import css from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/redux/config-store";
import { useFormik } from "formik";
import { authLogin } from "src/services/auth.service";
import { getLocalStorage, setLocalStorage } from "src/utils";
import { AUTH_LOGIN } from "src/constants";
import { authLoginn } from "src/redux/authReduceLogin";
export type TSignin = {
  email: string;
  password: string;
};

>>>>>>> 32bfea71ea18e0671f9bd6e29bd5b503be46cd9f
function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginErr,setLoginErr] = useState("") 
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      const data: TSignin = {
        email: value.email,
        password: value.password,
      };
      authLogin(data)
        .then((resp) => {
          setLocalStorage(AUTH_LOGIN, resp.content);
          dispatch(authLoginn(resp));
          navigate("/");
          
        })
        .catch((e) => {
          setLoginErr("Tên tài khoản hoặc mật khẩu không đúng!!")
          console.log(e);
        });
    },
  });
  return (
    <>
      <div className={css["login-container"]}>
        <div className={css["login-col"]}>
          <div className={css["login-wrap"]}>
            <div className={css["login-img"]}></div>
            <div className={css["login-form"]}>
              <div className={css["login-title"]}>
                <h3>Sign In</h3>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className={css["login-input"]}>
                  <input
                    type="text"
                    className={css["login-control"]}
                    {...formik.getFieldProps("email")}
                    required
                  />
                  <span className={css["login-span"]}></span>
                  <label htmlFor="email" className={css["login-placehoder"]}>
                    Email
                  </label>
                </div>
                <div className={css["login-input"]}>
                  <input
                    type="password"
                    className={css["login-control"]}
                    {...formik.getFieldProps("password")}
                    required
                  />
                  <span className={css["login-span"]}></span>
                  <label htmlFor="password" className={css["login-placehoder"]}>
                    Password
                  </label>
                </div>
                {loginErr && <div style={{textAlign:"center",color:"red", marginBottom:"5px"}}>{loginErr}</div>}
                <div>
                  <button type="submit" className={css["login-button"]}>
                    Sign Up
                  </button>
                </div>
              </form>
              <p className={css["login-text"]}>
                Not a member?{" "}
                <Link to={`/register`} className={css["login-link"]}>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
