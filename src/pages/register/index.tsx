import React, { useState } from "react";
import css from "./register.module.scss";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Y from "yup";
import { authSignup } from "src/services/auth.service";
export type TSignup = {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: boolean | undefined;
  name: string;
  date: string;
};
const signupSchema = Y.object({});
function Register() {
  const [gender, setGender] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      name: "",
      date: "",
      gender: undefined,
    },
    validationSchema: signupSchema,
    onSubmit: (value) => {
      const data: TSignup = {
        email: value.email,
        password: value.password,
        confirmPassword: value.confirmPassword,
        phone: value.phone,
        name: value.name,
        gender: gender,
        date: value.date,
      };
      authSignup(data).then(()=>{
        navigate("/login")
      }).catch((e)=>{
        console.log(e)
      })
    },
  });
 const handleGenderChange =(value:boolean) =>{
  setGender(value)
 }
  return (
    <>
      <div className={css["register-container"]}>
        <div className={css["register-col"]}>
          <div className={css["register-wrap"]}>
            <div className={css["register-img"]}></div>
            <div className={css["register-title"]}>
              <h3>Sign Up</h3>
              <form onSubmit={formik.handleSubmit}>
                <div className={css["register-form"]}>
                  <div className={css["register-colum"]}>
                    <div className={css["register-left"]}>
                      <div className={css["register-input"]}>
                        <label
                          htmlFor="email"
                          className={css["register-placeholeder"]}
                        >
                          Email Address
                        </label>
                        <input
                          type="text"
                          required
                          className={css["register-control"]}
                          placeholder="Enter email address"
                          {...formik.getFieldProps("email")}
                        />
                      </div>
                      <div className={css["register-input"]}>
                        <label
                          htmlFor="password"
                          className={css["register-placeholeder"]}
                        >
                          Password
                        </label>
                        <input
                          type="current-password"
                          required
                          className={css["register-control"]}
                          placeholder="Enter password"
                          {...formik.getFieldProps("password")}
                        />
                      </div>
                      <div className={css["register-input"]}>
                        <label
                          htmlFor="confirmPassword"
                          className={css["register-placeholeder"]}
                        >
                          Confirm Password
                        </label>
                        <input
                          type="new-password"
                          required
                          className={css["register-control"]}
                          placeholder="Enter confirm password"
                          {...formik.getFieldProps("confirmPassword")}
                        />
                      </div>
                    </div>
                    <div className={css["register-right"]}>
                      <div className={css["register-input"]}>
                        <label
                          htmlFor="name"
                          className={css["register-placeholeder"]}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          className={css["register-control"]}
                          placeholder="Enter full name"
                          {...formik.getFieldProps("name")}
                        />
                      </div>
                      <div className={css["register-input"]}>
                        <label
                          htmlFor="phone"
                          className={css["register-placeholeder"]}
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          required
                          className={css["register-control"]}
                          placeholder="Enter phone number"
                          {...formik.getFieldProps("phone")}
                        />
                      </div>
                      <div className={css["register-input"]}>
                        <label
                          htmlFor="birthday"
                          className={css["register-placeholeder"]}
                        >
                          Birth Date
                        </label>
                        <input
                          type="date"
                          required
                          className={css["register-control"]}
                          placeholder="Enter birth date"
                          {...formik.getFieldProps("date")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={css["gender-box"]}>
                    <h4>Gender</h4>
                    <div className={css["gender-option"]}>
                      <div className={css["gender"]}>
                        <input
                          type="radio"
                          id="check-male"
                          name="gender"
                          checked={gender === true}
                          
                          onChange={()=>handleGenderChange(true)}
                          className={css["register-li"]}
                        />
                        <label htmlFor="check-male" className={css["register-radio-label"]}>Male</label>
                        
                      </div>
                      <div className={css["gender"]}>
                        <input
                          type="radio"
                          id="check-female"
                          name="gender"
                          checked={gender === false}
                          
                          onChange={()=>handleGenderChange(false)}
                          className={css["register-li"]}
                        />
                        <label htmlFor="check-female" className={css["register-radio-label"]}>Female</label>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div className={css["register-signup"]}>
                  <button type="submit" className={css["register-button"]}>
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
