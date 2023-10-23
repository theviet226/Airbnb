import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from "./profile.module.scss";


import { updateUser, getProfile, UpdateAvatar } from 'src/services/user.service';
import { bookingHistory } from 'src/services/booking.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { TOKENUSER } from 'src/constants';




function Profile() {
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const profileUser = useSelector((state: any) => state.authReducerLogin.authLogin.user);
  const [editedProfile, setEditedProfile] = useState({ ...profileUser });
  
  const [bookingsProfile, setBookingProfile] = useState<any[] | null>(null);
  const [file,setFile] = useState<File|undefined>()
  const [preview,setPreview] = useState<string|ArrayBuffer|undefined>()
  

  const handleConfirmUpdate = async () => {
    try {
      await updateUser(profileUser.id, editedProfile);
      setIsEditing(false);
      toast("Cập nhập thông tin thành công!")
    } catch (error) {
      console.error(error);
    }
  }
  const bookingProfile = async (id: any) => {
    try {
      const bookingsHistory = await bookingHistory(id);
      setBookingProfile(bookingsHistory);
      console.log(bookingsHistory)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserProfile = async (id: any) => {
    try {
      const userProfile = await getProfile(id);
      setEditedProfile({ ...userProfile });
      // dispatch(setSelectedUser(userProfile));


      console.log("Thông tin người dùng: ", userProfile);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (profileUser) {
      console.log(profileUser.id)
      fetchUserProfile(profileUser.id);
      bookingProfile(profileUser.id)
    }
  }, [profileUser]);



  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  }

  const handleEditProfile = () => {
    setIsEditing(!isEditing);

  }

  const handleCancelEdit = () => {
    setIsEditing(false);
  }
 const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
  const target =e.target
  if (!target.files || target.files?.length === 0) return
  const selectedFile = target.files[0]
  setFile(selectedFile)
  const imageURL = URL.createObjectURL(selectedFile)
  setPreview(imageURL)
 }
  const handleUpLoad = (e:any)=>{
    e.preventDefault();
    const formData = new FormData()
    if(typeof file === 'undefined') return
    formData.append('formFile',file)
    UpdateAvatar(formData,TOKENUSER)
    .then((resp) =>{
      if (resp   === "Thành công"){
        console.log("Thành công")
        
      }else{
        console.log("Thất bại")
      }
    }).catch((e) => {
      console.log(e)
    })
  }
  return (
    <>
    <div style={{ paddingTop: '100px' }} className='container'>
      <div className={css["profile-container"]}>
        <div className={css['left-panel']}>
          <form>
          <div className={css.avatar}>
            <label htmlFor="avatar">
             <img src={preview as string} alt="Avatar" id='avatar' />
            <input type="file" name='avatar' onChange={handleOnChange} accept='image/png, imgae/jpg' />
            <button onClick={handleUpLoad}>Upload</button>
            </label>
          </div>
          </form>
        </div>
        <div className={css["right-panel"]}>
          <div className={css["tab-menu"]}>
            <ul>
              <li
                className={activeTab === 'info' ? 'active' : ''}
                onClick={() => handleTabChange('info')}
              >
                Thông tin cá nhân của
              </li>
              <li
                className={activeTab === 'history' ? 'active' : ''}
                onClick={() => handleTabChange('history')}
              >
                Lịch sử đặt phòng
              </li>
            </ul>
          </div>
          <div className={css["tab-content"]}>
            {activeTab === 'info' && (
              <div className={css["info-content"]}>
                <h2>Thông tin cá nhân của {profileUser.name}</h2>
                {isEditing ? (
                  <div>
                    <div className={css["form-group"]}>
                      <label htmlFor="fullName">Họ và tên:</label>
                      <input
                        type="text"
                        id="fullName"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      />
                    </div>
                    <div className={css["form-group"]}>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      />
                    </div>
                    <div className={css["form-group"]}>
                      <label htmlFor="phone">Số điện thoại:</label>
                      <input
                        type="tel"
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      />
                    </div>

                    <div className={css["form-group"]}>
                      <label>Giới tính:</label>
                      <div className={css.gender}>
                        <input type="radio" id="male" name="gender" value="male" checked={profileUser.gender === "male"} />
                        <label htmlFor="male">Nam</label>
                        <input type="radio" id="female" name="gender" value="female" checked={profileUser.gender === "female"} />
                        <label htmlFor="female">Nữ</label>
                      </div>
                    </div>
                    <div className={css["form-group"]}>
                      <label htmlFor="birthdate">Ngày sinh:</label>
                      <input type="date" id="birthdate" value={profileUser.birthdate} />
                    </div>
                    <button className='btn btn-danger' onClick={handleCancelEdit}>Hủy</button>
                    <button className='btn btn-success' onClick={handleConfirmUpdate}>OK</button>
                  </div>
                ) : (
                  <div>
                    <div className={css["form-group"]}>
                      <label htmlFor="fullName">Họ và tên:</label>
                      <input type="text" id="fullName" value={profileUser.name} readOnly />
                    </div>
                    <div className={css["form-group"]}>
                      <label htmlFor="email">Email:</label>
                      <input type="email" id="email" value={profileUser.email} readOnly />
                    </div>
                    <div className={css["form-group"]}>
                      <label htmlFor="phone">Số điện thoại:</label>
                      <input type="tel" id="phone" value={profileUser.phone} readOnly />
                    </div>
                    <div className={css["form-group"]}>
                      <label>Giới tính:</label>
                      <div className={css.gender}>
                        <input type="radio" id="male" name="gender" value="male" checked={profileUser.gender === "male"} readOnly />
                        <label htmlFor="male">Nam</label>
                        <input type="radio" id="female" name="gender" value="female" checked={profileUser.gender === "female"} readOnly />
                        <label htmlFor="female">Nữ</label>
                      </div>
                    </div>
                    <div className={css["form-group"]}>
                      <label htmlFor="birthdate">Ngày sinh:</label>
                      <input type="date" id="birthdate" value={profileUser.birthdate} readOnly />
                    </div>
                    <button type='submit' className='btn btn-primary' onClick={handleEditProfile}>Cập nhật người dùng</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="history-content">
                <h2>Lịch sử đặt phòng</h2>
                <div className="table">
                  <table className="table" style={{ border: "transparent" }}>
                    <thead className="table-secondary">
                      <tr
                        style={{
                          border: "transparent",
                          fontFamily: "Inter",
                          fontSize: "20px",
                          textAlign: "center",
                        }}
                      >
                        <td scope="col">Mã phòng</td>
                        <td scope="col">ngày đến</td>
                        <td scope="col">Ngày đi</td>
                        <td scope="col">Số khách</td>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingsProfile ? (
                          bookingsProfile.map((booking) => (
                            <tr key={booking.id}>
                              <td>{booking.maPhong}</td>
                              <td>{booking.ngayDen}</td>
                              <td>{booking.ngayDi}</td>
                              <td>{booking.soLuongKhach}</td>

                            </tr>
                          ))
                        
                      ) : (
                        <p>Loading booking history...</p>
                      )}

                    </tbody>
                  </table>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  );
}


export default Profile;
