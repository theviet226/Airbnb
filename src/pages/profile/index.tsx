import css from './profile.module.scss'
import Avatar from '../../assets/images/avatar.jpg'

import {useEffect, useState} from "react"
import {toast} from "react-toastify"
import { User, updateProfile } from 'src/services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/config-store';
import { setProfile } from 'src/redux/authReduceLogin';


function Profile() {
  const [gender, setGender] = useState<boolean | undefined>(undefined);
  const [avatar,setAvatar] = useState<string>(Avatar)
  
  const dispatch = useDispatch();
  const [update,setUpdate] = useState({
    email:"",
    password:"",
    confirmPassword:"",
    phone:"",
    name:"",
    date:"",
    gender:true
  })
  const userProfile = useSelector((state:RootState)=>state.authReducerLogin.userProfile)
  useEffect(()=>{
    User().then((resp)=>{
     const inforUser = resp.content
     dispatch((setProfile(inforUser)))
    }).catch((e)=>{console.log(e)})
  },[])

const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }
}
const handleChange = (e:React.MouseEvent<HTMLElement>) =>{
  updateProfile(update).then((resp)=>{
    const updateUser = resp.content
    setUpdate(updateUser)
    toast('Cập nhật thành công')
  }).catch((e)=>{
    console.log(e)
  })
}
  return (
    <>
    <div className={css["profile-container"]}>
      <div className={css["profile-col"]}>
        <div className={css["profile-wrap"]}>
          <div className={css["profile-img"]}></div>
          <div className={css["profile-title"]}>
            <h3>You Can Update The Details</h3>
            <div className={css["profile-avatar"]}>
              <label htmlFor="profile">
              <img src={avatar} className={css["profile-img-1"]} alt="avatar"/>
              
              </label>
              <input type="file" id='profile' name='profile' onChange={handleOnChange} />
              
            </div>
            <form >
              <div className={css["profile-form"]}>
                <div className={css["profile-colum"]}>
                  <div className={css["profile-left"]}>
                    <div className={css["profile-input"]}>
                      <label
                        htmlFor="email"
                        className={css["profile-placeholeder"]}
                      >
                        Email Address
                      </label>
                      <input
                        type="text"
                        required
                        className={css["profile-control"]}
                        placeholder="Enter email address"
                        value={userProfile?.email}
                        // {...formik.getFieldProps("email")}
                      />
                     {/* {formik.touched.email && formik.errors.email && (<p style={{color:"red"}}>{formik.errors.email}</p>)} */}
                    </div>
                    <div className={css["profile-input"]}>
                      <label
                        htmlFor="password"
                        className={css["profile-placeholeder"]}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        required
                        className={css["profile-control"]}
                        placeholder="Enter password"
                        value={userProfile?.password}
                        // {...formik.getFieldProps("password")}
                      />
                      {/* {formik.touched.password && formik.errors.password && (<p style={{color:"red"}}>{formik.errors.password}</p>)} */}
                    </div>
                    <div className={css["profile-input"]}>
                      <label
                        htmlFor="confirmPassword"
                        className={css["profile-placeholeder"]}
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        required
                        className={css["profile-control"]}
                        placeholder="Enter confirm password"
                        value={userProfile?.confirmPassword}
                        // {...formik.getFieldProps("confirmPassword")}
                      />
                      {/* {formik.touched.confirmPassword && formik.errors.confirmPassword && (<p style={{color:"red"}}>{formik.errors.confirmPassword}</p>)} */}
                    </div>
                  </div>
                  <div className={css["profile-right"]}>
                    <div className={css["profile-input"]}>
                      <label
                        htmlFor="name"
                        className={css["profile-placeholeder"]}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className={css["profile-control"]}
                        placeholder="Enter full name"
                        value={userProfile?.name}
                        // {...formik.getFieldProps("name")}
                      />
                      {/* {formik.touched.name && formik.errors.name && (<p style={{color:"red"}}>{formik.errors.name}</p>)} */}
                    </div>
                    <div className={css["profile-input"]}>
                      <label
                        htmlFor="phone"
                        className={css["profile-placeholeder"]}
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        required
                        className={css["profile-control"]}
                        placeholder="Enter phone number"
                        value={userProfile?.phone}
                        // {...formik.getFieldProps("phone")}
                      />
                     {/* {formik.touched.phone && formik.errors.phone && (<p style={{color:"red"}}>{formik.errors.phone}</p>)} */}
                    </div>
                    <div className={css["profile-input"]}>
                      <label
                        htmlFor="birthday"
                        className={css["profile-placeholeder"]}
                      >
                        Birth Date
                      </label>
                      <input
                        type="date"
                        required
                        className={css["profile-control"]}
                        placeholder="Enter birth date"
                        value={userProfile?.date}
                        // {...formik.getFieldProps("date")}
                      />
                      {/* {formik.touched.date && formik.errors.date && (<p style={{color:"red"}}>{formik.errors.date}</p>)} */}
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
                        
                        
                        // onChange={()=>handleGenderChange(true)}
                        className={css["profile-li"]}
                      />
                      <label htmlFor="check-male" className={css["profile-radio-label"]}>Male</label>
                      
                    </div>
                    <div className={css["gender"]}>
                      <input
                        type="radio"
                        id="check-female"
                        name="gender"
                        checked={gender === false}
                        
                        // onChange={()=>handleGenderChange(false)}
                        className={css["profile-li"]}
                      />
                      <label htmlFor="check-female" className={css["profile-radio-label"]}>Female</label>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className={css["profile-signup"]}>
                <button onClick={handleChange}  className={css["profile-button"]}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   
  </>
  )
}

export default Profile